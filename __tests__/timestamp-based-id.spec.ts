import { describe, test, beforeEach, afterEach, vi, expect } from 'vitest'
import { timestampBasedId } from '@src/timestamp-based-id.js'

describe('timestampBasedId(): Iterator<[timestamp: number, num: number]>', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('same timestamp', () => {
    const iter = timestampBasedId()

    vi.setSystemTime(100)
    const result1 = iter.next().value
    const result2 = iter.next().value

    expect(result1).toStrictEqual([100, 0])
    expect(result2).toStrictEqual([100, 1])
  })

  test('different timestamp', () => {
    const iter = timestampBasedId()

    vi.setSystemTime(100)
    const result1 = iter.next().value
    vi.setSystemTime(101)
    const result2 = iter.next().value

    expect(result1).toStrictEqual([100, 0])
    expect(result2).toStrictEqual([101, 0])
  })
})
