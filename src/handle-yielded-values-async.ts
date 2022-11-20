import { Awaitable } from '@blackglory/prelude'

export async function handleYieldedValuesAsync<T, Return, Next>(
  generator: Generator<T, Return, Next> | AsyncGenerator<T, Return, Next>
, fn: (value: T, index: number) => Awaitable<Next>
): Promise<Return> {
  try {
    let { value, done } = await generator.next()

    let i = 0
    while (!done) {
      ;({ value, done } = await generator.next(await fn(value as T, i++)))
    }

    return value as Return
  } catch (e) {
    generator.throw(e)
    throw e
  }
}
