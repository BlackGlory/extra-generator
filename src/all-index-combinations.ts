import { assert } from '@blackglory/prelude'
import { FixedLengthArray } from 'justypes'

export function allIndexCombinations<T extends number>(
  arr: unknown[]
, k: T
): IterableIterator<FixedLengthArray<number, T>> {
  assert(k > 0, 'k must be greater than zero')
  assert(Number.isInteger(k), 'k must be an integer')

  return allCombinationIndexes(arr, k) as IterableIterator<FixedLengthArray<number, T>>

  function* allCombinationIndexes<T>(
    arr: T[]
  , k: number
  ): IterableIterator<number[]> {
    for (let i = 0; i < arr.length; i++) {
      if (k == 1) {
        yield [i]
      } else {
        const rest = arr.slice(i + 1)
        for (const subCombination of allCombinationIndexes(rest, k - 1)) {
          yield [i, ...subCombination.map(x => i + 1 + x)]
        }
      }
    }
  }
}
