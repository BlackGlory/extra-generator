# extra-generator
## Install
```sh
npm install --save extra-generator
# or
yarn add extra-generator
```

## API
### handleYieldedValues
```ts
function handleYieldedValues<T, Return, Next>(
  generator: Generator<T, Return, Next>
, fn: (value: T, index: number) => Next
): Return
```

### handleYieldedValuesAsync
```ts
function handleYieldedValuesAsync<T, Return, Next>(
  generator: Generator<T, Return, Next>
, fn: (value: T, index: number) => PromiseLike<Next>
): Promise<Return>
function handleYieldedValuesAsync<T, Return, Next>(
  generator: AsyncGenerator<T, Return, Next>
, fn: (value: T, index: number) => Awaitable<Next>
): Promise<Return>
```

### of
```ts
function of<T>(val: T): IterableIterator<T>
```

```js
of(1) // [1]
```

### repeat
```ts
function repeat<T>(val: T, times: number = Infinity): IterableIterator<T>
```

```js
repeat(1) // [1, 1, 1, ...]
repeat(1, 3) // [1, 1, 1]
repeat(1, 0) // []
```

### spawn
```ts
function spawn<T>(create: (num: number) => T, times: number = Infinity): IterableIterator<T>
```

```js
spawn(x => x * 2) // [2, 4, 6, ...]
spawn(x => x * 2, 3) // [2, 4, 6]
spawn(x => x * 2, 0) // []
```

### countdown
```ts
function countdown(begin: number, end: number): IterableIterator<number>
```

```js
countdown(2, -2) // [2, 1, 0, -1, -2]
countdown(1, 1) // [1]
countdown(0, 1) // []
```

### countup
```ts
function countup(begin: number, end: number): IterableIterator<number>
```

```js
countup(-2, 2) // [-2, -1, 0, 1, 2]
countup(1, 1) // [1]
countup(1, 0) // []
```

### range
```ts
function range(
  start: number
, end: number
, step: number = 1 // step > 0
, inclusive: boolean = false
): IterableIterator<number>
```

```js
range(1, 1) // []
range(-2, 2) // [-2, -1, 0, 1]
range(2, -2) // [2, 1, 0, -1]
range(1, -1, 0.5) // [1, 0.5, 0, -0.5]
range(2, -2, 0) // throw Error
range(2, -2, -0.5) // throw Error
```

### stringifyJSONStream
```ts
function stringifyJSONStream<T>(iterable: Iterable<T>): Iterable<string>
```

### stringifyJSONStreamAsync
```ts
function stringifyNDJSONStreamAsync<T>(iterable: AsyncIterable<T>): AsyncIterable<string>
```

### stringifyNDJSONStream
```ts
function stringifyNDJSONStream<T>(iterable: Iterable<T>): Iterable<string>
```

### stringifyNDJSONStreamAsync
```ts
function stringifyNDJSONStreamAsync<T>(iterable: AsyncIterable<T>): AsyncIterable<string>
```

### timestampBasedId
```ts
function timestampBasedId(): Iterator<[timestamp: number, num: number]>
```

### ReusableIterable
```ts
interface IReusableIterable<T> extends Iterable<T> {
  close(): void
}

class ReusableIterable<T> implements IReusableIterable<T> {
  get done(): boolean | undefined

  constructor(iterable: Iterable<T>)

  close(): void
}
```

### ReusableAsyncIterable
```ts
interface IReusableAsyncIterable<T> extends AsyncIterable<T> {
  close(): Promise<void>
}

class ReusableAsyncIterable<T> implements IReusableAsyncIterable<T> {
  get done(): boolean | undefined

  constructor(iterable: AsyncIterable<T>)

  close(): Promise<void>
}
```

### ngrams
```ts
function ngrams(text: string, n: number): IterableIterator<string>
```

### allNgrams
```ts
function allNgrams(text: string): IterableIterator<string>
```

### allCombinations
```ts
function allCombinations<T, U extends number>(
  arr: T[]
, k: U
): IterableIterator<FixedLengthArray<T, U>>
```
