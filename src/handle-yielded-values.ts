export function handleYieldedValues<T, Return, Next>(
  generator: Generator<T, Return, Next>
, fn: (value: T, index: number) => Next
): Return {
  try {
    let { value, done } = generator.next()

    let i = 0
    while (!done) {
      ;({ value, done } = generator.next(fn(value as T, i++)))
    }

    return value as Return
  } catch (e) {
    generator.throw(e)
    throw e
  }
}
