import { stringifyNDJSONStream } from '@src/stringify-ndjson-stream'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe('stringifyNDJSONStream<T>(iterable: Iterable<T>): Iterable<string>', () => {
  it('yield NDJSON', () => {
    const arr = [1, 2]

    const result = stringifyNDJSONStream(arr)
    const proResult = toArray(result).join('')

    expect(result).toBeIterable()
    expect(proResult).toBe('1\n2')
  })

  describe('empty iterable', () => {
    it('yield', () => {
      const arr: unknown[] = []

      const result = stringifyNDJSONStream(arr)
      const proResult = toArray(result).join('')

      expect(result).toBeIterable()
      expect(proResult).toBe('')
    })
  })
})
