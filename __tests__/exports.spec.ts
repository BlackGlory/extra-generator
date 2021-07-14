import * as Head from '@src/index'

test('Head', () => {
  const expectedExports: string[] = [
    'of'
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
  ].sort()

  const actualExports = Object.keys(Head).sort()

  expect(actualExports).toEqual(expectedExports)
})
