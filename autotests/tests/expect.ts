/* eslint-disable @typescript-eslint/no-magic-numbers */

import {test} from 'autotests';
import {htmlElementSelector} from 'autotests/selectors';
import {getFullPackConfig} from 'autotests/utils';
import {expect} from 'e2ed';
import {assertFunctionThrows, getTimeoutPromise} from 'e2ed/utils';

test('expect function works correctly', {meta: {testId: '16'}}, async () => {
  const {assertionTimeout} = getFullPackConfig();

  await assertFunctionThrows(async () => {
    await expect(1, 'should throws').eql(2);
  }, 'throws an error when actual value do not fit expected value');

  await expect(
    getTimeoutPromise(assertionTimeout + 900).then(() => true),
    'should not failed by timeout',
  ).ok();

  await assertFunctionThrows(async () => {
    await expect(
      getTimeoutPromise(assertionTimeout + 1_100).then(() => true),
      'should failed by timeout',
    ).ok();
  }, 'throws an timeout error when actual value is a pending promise');

  await expect(Promise.resolve('foo'), 'awaits usual promises').eql('foo');

  await assertFunctionThrows(async () => {
    await expect(
      Promise.resolve('foo'),
      'throws an error when comparing for equality of values of different types',
      // @ts-expect-error: actual value and expected value has different types
    ).eql(3);
  }, 'throws an error when actual value and expected value has different types');

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  expect(1, 'should be an eslint error when we call expect without await').eql(1);

  // eslint-disable-next-line @typescript-eslint/await-thenable
  await expect(1, 'should be an eslint error when we do not call the assertion method');

  // @ts-expect-error: expect function should not accept a selector as a actual value
  await expect(htmlElementSelector, 'should be type error when actual value is a selector').ok();
});
