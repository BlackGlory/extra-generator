import { stringifyJSONStreamAsync } from '@src/stringify-json-stream-async'
import { toAsyncIterable, toArrayAsync } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe('stringifyNDJSONStreamAsync(iterable: AsyncIterable<unknown>): AsyncIterable<string>', () => {
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
})
