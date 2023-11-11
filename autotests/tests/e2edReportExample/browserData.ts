/* eslint-disable no-console */

import {it} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {createClientFunction, expect} from 'e2ed';
import {
  getBrowserConsoleMessages,
  getBrowserJsErrors,
  navigateToPage,
  setPageElementsIgnoredOnInterfaceStabilization,
  waitForInterfaceStabilization,
} from 'e2ed/actions';

it('correctly read data from browser', {meta: {testId: '14'}}, async () => {
  await navigateToPage(E2edReportExample);

  await setPageElementsIgnoredOnInterfaceStabilization(['.retry']);

  await waitForInterfaceStabilization(100);

  await createClientFunction(() => {
    console.error('error');
    console.info('info');
    console.log('log');
    console.warn('warn');

    const key = Symbol.for('e2ed:PageElementsIgnoredOnInterfaceStabilization');
    const global = globalThis as {[key]?: readonly string[] | undefined};

    console.log(global[key]);

    setTimeout(() => {
      throw new Error('foo');
    }, 8);
    setTimeout(() => {
      throw new Error('bar');
    }, 32);
  })();

  const {error, info, log, warn} = await getBrowserConsoleMessages();

  await expect(
    error[0] === 'error' && info[0] === 'info' && log[0] === 'log' && warn[0] === 'warn',
    '`getBrowserConsoleMessages` read all of messages',
  ).eql(true);

  await expect(log[1], '`setPageElementsIgnoredOnInterfaceStabilization` works correct').eql(
    '.retry',
  );

  const jsErrors = await getBrowserJsErrors();

  await expect(
    jsErrors.length === 2 && jsErrors[0]?.message === 'foo' && jsErrors[1]?.message === 'bar',
    '`getBrowserJsErrors` read JS errors',
  ).eql(true);
});
