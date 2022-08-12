import {readdir, readFile} from 'node:fs/promises';
import {join} from 'node:path';

import {
  AMOUNT_OF_PARALLEL_OPEN_FILES,
  EVENTS_DIRECTORY_PATH,
  READ_FILE_OPTIONS,
} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {generalLog} from '../generalLog';

import type {FullTestRun, UtcTimeInMs} from '../../types/internal';

/**
 * Read events objects from temporary directory.
 * @internal
 */
export const readEventsFromFiles = async (): Promise<readonly FullTestRun[]> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const eventFiles = await readdir(EVENTS_DIRECTORY_PATH);
  const testRuns: FullTestRun[] = [];

  for (
    let fileIndex = 0;
    fileIndex < eventFiles.length;
    fileIndex += AMOUNT_OF_PARALLEL_OPEN_FILES
  ) {
    const readPromises: Promise<string>[] = [];

    for (
      let index = fileIndex;
      index < eventFiles.length && index < fileIndex + AMOUNT_OF_PARALLEL_OPEN_FILES;
      index += 1
    ) {
      const fileName = eventFiles[index];

      assertValueIsDefined(fileName, 'fileName is defined', {
        eventFilesLength: eventFiles.length,
        fileIndex,
        index,
      });

      const filePath = join(EVENTS_DIRECTORY_PATH, fileName);
      const promise = readFile(filePath, READ_FILE_OPTIONS);

      readPromises.push(promise);
    }

    const files = await Promise.all(readPromises);

    for (const file of files) {
      const fullTestRun = JSON.parse(file) as FullTestRun;

      testRuns.push(fullTestRun);
    }
  }

  const duration = Date.now() - startTimeInMs;

  generalLog(`Read ${testRuns.length} test runs from "${EVENTS_DIRECTORY_PATH}" in ${duration} ms`);

  return testRuns;
};
