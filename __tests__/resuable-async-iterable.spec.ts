import { ReusableAsyncIterable } from '@src/reusable-async-iterable'
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
    const result = await toArrayAsync(reusableGen)

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
    const result = await toArrayAsync(reusableGen)

    expect(result).toEqual([])
  })
})
