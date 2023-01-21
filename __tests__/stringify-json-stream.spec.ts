import { stringifyJSONStream } from '@src/stringify-json-stream.js'
import { toArray } from 'iterable-operator'
import { Readable } from 'stream'
import { waitForEventEmitter } from '@blackglory/wait-for'

describe('stringifyJSONStream<T>(iterable: Iterable<T>): Iterable<string>', () => {
  it('yield JSON', () => {
    const arr = [1, 2]

    const iter = stringifyJSONStream(arr)
    const result = toArray(iter).join('')

    expect(result).toBe('[1,2]')
  })

  describe('empty iterable', () => {
    it('yield []', () => {
      const arr: unknown[] = []

      const iter = stringifyJSONStream(arr)
      const result = toArray(iter).join('')

      expect(result).toBe('[]')
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
