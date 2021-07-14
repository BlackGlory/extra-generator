import lazy from 'lodash.once'

interface IReusableIterable<T> extends Iterable<T> {
  close(): void
}

export class ReusableIterable<T> implements IReusableIterable<T> {
  #done: boolean | undefined
  private getIterator: () => Iterator<T>

  get done(): boolean | undefined {
    return this.#done
  }

  constructor(iterable: Iterable<T>) {
    this.getIterator = lazy(() => iterable[Symbol.iterator]())
  }

  close(): void {
    if (!this.done) {
      this.#done = true
      this.getIterator().return?.()
    }
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.#done) return { done: true, value: undefined }

        const { value, done } = this.getIterator().next()
        if (done) {
          this.#done = true
        }
        return { value, done }
      }
    }
  }
}
