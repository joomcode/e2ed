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

test(
  'correctly read data from browser',
  {meta: {testId: '14'}, viewportHeight: 1200, viewportWidth: 1600},
  async () => {
    await navigateToPage(E2edReportExample);

    await createClientFunction(() => {
      console.error('error');
      console.info('info');
      console.log('log');
      console.warn('warning');

      setTimeout(() => {
        throw new Error('foo');
      }, 100);
    })();

    const consoleMessages = getBrowserConsoleMessages();
    const column = 12;
    const columnNumber = column;
    const url = '';

    const consoleMessagesWithoutDate = consoleMessages.map(
      ({dateTimeInIso: _, ...messageWithoutDate}) => messageWithoutDate,
    );

    await expect(consoleMessagesWithoutDate, 'getBrowserConsoleMessages read all of messages').eql([
      {
        args: ['error'],
        location: {column, columnNumber, line: 3, lineNumber: 3, url},
        text: 'error',
        type: 'error',
      },
      {
        args: ['info'],
        location: {column, columnNumber, line: 4, lineNumber: 4, url},
        text: 'info',
        type: 'info',
      },
      {
        args: ['log'],
        location: {column, columnNumber, line: 5, lineNumber: 5, url},
        text: 'log',
        type: 'log',
      },
      {
        args: ['warning'],
        location: {column, columnNumber, line: 6, lineNumber: 6, url},
        text: 'warning',
        type: 'warning',
      },
    ]);

    const jsErrors = getBrowserJsErrors();

    await expect(
      jsErrors.length,
      'getBrowserJsErrors read zero JS errors when there are no errors',
    ).eql(0);

    await waitForInterfaceStabilization(100);

    await expect(jsErrors.length, 'getBrowserJsErrors read all JS errors').eql(1);

    await expect(String(jsErrors[0]?.error), 'getBrowserJsErrors read all JS errors').contains(
      'foo',
    );
  },
);
