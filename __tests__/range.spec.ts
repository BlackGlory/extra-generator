import { toArray } from 'iterable-operator'
import { getError } from 'return-style'
import { range } from '@src/range'

describe('range(start: number, end: number): IterableIterator<number>', () => {
  describe('start = end', () => {
    it('return empty iterable', () => {
      const iter = range(1, 1)
      const arrResult = toArray(iter)

      expect(arrResult).toEqual([])
    })
  })

  describe('start < end', () => {
    it('return iterable[start:end-1]', () => {
      const iter = range(-2, 2)
      const arrResult = toArray(iter)

      expect(arrResult).toEqual([-2, -1, 0, 1])
    })
  })

  describe('start > end', () => {
    it('return iterable[start:end+1]', () => {
      const iter = range(2, -2)
      const arrResult = toArray(iter)

      expect(arrResult).toEqual([2, 1, 0, -1])
    })
  })
})

describe('range(start: number, end: number, step: number) => IterableIterator<number>', () => {
  describe('step > 0', () => {
    it('return iterable[start:end] by step', () => {
      const iter = range(1, -1, 0.5)
      const arrResult = toArray(iter)

      expect(arrResult).toEqual([1, 0.5, 0, -0.5])
    })
  })

  describe('step = 0', () => {
    it('throw error', () => {
      const fn = () => range(2, -2, 0)

      const err = getError(fn)

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('step')
    })
  })

  describe('step < 0', () => {
    it('throw error', () => {
      const fn = () => range(2, -2, -0.5)

      const err = getError(fn)

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('step')
    })
  })
})
