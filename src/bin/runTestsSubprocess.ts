import {getFullPackConfig} from '../utils/config';
import {getGlobalErrorHandler} from '../utils/getGlobalErrorHandler';
import {exitFromTestsSubprocess, runTests} from '../utils/tests';

import type {RunRetryOptions} from '../types/internal';

const {testIdleTimeout} = getFullPackConfig();

const testIdleTimeoutObject = setInterval(() => process.send?.(null), testIdleTimeout);

testIdleTimeoutObject.unref();

process.on('uncaughtException', getGlobalErrorHandler('SubprocessUncaughtException'));
process.on('unhandledRejection', getGlobalErrorHandler('SubprocessUnhandledRejection'));

/**
 * Returns exit code `0`, if all tests passed, and `1` otherwise.
 */
process.on('message', (runRetryOptions: RunRetryOptions) => {
  void runTests(runRetryOptions).then(
    () => exitFromTestsSubprocess({hasError: false, reason: 'run of tests is correctly completed'}),
    () => exitFromTestsSubprocess({hasError: true, reason: 'run of tests completed with error'}),
  );
});
