export function* repeat<T>(val: T): Iterable<T> {
  while (true) {
    yield val
  }
}
