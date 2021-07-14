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
    const doneAfterBreak = reusableGen.done
    const result = toArray(reusableGen)
    const doneAfterExhaust = reusableGen.done

    expect(doneAfterBreak).toBeFalsy()
    expect(doneAfterExhaust).toBeTruthy()
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
    const doneAfterClose = reusableGen.done
    const result = toArray(reusableGen)

    expect(doneAfterClose).toBeTruthy()
    expect(result).toEqual([])
  })
})
