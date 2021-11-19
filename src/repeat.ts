import { assert } from '@blackglory/errors'

export function repeat<T>(val: T, times: number = Infinity): IterableIterator<T> {
  assert(
    times === Infinity || Number.isInteger(times)
  , 'The parameter times must be an integer'
  )

  return (function* () {
    while (times-- > 0) {
      yield val
    }
  })()
}
