import { toArray } from 'iterable-operator'
import { repeat } from '@src/repeat'
import '@blackglory/jest-matchers'

describe('repeat<T>(val: T, times: number): Iterable<T>', () => {
  it('return Iterable', () => {
    const iter = repeat(1, 3)
    const arrResult = toArray(iter)

    expect(iter).toBeIterable()
    expect(arrResult).toEqual([1, 1, 1])
  })
})
