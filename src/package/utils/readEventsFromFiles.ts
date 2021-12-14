import {readdir, readFile} from 'fs/promises';
import {join} from 'path';

import {EVENTS_DIRECTORY_PATH} from '../constants/internal';

import type {TestRun} from '../types/internal';

const AMOUNT_OF_PARALLEL_OPEN_FILES = 40;
const readFileOptions = {encoding: 'utf8'} as const;

/**
 * Read events objects from temporary directory.
 * @internal
 */
export const readEventsFromFiles = async (): Promise<TestRun[]> => {
  const eventFiles = await readdir(EVENTS_DIRECTORY_PATH);
  const testRuns: TestRun[] = [];

  for (
    let fileIndex = 0;
    fileIndex * AMOUNT_OF_PARALLEL_OPEN_FILES < eventFiles.length;
    fileIndex += 1
  ) {
    const readPromises = [];

    for (
      let index = fileIndex;
      index < eventFiles.length && index < fileIndex + AMOUNT_OF_PARALLEL_OPEN_FILES;
      index += 1
    ) {
      const fileName = eventFiles[fileIndex];
      const filePath = join(EVENTS_DIRECTORY_PATH, fileName);
      const promise = readFile(filePath, readFileOptions);

      readPromises.push(promise);
    }

    const files = await Promise.all(readPromises);

    for (const file of files) {
      const testRun = JSON.parse(file) as TestRun;

      testRuns.push(testRun);
    }
  }

  return testRuns;
};
