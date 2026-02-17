import { assert } from '@blackglory/prelude'

export function ngrams(text: string, n: number): IterableIterator<string> {
  assert(
    Number.isInteger(n) &&
    n > 0
  , 'The parameter n must be an integer and greater than zero'
  )

  return _ngrams(text, n)
}

function* _ngrams(text: string, n: number): Generator<string> {
  for (let i = 0; i < text.length; i++) {
    const result = text.slice(i, i + n)
    if (result.length === n) {
      yield result
    }
  }
}
