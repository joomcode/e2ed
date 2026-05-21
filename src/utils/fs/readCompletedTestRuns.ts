import {readFile} from 'node:fs/promises';

import {COMPLETED_TEST_RUNS_PATH, READ_FILE_OPTIONS} from '../../constants/internal';

import type {CompletedTestRun} from '../../types/internal';

/**
 * Reads array of completed test runs from temporary directory.
 * @internal
 */
export const readCompletedTestRuns = async (): Promise<readonly CompletedTestRun[]> => {
  const completedTestRunsJsonString = await readFile(
    COMPLETED_TEST_RUNS_PATH,
    READ_FILE_OPTIONS,
  ).catch(() => '');

  return JSON.parse(`[${completedTestRunsJsonString.slice(0, -2)}]`) as CompletedTestRun[];
};
