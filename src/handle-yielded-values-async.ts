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
    // 如果generator没有捕获错误, 则调用`generator.throw`就会抛出错误.
    // 如果generator捕获了错误, 则调用`generator.throw`会返回`{ done: true }`.
    generator.throw(e)

    // 为了确保函数能在抛出错误时失败, 总是在此处重新抛出错误.
    throw e
  }
}
