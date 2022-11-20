import * as Head from '@src/index'

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
  ].sort()

  const actualExports = Object.keys(Head).sort()

  expect(actualExports).toEqual(expectedExports)
})
