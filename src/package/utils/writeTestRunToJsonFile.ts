import {stat} from 'fs/promises';
import {join} from 'path';

import {EVENTS_DIRECTORY_PATH} from '../constants/internal';

import {E2EDError} from './E2EDError';
import {writeFile} from './writeFile';

import type {TestRunWithHooks} from '../types/internal';

/**
 * Write completed test run object to temporary JSON file.
 * @internal
 */
export const writeTestRunToJsonFile = async (testRunWithHooks: TestRunWithHooks): Promise<void> => {
  const {runId} = testRunWithHooks;

  const filePath = join(EVENTS_DIRECTORY_PATH, `${runId}.json`);

  await stat(filePath).then(
    (stats) => {
      throw new E2EDError(`JSON file ${filePath} already exists in temporary directory`, {stats});
    },
    () => undefined,
  );

  const data = JSON.stringify(testRunWithHooks);

  await writeFile(filePath, data);
};
