import { allNgrams } from '@src/all-ngrams'
import { toArray } from 'iterable-operator'

describe('allNgrams', () => {
  test('single char', () => {
    const iter = allNgrams('a')

    const result = toArray(iter)

    expect(result).toStrictEqual(['a'])
  })

  test('multiple chars', () => {
    const iter = allNgrams('abc')

    const result = toArray(iter)

    expect(result).toStrictEqual(['a', 'ab', 'abc', 'b', 'bc', 'c'])
  })
})
