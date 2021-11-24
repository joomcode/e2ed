import {runTestCafe} from '../utils/runTestCafe';

import type {TestCafeRunOptions} from '../types/internal';

process.on('message', (runOptions: TestCafeRunOptions) => {
  void runTestCafe(runOptions);
});
