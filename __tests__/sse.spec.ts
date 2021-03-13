import { sse } from '@src/sse'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe('sse(message: IMessage): Iterable<string>', () => {
  it('yield string', () => {
    const event = 'event'
    const data = '1\n2'
    const id = 'id'
    const retry = 100

    const result = sse({
      event
    , data
    , id
    , retry
    })
    const proResult = toArray(result)

    expect(result).toBeIterable()
    expect(proResult).toEqual([
      'event: event\n'
    , 'data: 1\n'
    , 'data: 2\n'
    , 'id: id\n'
    , 'retry: 100\n'
    , '\n'
    ])
  })

  describe('empty data', () => {
    it('yield string', () => {
      const data = ''

      const result = sse({ data })
      const proResult = toArray(result)

      expect(result).toBeIterable()
      expect(proResult).toEqual([
        'data: \n'
      , '\n'
      ])
    })
  })
})
