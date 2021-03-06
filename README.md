# extra-generator

## Install

```sh
npm install --save extra-generator
# or
yarn add extra-generator
```

## API

### of

```ts
function of<T>(val: T): Iterable<T>
```

```js
of(1) // [1]
```

### repeat

```ts
function repeat<T>(val: T, times: number = Infinity): Iterable<T>
```

```js
repeat(1) // [1, 1, 1, ...]
repeat(1, 3) // [1, 1, 1]
repeat(1, 0) // []
```

### countdown

```ts
function countdown(begin: number, end: number): Iterable<number>
```

```js
countdown(2, -2) // [2, 1, 0, -1, -2]
countdown(1, 1) // [1]
countdown(0, 1) // []
```

### countup

```ts
function countup(begin: number, end: number): Iterable<number>
```

```js
countup(-2, 2) // [-2, -1, 0, 1, 2]
countup(1, 1) // [1]
countup(1, 0) // []
```

### range

```ts
function range(start: number, end: number, step: number = 1): Iterable<number>
// assert(step > 0)
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

### sse

```ts
interface IMessage {
  event?: string
  data: string
  id?: string
  retry?: number
}

function sse(message: IMessage): Iterable<string>
```

### ReusableIterable

```ts
class ReusableIterable<T> implements IReusableIterable<T> {
  get done(): boolean | undefined

  constructor(iterable: Iterable<T>)

  close(): void
}
```

### ReusableAsyncIterable

```ts
class ReusableAsyncIterable<T> implements IReusableAsyncIterable<T> {
  get done(): boolean | undefined

  constructor(iterable: AsyncIterable<T>)

  close(): Promise<void>
}
```
