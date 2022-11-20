import { handleYieldedValuesAsync } from '@src/handle-yielded-values-async'
import { getErrorPromise } from 'return-style'

describe('handleYieldedValuesAsync', () => {
  test('generator returns', async () => {
    function* gen(): Generator<string, number, number> {
      const value1 = yield '1'
      const value2 = yield '2'
      return value1 + value2
    }
    const fn = jest.fn((x: string) => Number(x))

    const result = await handleYieldedValuesAsync(gen(), fn)

    expect(result).toBe(3)
    expect(fn).toBeCalledTimes(2)
    expect(fn).toBeCalledWith('1', 0)
    expect(fn).toBeCalledWith('2', 1)
  })

  test('edge: yield once', async () => {
    function* gen(): Generator<string, number, number> {
      return yield '1'
    }
    const fn = jest.fn((x: string) => Number(x))

    const result = await handleYieldedValuesAsync(gen(), fn)

    expect(result).toBe(1)
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith('1', 0)
  })

  test('edge: no yield', async () => {
    function* gen(): Generator<string, number, number> {
      return 1
    }
    const fn = jest.fn((x: string) => Number(x))

    const result = await handleYieldedValuesAsync(gen(), fn)

    expect(result).toBe(1)
    expect(fn).not.toBeCalled()
  })

  test('generator throws error', async () => {
    const customError = new Error('custom error')
    function* gen(): Generator<string, number, number> {
      throw customError
    }
    const fn = jest.fn((x: string) => Number(x))

    const err = await getErrorPromise(handleYieldedValuesAsync(gen(), fn))

    expect(err).toBe(customError)
    expect(fn).not.toBeCalled()
  })

  describe('handler throws error', () => {
    test('generator does not handle errors', async () => {
      const customError = new Error('custom error')
      function* gen(): Generator<string, number, number> {
          const value1 = yield '1'
          const value2 = yield '2'
          return value1 + value2
      }
      const fn = jest.fn((_: string) => {
        throw customError
      })

      const err = await getErrorPromise(handleYieldedValuesAsync(gen(), fn))

      expect(err).toBe(customError)
      expect(fn).toBeCalledTimes(1)
    })

    test('generator handles errors', async () => {
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

      const err = await getErrorPromise(handleYieldedValuesAsync(gen(), fn))

      expect(err).toBe(customError)
      expect(fn).toBeCalledTimes(1)
    })
  })
})
