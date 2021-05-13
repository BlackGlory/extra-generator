export async function* stringifyNDJSONStreamAsync(
  asyncIterable: AsyncIterable<unknown>
): AsyncIterable<string> {
  const iter = asyncIterable[Symbol.asyncIterator]()

  const firstResult = await iter.next()
  if (!firstResult.done) yield JSON.stringify(firstResult.value)
  while (true) {
    const result = await iter.next()
    if (result.done) break
    yield '\n' + JSON.stringify(result.value)
  }
}
