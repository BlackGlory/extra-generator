import { describe, test, expect } from 'vitest'
import { ngrams } from '@src/ngrams.js'
import { toArray } from 'iterable-operator'
import { getError } from 'return-style'

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

  test('edge: 0-gram', () => {
    const err = getError(() => ngrams('abc', 0))

    expect(err).toBeInstanceOf(Error)
  })
})
