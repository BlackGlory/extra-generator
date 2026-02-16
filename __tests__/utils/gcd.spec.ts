import { describe, test, expect } from 'vitest'
import { gcd } from '@utils/gcd.js'

describe('gcd', () => {
  test('both are greater than 0', () => {
    const result = gcd(8, 12)

    expect(result).toBe(4)
  })

  test('one is zero', () => {
    const result = gcd(4, 0)

    expect(result).toBe(4)
  })

  test('both are zero', () => {
    // 数学上没有定义, 因为0不能作为除数, 但计算机视角下通常返回0.
    const result = gcd(0, 0)

    expect(result).toBe(0)
  })
})
