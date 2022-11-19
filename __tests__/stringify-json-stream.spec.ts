import { stringifyJSONStream } from '@src/stringify-json-stream'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'
import { Readable } from 'stream'
import { waitForEventEmitter } from '@blackglory/wait-for'

describe('stringifyJSONStream<T>(iterable: Iterable<T>): Iterable<string>', () => {
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

  it('should throw the error before producing the first value', async () => {
    const customError = new Error('CustomError')
    const gen = function* () {
      throw customError
    }

    const stream = Readable.from(stringifyJSONStream(gen()))
    const [first] = await Promise.race([
      waitForEventEmitter(stream, 'error')
    , waitForEventEmitter(stream, 'data')
    ])

    expect(first).toBe(customError)
  })
})
