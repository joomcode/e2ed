/* eslint-disable @typescript-eslint/no-magic-numbers, no-console */

import {test} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {createClientFunction, expect} from 'e2ed';
import {
  getBrowserConsoleMessages,
  getBrowserJsErrors,
  navigateToPage,
  waitForInterfaceStabilization,
} from 'e2ed/actions';

test('correctly read data from browser', {meta: {testId: '14'}}, async () => {
  await navigateToPage(E2edReportExample);

  await waitForInterfaceStabilization(100);

  await createClientFunction(() => {
    console.error('error');
    console.info('info');
    console.log('log');
    console.warn('warn');

    setTimeout(() => {
      throw new Error('foo');
    }, 8);
    setTimeout(() => {
      throw new Error('bar');
    }, 32);
  })();

  const {error, info, log, warn} = await getBrowserConsoleMessages();

  await expect(
    error.length === 0 && info.length === 0 && log.length === 0 && warn.length === 0,
    'getBrowserConsoleMessages read all of messages',
  ).eql(true);

  const jsErrors = await getBrowserJsErrors();

  await expect(jsErrors.length === 0, 'getBrowserJsErrors read JS errors').eql(true);
});
