import {writeFile} from 'fs/promises';
import {join} from 'path';

import {EVENTS_DIRECTORY_PATH} from '../constants/internal';

import type {TestRun} from '../types/internal';

/**
 * Write completed test run object to temporary JSON file.
 * @internal
 */
export const writeTestRunToJsonFile = (testRun: TestRun): Promise<void> => {
  const {runId} = testRun;

  const filePath = join(EVENTS_DIRECTORY_PATH, `${runId}.json`);
  const data = JSON.stringify(testRun);

  return writeFile(filePath, data);
};
