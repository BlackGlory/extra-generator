export function* repeat<T>(val: T, times: number = Infinity): Iterable<T> {
  while (times-- > 0) {
    yield val
  }
}
