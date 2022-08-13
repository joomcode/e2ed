import {stat} from 'node:fs/promises';
import {join} from 'node:path';

import {EVENTS_DIRECTORY_PATH} from '../../constants/internal';

import {E2EDError} from '../E2EDError';

import {writeFile} from './writeFile';

import type {FullTestRun} from '../../types/internal';

/**
 * Write completed (full) test run object to temporary JSON file.
 * @internal
 */
export const writeTestRunToJsonFile = async (fullTestRun: FullTestRun): Promise<void> => {
  const {runId} = fullTestRun;

  const filePath = join(EVENTS_DIRECTORY_PATH, `${runId}.json`);

  await stat(filePath).then(
    (stats) => {
      throw new E2EDError(`Test run JSON file ${filePath} already exists in temporary directory`, {
        stats,
      });
    },
    () => undefined,
  );

  const data = JSON.stringify(fullTestRun);

  await writeFile(filePath, data);
};
