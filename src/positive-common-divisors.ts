import { positiveFactors } from './positive-factors.js'
import { gcd } from '@utils/gcd.js'

export function* positiveCommonDivisors(a: number, b: number): IterableIterator<number> {
  yield* positiveFactors(gcd(a, b))
}
