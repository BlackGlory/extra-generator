import { test, expect } from 'vitest'
import { toArray } from 'iterable-operator'
import { of } from '@src/of.js'

test('of<T>(val: T): IterableIterator<T>', () => {
  const iter = of(1)
  const arrResult = toArray(iter)

  expect(arrResult).toEqual([1])
})
