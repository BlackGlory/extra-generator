import { toArray, take } from 'iterable-operator'
import { repeat } from '@src/repeat'
import '@blackglory/jest-matchers'
import { getError } from 'return-style'

describe('repeat<T>(val: T, times: number): IterableIterator<T>', () => {
  describe('times = 0', () => {
    it('return Iterable', () => {
      const iter = repeat(1, 0)
      const arrResult = toArray(iter)

      expect(iter).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('times != 0', () => {
    it('return Iterable', () => {
      const iter = repeat(1, 3)
      const arrResult = toArray(iter)

      expect(iter).toBeIterable()
      expect(arrResult).toEqual([1, 1, 1])
    })
  })

  describe('times is Infinity', () => {
    it('return Iterable', () => {
      const iter = repeat(1, Infinity)
      const arrResult = toArray(take(iter, 3))

      expect(iter).toBeIterable()
      expect(arrResult).toEqual([1, 1, 1])
    })
  })

  describe('times isnt an integer', () => {
    it('throws Error', () => {
      const err = getError(() => repeat(1, 0.5))

      expect(err).toBeInstanceOf(Error)
    })
  })
})
