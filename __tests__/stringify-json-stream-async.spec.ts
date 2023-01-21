import { stringifyJSONStreamAsync } from '@src/stringify-json-stream-async.js'
import { toAsyncIterable, toArrayAsync } from 'iterable-operator'
import { Readable } from 'stream'
import { waitForEventEmitter } from '@blackglory/wait-for'

describe(`
  stringifyNDJSONStreamAsync<T>(
    iterable: AsyncIterable<T>
  ): AsyncIterable<string>
`, () => {
  it('yield JSON', async () => {
    const arr = toAsyncIterable([1, 2])

    const iter = stringifyJSONStreamAsync(arr)
    const result = (await toArrayAsync(iter)).join('')

    expect(result).toBe('[1,2]')
  })

  describe('empty iterable', () => {
    it('yield []', async () => {
      const arr = toAsyncIterable([])

      const iter = stringifyJSONStreamAsync(arr)
      const result = (await toArrayAsync(iter)).join('')

      expect(result).toBe('[]')
    })
  })

  it('should throw the error before producing the first value', async () => {
    const customError = new Error('CustomError')
    const gen = async function* () {
      throw customError
    }

    const stream = Readable.from(stringifyJSONStreamAsync(gen()))
    const [first] = await Promise.race([
      waitForEventEmitter(stream, 'error')
    , waitForEventEmitter(stream, 'data')
    ])

    expect(first).toBe(customError)
  })
})
