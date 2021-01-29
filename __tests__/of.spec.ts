import { toArray } from 'iterable-operator'
import { of } from '@src/of'
import '@blackglory/jest-matchers'

describe('of<T>(val: T): Iterable<T>', () => {
  it('return Iterable', () => {
    const iter = of(1)
    const arrResult = toArray(iter)

    expect(iter).toBeIterable()
    expect(arrResult).toEqual([1])
  })
})
