import { Awaitable } from '@blackglory/prelude'

export async function handleYieldedValuesAsync<T, Return, Next>(
  generator: Generator<T, Return, Next> | AsyncGenerator<T, Return, Next>
, fn: (value: T, index: number) => Awaitable<Next>
): Promise<Return> {
  let { value, done } = await generator.next()

  let i = 0
  do {
    ;({ value, done } = await generator.next(await fn(value as T, i++)))
  } while (!done)

  return value as Return
}
