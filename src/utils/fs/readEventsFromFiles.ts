import {execFile} from 'node:child_process';
import {readdir} from 'node:fs/promises';
import {join} from 'node:path';

import {
  AMOUNT_OF_PARALLEL_OPEN_FILES,
  EVENTS_DIRECTORY_PATH,
  INTERNAL_REPORTS_DIRECTORY_PATH,
} from '../../constants/internal';

import {assertValueIsDefined, assertValueIsTrue} from '../asserts';
import {generalLog} from '../generalLog';
import {getDurationWithUnits} from '../getDurationWithUnits';

import {readEventFromFile} from './readEventFromFile';

import type {FullTestRun, UtcTimeInMs} from '../../types/internal';

/**
 * Reads events objects from temporary directory, with skipping specified events.
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
    const readPromises: Promise<Readonly<{fileName: string; text: string}> | undefined>[] = [];

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

      const promise = readEventFromFile(fileName).then((maybeText) =>
        maybeText === undefined ? undefined : {fileName, text: maybeText},
      );

      readPromises.push(promise);
    }

    const filesWithNames = (await Promise.all(readPromises)).filter((value) => value !== undefined);

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

        const filePath = join(EVENTS_DIRECTORY_PATH, fileName);

        execFile('cp', [filePath, INTERNAL_REPORTS_DIRECTORY_PATH]);
      }
    }
  }

  const durationWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

  generalLog(
    `Read ${fullTestRuns.length} test runs from "${EVENTS_DIRECTORY_PATH}" in ${durationWithUnits}`,
  );

  return fullTestRuns;
};
