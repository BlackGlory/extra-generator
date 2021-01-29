import * as Head from '@src/index'

test('Head', () => {
  const expectedExports: string[] = [
    'of'
  , 'countdown'
  , 'countup'
  , 'range'

  , 'stringifyJSONStream'
  , 'stringifyJSONStreamAsync'
  , 'stringifyNDJSONStream'
  , 'stringifyNDJSONStreamAsync'
  ].sort()

  const actualExports = Object.keys(Head).sort()

  expect(actualExports).toEqual(expectedExports)
})
