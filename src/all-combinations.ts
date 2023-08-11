import { assert } from '@blackglory/prelude'
import { FixedLengthArray } from 'justypes'

export function allCombinations<T, U extends number>(
  arr: T[]
, k: U
): IterableIterator<FixedLengthArray<T, U>> {
  assert(k > 0, 'k must be greater than zero')
  assert(Number.isInteger(k), 'k must be an integer')

  return allCombinations(arr, k)

  function* allCombinations<T, U extends number>(
    arr: T[]
  , k: U
  , temp: T[] = []
  ): IterableIterator<FixedLengthArray<T, U>> {
    if (temp.length < k) {
      for (let i = 0; i < arr.length; i++) {
        const newTemp = [...temp, arr[i]]
        yield* allCombinations(arr.slice(i + 1), k, newTemp)
      }
    } else {
      yield temp as FixedLengthArray<T, U>
    }
  }
}
