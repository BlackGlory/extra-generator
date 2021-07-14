import lazy from 'lodash.once'

interface IReusableIterable<T> extends Iterable<T> {
  close(): void
}

export class ReusableIterable<T> implements IReusableIterable<T> {
  private done: boolean | undefined
  private getIterator: () => Iterator<T>

  constructor(iterable: Iterable<T>) {
    this.getIterator = lazy(() => iterable[Symbol.iterator]())
  }

  close(): void {
    if (!this.done) this.getIterator().return?.()
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.done) return { done: true, value: undefined }

        const { value, done } = this.getIterator().next()
        if (done) {
          this.done = true
        }
        return { value, done }
      }
    }
  }
}
