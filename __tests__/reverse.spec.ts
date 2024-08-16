import { toArray } from 'iterable-operator'
import { reverse } from '@src/reverse.js'

test('reverse', () => {
  const arr = [1, 2, 3]

  const iter = reverse(arr)
  const arrResult = toArray(iter)

  expect(arrResult).toStrictEqual([3, 2, 1])
})
