import { toArray } from 'iterable-operator'
import { countdown } from '@src/countdown'
import '@blackglory/jest-matchers'

describe('countdown(begin: number, end: number): IterableIterator<number>', () => {
  describe('begin > end', () => {
    it('return iterable[begin:end]', () => {
      const iter = countdown(2, -2)
      const arrResult = toArray(iter)

      expect(iter).toBeIterable()
      expect(arrResult).toEqual([2, 1, 0, -1, -2])
    })
  })

  describe('begin = end', () => {
    it('return iterable[begin]', () => {
      const iter = countdown(1, 1)
      const arrResult = toArray(iter)

      expect(iter).toBeIterable()
      expect(arrResult).toEqual([1])
    })
  })

  describe('begin < end', () => {
    it('return empty iterable', () => {
      const iter = countdown(0, 1)
      const arrResult = toArray(iter)

      expect(iter).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })
})
