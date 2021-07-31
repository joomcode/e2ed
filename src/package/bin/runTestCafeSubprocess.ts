import {runTestCafe} from '../utils/runTestCafe';

import type {RunOptions} from '../utils/runTestCafe';

process.on('message', (runOptions: RunOptions) => {
  void runTestCafe(runOptions);
});
