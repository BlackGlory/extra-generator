import { toArray, take } from 'iterable-operator'
import { spawn } from '@src/spawn.js'
import { getError } from 'return-style'

describe('spawn', () => {
  test('times = 0', () => {
    const iter = spawn(num => num * 2, 0)
    const arrResult = toArray(iter)

    expect(arrResult).toEqual([])
  })

  test('times != 0', () => {
    const iter = spawn(num => num * 2, 3)
    const arrResult = toArray(iter)

    expect(arrResult).toEqual([2, 4, 6])
  })

  test('times is Infinity', () => {
    const iter = spawn(num => num * 2, Infinity)
    const arrResult = toArray(take(iter, 3))

    expect(arrResult).toEqual([2, 4, 6])
  })

  test('times isnt an integer', () => {
    const err = getError(() => spawn(num => num * 2, 0.5))

    expect(err).toBeInstanceOf(Error)
  })
})
