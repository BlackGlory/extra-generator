import { take, toArray } from 'iterable-operator'
import { repeat } from '@src/repeat'
import '@blackglory/jest-matchers'

describe('repeat<T>(val: T): Iterable<T>', () => {
  it('return Iterable', () => {
    const iter = repeat(1)
    const arrResult = toArray(take(iter, 3))

    expect(iter).toBeIterable()
    expect(arrResult).toEqual([1, 1, 1])
  })
})
