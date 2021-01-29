import { assert } from 'typed-assert'

/**
 * @throws {Error}
 */
export function range(start: number, end: number, step: number = 1): Iterable<number> {
  assert(step > 0, 'step parameter must be greater than 0')

  return rangeByUnsignedStep(start, end, step)
}

function* rangeByUnsignedStep(start: number, end: number, step: number): Iterable<number> {
  if (start < end) {
    for (let i = start; i < end; i += step) {
      yield i
    }
  } else {
    for (let i = start; i > end; i -= step) {
      yield i
    }
  }
}
