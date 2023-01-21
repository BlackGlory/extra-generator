import { toArray } from 'iterable-operator'
import { of } from '@src/of.js'

describe('of<T>(val: T): IterableIterator<T>', () => {
  it('return Iterable', () => {
    const iter = of(1)
    const arrResult = toArray(iter)

    expect(arrResult).toEqual([1])
  })
})
