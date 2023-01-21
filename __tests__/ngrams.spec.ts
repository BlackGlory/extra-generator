import { ngrams } from '@src/ngrams.js'
import { toArray } from 'iterable-operator'

describe('ngrams', () => {
  test('1-gram', () => {
    const iter = ngrams('abc', 1)

    const result = toArray(iter)

    expect(result).toStrictEqual(['a', 'b', 'c'])
  })

  test('2-gram', () => {
    const iter = ngrams('abc', 2)

    const result = toArray(iter)

    expect(result).toStrictEqual(['ab', 'bc'])
  })
})
