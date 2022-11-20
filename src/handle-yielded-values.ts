export function handleYieldedValues<T, Return, Next>(
  generator: Generator<T, Return, Next>
, fn: (value: T, index: number) => Next
): Return {
  let { value, done } = generator.next()

  let i = 0
  do {
    ;({ value, done } = generator.next(fn(value as T, i++)))
  } while (!done)

  return value as Return
}
