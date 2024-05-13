import { toArray } from '@blackglory/prelude'
import { allIndexCombinations } from '@src/all-index-combinations.js'
import { getError } from 'return-style'

describe('allIndexCombinations', () => {
  test('arr.length < k', () => {
    const arr = [1, 2, 3]
    const k = 4

    const result = toArray(allIndexCombinations(arr, k))

    expect(result).toStrictEqual([])
  })

  test('arr.length = k', () => {
    const arr = [1, 2, 3]
    const k = 3

    const result = toArray(allIndexCombinations(arr, k))

    expect(result).toStrictEqual([
      [0, 1, 2]
    ])
  })

  describe('arr.length > k', () => {
    test('case 1', () => {
      const arr = [1, 2, 3]
      const k = 1

      const result = toArray(allIndexCombinations(arr, k))

      expect(result).toStrictEqual([
        [0]
      , [1]
      , [2]
      ])
    })

    test('case 2', () => {
      const arr = [1, 2, 3]
      const k = 2

      const result = toArray(allIndexCombinations(arr, k))

      expect(result).toStrictEqual([
        [0, 1]
      , [0, 2]
      , [1, 2]
      ])
    })

    test('case 3', () => {
      const arr = [1, 2, 3, 4]
      const k = 2

      const result = toArray(allIndexCombinations(arr, k))

      expect(result).toStrictEqual([
        [0, 1]
      , [0, 2]
      , [0, 3]
      , [1, 2]
      , [1, 3]
      , [2, 3]
      ])
    })
  })

  test('edge: arr.length = 0', () => {
    const arr: number[] = []
    const k = 1

    const result = toArray(allIndexCombinations(arr, k))

    expect(result).toStrictEqual([])
  })

  test('edge: k = 0', () => {
    const arr = [1, 2, 3]
    const k = 0

    const err = getError(() => allIndexCombinations(arr, k))

    expect(err?.message).toMatch('k must be greater than zero')
  })

  test('edge: k isnt an integer', () => {
    const arr = [1, 2, 3]
    const k = 0.5

    // @ts-ignore
    const err = getError(() => allIndexCombinations(arr, k))

    expect(err?.message).toMatch('k must be an integer')
  })
})
