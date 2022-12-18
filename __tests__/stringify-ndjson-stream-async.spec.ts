import { stringifyNDJSONStreamAsync } from '@src/stringify-ndjson-stream-async'
import { toAsyncIterable, toArrayAsync } from 'iterable-operator'

describe(`
  stringifyNDJSONStreamAsync<T>(
    iterable: AsyncIterable<T>
  ): AsyncIterable<string>
`, () => {
  it('yield NDJSON', async () => {
    const arr = toAsyncIterable([1, 2])

    const iter = stringifyNDJSONStreamAsync(arr)
    const result = (await toArrayAsync(iter)).join('')

    expect(result).toBe('1\n2')
  })

  describe('empty iterable', () => {
    it('yield []', async () => {
      const arr = toAsyncIterable([])

      const iter = stringifyNDJSONStreamAsync(arr)
      const result = (await toArrayAsync(iter)).join('')

      expect(result).toBe('')
    })
  })
})
