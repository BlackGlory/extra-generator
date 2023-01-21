import { sse } from '@src/sse.js'
import { toArray } from 'iterable-operator'

describe('sse(message: IMessage): Iterable<string>', () => {
  it('yield string', () => {
    const event = 'event'
    const data = '1\n2'
    const id = 'id'
    const retry = 100

    const iter = sse({
      event
    , data
    , id
    , retry
    })
    const result = toArray(iter)

    expect(result).toEqual([
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

      const iter = sse({ data })
      const result = toArray(iter)

      expect(result).toEqual([
        'data: \n'
      , '\n'
      ])
    })
  })
})
