import * as Head from '@src/index.js'

test('Exports', () => {
  const expectedExports: string[] = [
    'handleYieldedValues'
  , 'handleYieldedValuesAsync'

  , 'of'
  , 'repeat'
  , 'spawn'

  , 'countdown'
  , 'countup'
  , 'range'

  , 'stringifyJSONStream'
  , 'stringifyJSONStreamAsync'
  , 'stringifyNDJSONStream'
  , 'stringifyNDJSONStreamAsync'

  , 'ReusableIterable'
  , 'ReusableAsyncIterable'

  , 'timestampBasedId'

  , 'allNgrams'
  , 'ngrams'

  , 'allCombinations'
  ].sort()

  const actualExports = Object.keys(Head).sort()

  expect(actualExports).toEqual(expectedExports)
})
