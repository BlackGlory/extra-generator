import { handleYieldedValues } from '@src/handle-yielded-values'
import { getError } from 'return-style'

describe('handleYieldedValues', () => {
  test('generator returns', () => {
    function* gen(): Generator<string, number, number> {
      const value1 = yield '1'
      const value2 = yield '2'
      return value1 + value2
    }
    const fn = jest.fn((x: string) => Number(x))

    const result = handleYieldedValues(gen(), fn)

    expect(result).toBe(3)
    expect(fn).toBeCalledTimes(2)
    expect(fn).toBeCalledWith('1', 0)
    expect(fn).toBeCalledWith('2', 1)
  })

  test('generator throws error', () => {
    const customError = new Error('custom error')
    function* gen(): Generator<string, number, number> {
      throw customError
    }
    const fn = jest.fn((x: string) => Number(x))

    const err = getError(() => handleYieldedValues(gen(), fn))

    expect(err).toBe(customError)
    expect(fn).not.toBeCalled()
  })

  describe('handler throws error', () => {
    test('generator does not handle errors', () => {
      const customError = new Error('custom error')
      function* gen(): Generator<string, number, number> {
          const value1 = yield '1'
          const value2 = yield '2'
          return value1 + value2
      }
      const fn = jest.fn((_: string) => {
        throw customError
      })

      const err = getError(() => handleYieldedValues(gen(), fn))

      expect(err).toBe(customError)
      expect(fn).toBeCalledTimes(1)
    })

    test('generator handles errors', () => {
      const customError = new Error('custom error')
      function* gen(): Generator<string, number, number> {
        let value1: number
        try {
          value1 = yield '2'
        } catch {
          value1 = 1
        }

        let value2: number
        try {
          value2 = yield '2'
        } catch {
          value2 = 2
        }

        return value1 + value2
      }
      const fn = jest.fn((_: string) => {
        throw customError
      })

      const err = getError(() => handleYieldedValues(gen(), fn))

      expect(err).toBe(customError)
      expect(fn).toBeCalledTimes(1)
    })
  })
})