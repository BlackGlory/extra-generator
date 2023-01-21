import * as Head from '@src/index.js'

test('Exports', () => {
  const expectedExports: string[] = [
    'handleYieldedValues'
  , 'handleYieldedValuesAsync'

  , 'of'
  , 'repeat'

  , 'countdown'
  , 'countup'
  , 'range'

  , 'stringifyJSONStream'
  , 'stringifyJSONStreamAsync'
  , 'stringifyNDJSONStream'
  , 'stringifyNDJSONStreamAsync'

  , 'sse'

  , 'ReusableIterable'
  , 'ReusableAsyncIterable'

  , 'timestampBasedId'

  , 'allNgrams'
  , 'ngrams'
  ].sort()

  const actualExports = Object.keys(Head).sort()

  expect(actualExports).toEqual(expectedExports)
})
