import { timestampBasedId } from '@src/timestamp-based-id.js'
import { jest } from '@jest/globals'

describe('timestampBasedId(): Iterator<[timestamp: number, num: number]>', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('same timestamp', () => {
    const iter = timestampBasedId()

    jest.setSystemTime(100)
    const result1 = iter.next().value
    const result2 = iter.next().value

    expect(result1).toStrictEqual([100, 0])
    expect(result2).toStrictEqual([100, 1])
  })

  test('different timestamp', () => {
    const iter = timestampBasedId()

    jest.setSystemTime(100)
    const result1 = iter.next().value
    jest.setSystemTime(101)
    const result2 = iter.next().value

    expect(result1).toStrictEqual([100, 0])
    expect(result2).toStrictEqual([101, 0])
  })
})
