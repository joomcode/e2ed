import {writeFile} from 'fs/promises';
import {join} from 'path';

import {EVENTS_DIRECTORY_PATH} from '../constants/internal';

import type {CompletedTest} from '../types/internal';

/**
 * Write completed test run object to temporary JSON file.
 */
export const writeCompletedTestToJsonFile = (completedTest: CompletedTest): Promise<void> => {
  const {runId} = completedTest;

  const filePath = join(EVENTS_DIRECTORY_PATH, `${runId}.json`);
  const data = JSON.stringify(completedTest);

  return writeFile(filePath, data);
};
