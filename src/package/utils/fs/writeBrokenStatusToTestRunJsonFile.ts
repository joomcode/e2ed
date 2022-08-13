import {readFile, stat} from 'node:fs/promises';
import {join} from 'node:path';

import {EVENTS_DIRECTORY_PATH, READ_FILE_OPTIONS, TestRunStatus} from '../../constants/internal';

import {E2EDError} from '../E2EDError';

import {writeFile} from './writeFile';

import type {FullTestRun, RunId} from '../../types/internal';

/**
 * Rewrite test run JSON file with broken status.
 * @internal
 */
export const writeBrokenStatusToTestRunJsonFile = async (runId: RunId): Promise<void> => {
  const filePath = join(EVENTS_DIRECTORY_PATH, `${runId}.json`);

  await stat(filePath).catch((cause: unknown) => {
    throw new E2EDError(`Test run JSON file ${filePath} does not exists in temporary directory`, {
      cause,
    });
  });

  const fullTestRunJson = await readFile(filePath, READ_FILE_OPTIONS);
  const fullTestRun = JSON.parse(fullTestRunJson) as FullTestRun;

  const fullTestRunWithBrokenStatus: FullTestRun = {...fullTestRun, status: TestRunStatus.Broken};
  const fullTestRunWithBrokenStatusJson = JSON.stringify(fullTestRunWithBrokenStatus);

  await writeFile(filePath, fullTestRunWithBrokenStatusJson);
};
