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
    if (temp.length < k) {
      for (let i = 0; i < rest.length; i++) {
        const newTemp = [...temp, rest[i]]
        yield* allCombinations(k, rest.slice(i + 1), newTemp)
      }
    } else {
      yield temp as FixedLengthArray<T, U>
    }
  }
}
