import { assert } from '@blackglory/prelude'
import { FixedLengthArray } from 'justypes'

export function allCombinations<T, U extends number>(
  arr: T[]
, k: U
): IterableIterator<FixedLengthArray<T, U>> {
  assert(k > 0, 'k must be greater than zero')
  assert(Number.isInteger(k), 'k must be an integer')

  return allCombinations(k, arr)

  function* allCombinations<T, U extends number>(
    k: U
  , rest: T[]
  , temp: T[] = []
  ): IterableIterator<FixedLengthArray<T, U>> {
    for (let i = 0; i < rest.length; i++) {
      const newTemp = [...temp, rest[i]]
      if (newTemp.length === k) {
        yield newTemp as FixedLengthArray<T, U>
      } else {
        const newRest = rest.slice(i + 1)
        yield* allCombinations(k, newRest, newTemp)
      }
    }
  }
}
