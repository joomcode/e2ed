import {getFullPackConfig} from './utils/config';
import {getRunTest} from './utils/test';
import {isUiMode} from './utils/uiMode';

import type {TestFunction} from './types/internal';

import {test as playwrightTest} from '@playwright/test';

/**
 * Creates test with name, metatags, options and test function.
 * @internal
 */
export const test: TestFunction = (name, options, testFn) => {
  const runTest = getRunTest({name, options, testFn});

  let playwrightTestName = name;

  if (isUiMode) {
    const {getTestNamePrefixInUiMode} = getFullPackConfig();

    const prefix = getTestNamePrefixInUiMode(options);

    playwrightTestName = `${prefix} ${name}`;
  }

  if (options.enableCsp !== undefined) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    playwrightTest.use({bypassCSP: !options.enableCsp});
  }

  playwrightTest(playwrightTestName, runTest);
};
