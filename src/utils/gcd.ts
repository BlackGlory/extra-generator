// Euclidean algorithm
// 数学上, gcd(x, 0) = |x|.
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}
