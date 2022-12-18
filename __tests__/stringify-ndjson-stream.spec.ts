import { stringifyNDJSONStream } from '@src/stringify-ndjson-stream'
import { toArray } from 'iterable-operator'

describe('stringifyNDJSONStream<T>(iterable: Iterable<T>): Iterable<string>', () => {
  it('yield NDJSON', () => {
    const arr = [1, 2]

    const iter = stringifyNDJSONStream(arr)
    const result = toArray(iter).join('')

    expect(result).toBe('1\n2')
  })

  describe('empty iterable', () => {
    it('yield', () => {
      const arr: unknown[] = []

      const iter = stringifyNDJSONStream(arr)
      const result = toArray(iter).join('')

      expect(result).toBe('')
    })
  })
})
