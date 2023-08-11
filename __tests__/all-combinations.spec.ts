import { toArray } from '@blackglory/prelude'
import { allCombinations } from '@src/all-combinations.js'
import { getError } from 'return-style'

describe('allCombinations', () => {
  test('arr.length < k', () => {
    const arr = [1, 2, 3]
    const k = 4

    const result = toArray(allCombinations(arr, k))

    expect(result).toStrictEqual([])
  })

  test('arr.length = k', () => {
    const arr = [1, 2, 3]
    const k = 3

    const result = toArray(allCombinations(arr, k))

    expect(result).toStrictEqual([
      [1, 2, 3]
    ])
  })

  describe('arr.length > k', () => {
    test('case 1', () => {
      const arr = [1, 2, 3]
      const k = 2

      const result = toArray(allCombinations(arr, k))

      expect(result).toStrictEqual([
        [1, 2]
      , [1, 3]
      , [2, 3]
      ])
    })

    test('case 2', () => {
      const arr = [1, 2, 3, 4]
      const k = 2

      const result = toArray(allCombinations(arr, k))

      expect(result).toStrictEqual([
        [1, 2]
      , [1, 3]
      , [1, 4]
      , [2, 3]
      , [2, 4]
      , [3, 4]
      ])
    })
  })

  test('edge: arr.length = 0', () => {
    const arr: number[] = []
    const k = 1

    const result = toArray(allCombinations(arr, k))

    expect(result).toStrictEqual([])
  })

  test('edge: k = 0', () => {
    const arr = [1, 2, 3]
    const k = 0

    const err = getError(() => allCombinations(arr, k))

    expect(err?.message).toMatch('k must be greater than zero')
  })

  test('edge: k isnt an integer', () => {
    const arr = [1, 2, 3]
    const k = 0.5

    // @ts-ignore
    const err = getError(() => allCombinations(arr, k))

    expect(err?.message).toMatch('k must be an integer')
  })
})
