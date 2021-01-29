import { sse } from '@src/sse'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe('sse(text: string): Iterable<string>', () => {
  it('yield SSE', () => {
    const text = '1\n2'

    const result = sse(text)
    const proResult = toArray(result)

    expect(result).toBeIterable()
    expect(proResult).toEqual([
      'data: 1' + '\n'
    , 'data: 2' + '\n\n'
    ])
  })

  describe('empty iterable', () => {
    it('yield empty', () => {
      const text = ''

      const result = sse(text)
      const proResult = toArray(result)

      expect(result).toBeIterable()
      expect(proResult).toEqual([
        'data: \n\n'
      ])
    })
  })
})
