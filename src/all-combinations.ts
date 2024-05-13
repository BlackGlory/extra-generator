import { FixedLengthArray } from 'justypes'
import { allIndexCombinations } from './all-index-combinations.js'
import { map } from 'iterable-operator'

export function allCombinations<T, U extends number>(
  arr: T[]
, k: U
): IterableIterator<FixedLengthArray<T, U>> {
  return map(
    allIndexCombinations(arr, k)
  , indexes => (indexes as number[]).map(i => arr[i]) as FixedLengthArray<T, U>
  )
}
