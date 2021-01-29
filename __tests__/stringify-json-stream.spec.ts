import { stringifyJSONStream } from '@src/stringify-json-stream'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe('stringifyJSONStream(iterable: Iterable<unknown>): Iterable<string>', () => {
  it('yield JSON', () => {
    const arr = [1, 2]

    const result = stringifyJSONStream(arr)
    const proResult = toArray(result).join('')

    expect(result).toBeIterable()
    expect(proResult).toBe('[1,2]')
  })

  describe('empty iterable', () => {
    it('yield []', () => {
      const arr: unknown[] = []

      const result = stringifyJSONStream(arr)
      const proResult = toArray(result).join('')

      expect(result).toBeIterable()
      expect(proResult).toBe('[]')
    })
  })
})
