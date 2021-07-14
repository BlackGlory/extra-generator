import { ReusableIterable } from '@src/reusable-iterable'
import { toArray } from 'iterable-operator'

describe('ReusableIterable<T>', () => {
  test('reusable', () => {
    function* gen() {
      yield 1
      yield 2
    }

    const reusableGen = new ReusableIterable(gen())
    for (const _ of reusableGen) {
      break
    }
    const result = toArray(reusableGen)

    expect(result).toEqual([2])
  })

  test('closable', () => {
    function* gen() {
      yield 1
      yield 2
    }

    const reusableGen = new ReusableIterable(gen())
    for (const _ of reusableGen) {
      break
    }
    reusableGen.close()
    const result = toArray(reusableGen)

    expect(result).toEqual([])
  })
})
