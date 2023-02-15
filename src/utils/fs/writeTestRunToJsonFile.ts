import {stat} from 'node:fs/promises';
import {join} from 'node:path';

import {EVENTS_DIRECTORY_PATH} from '../../constants/internal';

import {E2edError} from '../error';

import {getTestRunEventFileName} from './getTestRunEventFileName';
import {writeFile} from './writeFile';

import type {FullTestRun} from '../../types/internal';

/**
 * Write completed (full) test run object to temporary JSON file.
 * @internal
 */
export const writeTestRunToJsonFile = async (fullTestRun: FullTestRun): Promise<void> => {
  const {runId} = fullTestRun;

  const fileName = getTestRunEventFileName(runId);
  const filePath = join(EVENTS_DIRECTORY_PATH, fileName);

  await stat(filePath).then(
    (stats) => {
      throw new E2edError(`Test run JSON file ${filePath} already exists in temporary directory`, {
        stats,
      });
    },
    () => undefined,
  );

  const data = JSON.stringify(fullTestRun);

  await writeFile(filePath, data);
};
