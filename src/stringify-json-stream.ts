export function* stringifyJSONStream(iterable: Iterable<unknown>): Iterable<string> {
  const iter = iterable[Symbol.iterator]()

  const firstResult = iter.next()
  yield '['
  if (!firstResult.done) yield JSON.stringify(firstResult.value)
  while (true) {
    const result = iter.next()
    if (result.done) break
    yield ',' + JSON.stringify(result.value)
  }
  yield ']'
}
