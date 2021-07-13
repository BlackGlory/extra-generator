import { stringifyJSONStreamAsync } from '@src/stringify-json-stream-async'
import { toAsyncIterable, toArrayAsync } from 'iterable-operator'
import '@blackglory/jest-matchers'
import { Readable } from 'stream'
import { waitForEventEmitter } from '@blackglory/wait-for'

describe(`
  stringifyNDJSONStreamAsync<T>(
    iterable: AsyncIterable<T>
  ): AsyncIterable<string>
`, () => {
  it('yield JSON', async () => {
    const arr = toAsyncIterable([1, 2])

    const result = stringifyJSONStreamAsync(arr)
    const proResult = (await toArrayAsync(result)).join('')

    expect(result).toBeAsyncIterable()
    expect(proResult).toBe('[1,2]')
  })

  describe('empty iterable', () => {
    it('yield []', async () => {
      const arr = toAsyncIterable([])

      const result = stringifyJSONStreamAsync(arr)
      const proResult = (await toArrayAsync(result)).join('')

      expect(result).toBeAsyncIterable()
      expect(proResult).toBe('[]')
    })
  })

  it('should throw the error before producing the first value', async () => {
    const customError = new Error('CustomError')
    const gen = async function* () {
      throw customError
    }

    const stream = Readable.from(stringifyJSONStreamAsync(gen()))
    const first = await Promise.race([
      waitForEventEmitter(stream, 'error')
    , waitForEventEmitter(stream, 'data')
    ])

    expect(first).toBe(customError)
  })
})
