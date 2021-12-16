import {writeFile} from 'fs/promises';
import {join} from 'path';

import {EVENTS_DIRECTORY_PATH} from '../constants/internal';

import type {TestRunWithHooks} from '../types/internal';

/**
 * Write completed test run object to temporary JSON file.
 * @internal
 */
export const writeTestRunToJsonFile = (testRunWithHooks: TestRunWithHooks): Promise<void> => {
  const {runId} = testRunWithHooks;

  const filePath = join(EVENTS_DIRECTORY_PATH, `${runId}.json`);
  const data = JSON.stringify(testRunWithHooks);

  return writeFile(filePath, data);
};
