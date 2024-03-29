import { ReusableAsyncIterable } from '@src/reusable-async-iterable.js'
import { toArrayAsync } from 'iterable-operator'

describe('ReusableAsyncIterable<T>', () => {
  test('reusable', async () => {
    async function* gen() {
      yield 1
      yield 2
    }

    const reusableGen = new ReusableAsyncIterable(gen())
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

    const reusableGen = new ReusableAsyncIterable(gen())
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
