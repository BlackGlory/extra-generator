export function* stringifyNDJSONStream(iterable: Iterable<unknown>): Iterable<string> {
  const iter = iterable[Symbol.iterator]()

  const firstResult = iter.next()
  if (!firstResult.done) yield JSON.stringify(firstResult.value)
  while (true) {
    const result = iter.next()
    if (result.done) break
    yield '\n' + JSON.stringify(result.value)
  }
}
