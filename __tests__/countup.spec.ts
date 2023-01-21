import { toArray } from 'iterable-operator'
import { countup } from '@src/countup.js'

describe('countup(begin: number, end: number): IterableIterator<number>', () => {
  describe('begin < end', () => {
    it('return iterable[begin:end]', () => {
      const iter = countup(-2, 2)
      const arrResult = toArray(iter)

      expect(arrResult).toEqual([-2, -1, 0, 1, 2])
    })
  })

  describe('begin = end', () => {
    it('return iterable[begin]', () => {
      const iter = countup(1, 1)
      const arrResult = toArray(iter)

      expect(arrResult).toEqual([1])
    })
  })

  describe('begin > end', () => {
    it('return empty iterable', () => {
      const iter = countup(1, 0)
      const arrResult = toArray(iter)

      expect(arrResult).toEqual([])
    })
  })
})
