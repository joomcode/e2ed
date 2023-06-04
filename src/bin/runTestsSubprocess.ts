import {getFullPackConfig} from '../utils/getFullPackConfig';
import {runTests} from '../utils/tests';

import type {RunRetryOptions} from '../types/internal';

const {testIdleTimeout} = getFullPackConfig();

setInterval(() => process.send?.(null), testIdleTimeout);

/**
 * Returns exit code 0, if all tests passed, and 1 otherwise.
 */
process.on('message', (runRetryOptions: RunRetryOptions) => {
  void runTests(runRetryOptions).then(
    () => process.exit(0),
    () => process.exit(1),
  );
});
