export async function* stringifyJSONStreamAsync(asyncIterable: AsyncIterable<unknown>): AsyncIterable<string> {
  yield '['

  const iter = asyncIterable[Symbol.asyncIterator]()
  const firstResult = await iter.next()
  if (!firstResult.done) yield JSON.stringify(firstResult.value)

  while (true) {
    const result = await iter.next()
    if (result.done) break
    yield ',' + JSON.stringify(result.value)
  }

  yield ']'
}
