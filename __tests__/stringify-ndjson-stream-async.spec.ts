import { stringifyNDJSONStreamAsync } from '@src/stringify-ndjson-stream-async'
import { toAsyncIterable, toArrayAsync } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe(`
  stringifyNDJSONStreamAsync<T>(
    iterable: AsyncIterable<T>
  ): AsyncIterable<string>
`, () => {
  it('yield NDJSON', async () => {
    const arr = toAsyncIterable([1, 2])

    const result = stringifyNDJSONStreamAsync(arr)
    const proResult = (await toArrayAsync(result)).join('')

    expect(result).toBeAsyncIterable()
    expect(proResult).toBe('1\n2')
  })

  describe('empty iterable', () => {
    it('yield []', async () => {
      const arr = toAsyncIterable([])

      const result = stringifyNDJSONStreamAsync(arr)
      const proResult = (await toArrayAsync(result)).join('')

      expect(result).toBeAsyncIterable()
      expect(proResult).toBe('')
    })
  })
})
