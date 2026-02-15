import { describe, test, expect } from 'vitest'
import { ContinuableAsyncIterable } from '@src/continuable-async-iterable.js'
import { toArrayAsync } from 'iterable-operator'

describe('ContinuableAsyncIterable<T>', () => {
  test('continuable', async () => {
    async function* gen() {
      yield 1
      yield 2
    }

    const reusableGen = new ContinuableAsyncIterable(gen())
    for await (const _ of reusableGen) {
      break
    }
    const doneAfterBreak = reusableGen.done
    const result = await toArrayAsync(reusableGen)
    const doneAfterExhaust = reusableGen.done

    expect(doneAfterBreak).toBeFalsy()
    expect(doneAfterExhaust).toBeTruthy()
    expect(result).toEqual([2])
  })

  test('closable', async () => {
    async function* gen() {
      yield 1
      yield 2
    }

    const reusableGen = new ContinuableAsyncIterable(gen())
    for await (const _ of reusableGen) {
      break
    }
    await reusableGen.close()
    const doneAfterClose = reusableGen.done
    const result = await toArrayAsync(reusableGen)

    expect(doneAfterClose).toBeTruthy()
    expect(result).toEqual([])
  })
})
