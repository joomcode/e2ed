import {runTestCafe} from '../utils/runTestCafe';

import type {RunRetryOptions} from '../types/internal';

/**
 * Return exit code 0, if all tests passed, and 1 otherwise.
 */
process.on('message', (runOptions: RunRetryOptions) => {
  void runTestCafe(runOptions).then(
    () => process.exit(0),
    () => process.exit(1),
  );
});
