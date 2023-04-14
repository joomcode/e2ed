import {TESTCAFE_WARNINGS_KEY} from '../../constants/internal';

import {generalLog} from './generalLog';

/**
 * Reads warnings from TestCafe and logs it as usual logs with generalLog.
 * @internal
 */
export const readTestCafeWarnings = (): void => {
  const global = globalThis as {[TESTCAFE_WARNINGS_KEY]?: readonly string[] | undefined};
  const testCafeWarnings = global[TESTCAFE_WARNINGS_KEY];

  if (testCafeWarnings) {
    for (const warningMessage of testCafeWarnings) {
      generalLog(`Warning from TestCafe: ${warningMessage}`);
    }

    (testCafeWarnings as {length: number}).length = 0;
  }
};
