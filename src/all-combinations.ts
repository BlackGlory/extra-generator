import { assert } from '@blackglory/prelude'
import { FixedLengthArray } from 'justypes'

export function allCombinations<T, U extends number>(
  arr: T[]
, k: U
): IterableIterator<FixedLengthArray<T, U>> {
  assert(k > 0, 'k must be greater than zero')
  assert(Number.isInteger(k), 'k must be an integer')

  return allCombinations(arr, k) as IterableIterator<FixedLengthArray<T, U>>

  function* allCombinations<T>(
    arr: T[]
  , k: number
  ): IterableIterator<T[]> {
    for (let i = 0; i < arr.length; i++) {
      if (k == 1) {
        yield [arr[i]]
      } else {
        const rest = arr.slice(i + 1)
        for (const subCombination of allCombinations(rest, k - 1)) {
          yield [arr[i], ...subCombination]
        }
      }
    }
  }
}
