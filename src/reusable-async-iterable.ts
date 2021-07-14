import lazy from 'lodash.once'

interface IReusableAsyncIterable<T> extends AsyncIterable<T> {
  close(): Promise<void>
}

export class ReusableAsyncIterable<T> implements IReusableAsyncIterable<T> {
  #done: boolean | undefined
  private getIterator: () => AsyncIterator<T>

  get done(): boolean | undefined {
    return this.#done
  }

  constructor(iterable: AsyncIterable<T>) {
    this.getIterator = lazy(() => iterable[Symbol.asyncIterator]())
  }

  async close(): Promise<void> {
    if (!this.done) {
      this.#done = true
      await this.getIterator().return?.()
    }
  }

  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        if (this.#done) return { done: true, value: undefined }

        const { value, done } = await this.getIterator().next()
        if (done) {
          this.#done = true
        }
        return { value, done }
      }
    }
  }
}
