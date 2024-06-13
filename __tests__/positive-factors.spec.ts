import { toArray } from '@blackglory/prelude'
import { positiveFactors } from '@src/positive-factors.js'

describe('positiveFactors', () => {
  test('value > 0', () => {
    const value = 10

    const arr = toArray(positiveFactors(value))

    expect(arr).toStrictEqual([10, 5, 2, 1])
  })

  test('value < 0', () => {
    const value = -10

    const arr = toArray(positiveFactors(value))

    expect(arr).toStrictEqual([10, 5, 2, 1])
  })

  test('value = 0', () => {
    const value = 0

    const arr = toArray(positiveFactors(value))

    expect(arr).toStrictEqual([])
  })
})
