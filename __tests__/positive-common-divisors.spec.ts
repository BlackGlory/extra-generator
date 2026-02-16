import { describe, test, expect } from 'vitest'
import { toArray } from '@blackglory/prelude'
import { positiveCommonDivisors } from '@src/positive-common-divisors.js'

describe.each([
  [1, 1]
, [1, -1]
, [-1, 1]
, [-1, -1]
])('positiveCommonDivisors (a: %s, b: %s)', (aSign, bSign) => {
  test('a > b', () => {
    const a = 12 * aSign
    const b = 8 * bSign

    const result = toArray(positiveCommonDivisors(a, b))

    expect(result).toStrictEqual([4, 2, 1])
  })

  test('a < b', () => {
    const a = 8 * aSign
    const b = 12 * bSign

    const result = toArray(positiveCommonDivisors(a, b))

    expect(result).toStrictEqual([4, 2, 1])
  })

  test('a === b', () => {
    const a = 4 * aSign
    const b = 4 * bSign

    const result = toArray(positiveCommonDivisors(a, b))

    expect(result).toStrictEqual([4, 2, 1])
  })

  test('a = 0', () => {
    const a = 0 * aSign
    const b = 8 * bSign

    const result = toArray(positiveCommonDivisors(a, b))

    expect(result).toStrictEqual([8, 4, 2, 1])
  })

  test('b = 0', () => {
    const a = 12 * aSign
    const b = 0 * bSign

    const result = toArray(positiveCommonDivisors(a, b))

    expect(result).toStrictEqual([12, 6, 4, 3, 2, 1])
  })

  test('a = 0, b = 0', () => {
    const a = 0
    const b = 0

    const result = toArray(positiveCommonDivisors(a, b))

    expect(result).toStrictEqual([])
  })
})
