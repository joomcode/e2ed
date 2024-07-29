import {readdir, readFile} from 'node:fs/promises';
import {join} from 'node:path';

import {
  AMOUNT_OF_PARALLEL_OPEN_FILES,
  EVENTS_DIRECTORY_PATH,
  READ_FILE_OPTIONS,
} from '../../constants/internal';

import {assertValueIsDefined, assertValueIsTrue} from '../asserts';
import {generalLog} from '../generalLog';
import {getDurationWithUnits} from '../getDurationWithUnits';

import type {FullTestRun, UtcTimeInMs} from '../../types/internal';

/**
 * Read events objects from temporary directory, with skipping specified events.
 * @internal
 */
export const readEventsFromFiles = async (
  skippedEventFiles: readonly string[],
): Promise<readonly FullTestRun[]> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const allEventFiles = await readdir(EVENTS_DIRECTORY_PATH);

  for (const skippedEventFile of skippedEventFiles) {
    assertValueIsTrue(
      allEventFiles.includes(skippedEventFile),
      `skipped event file ${skippedEventFile} is present in the event directory`,
      {allEventFiles, skippedEventFiles},
    );
  }

  const newEventFiles = allEventFiles.filter((fileName) => !skippedEventFiles.includes(fileName));

  const fullTestRuns: FullTestRun[] = [];

  for (
    let fileIndex = 0;
    fileIndex < newEventFiles.length;
    fileIndex += AMOUNT_OF_PARALLEL_OPEN_FILES
  ) {
    const readPromises: Promise<Readonly<{fileName: string; text: string}>>[] = [];

    for (
      let index = fileIndex;
      index < newEventFiles.length && index < fileIndex + AMOUNT_OF_PARALLEL_OPEN_FILES;
      index += 1
    ) {
      const fileName = newEventFiles[index];

      assertValueIsDefined(fileName, 'fileName is defined', {
        fileIndex,
        index,
        newEventFilesLength: newEventFiles.length,
      });

      const filePath = join(EVENTS_DIRECTORY_PATH, fileName);
      const promise = readFile(filePath, READ_FILE_OPTIONS).then((text) => ({fileName, text}));

      readPromises.push(promise);
    }

    const filesWithNames = await Promise.all(readPromises);

    for (const {fileName, text} of filesWithNames) {
      try {
        const fullTestRun = JSON.parse(text) as FullTestRun;

        fullTestRuns.push(fullTestRun);
      } catch (error) {
        generalLog('Caught an error on parsing JSON of test run', {
          error,
          fileName,
          textLenght: text.length,
        });
      }
    }
  }

  const durationWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

  generalLog(
    `Read ${fullTestRuns.length} test runs from "${EVENTS_DIRECTORY_PATH}" in ${durationWithUnits}`,
  );

  return fullTestRuns;
};
