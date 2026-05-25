import {appendFile} from 'node:fs/promises';

import {COMPLETED_TEST_RUNS_PATH} from '../../constants/internal';

import type {CompletedTestRun} from '../../types/internal';

/**
 * Writes completed test run test to common file.
 * @internal
 */
export const writeCompletedTestRun = async (completedTestRun: CompletedTestRun): Promise<void> => {
  const completedTestRunJsonString = JSON.stringify(completedTestRun);

  await appendFile(COMPLETED_TEST_RUNS_PATH, `${completedTestRunJsonString},\n`);
};
