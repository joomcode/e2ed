import {EndE2edReason, TMP_DIRECTORY_PATH} from '../../constants/internal';

import {endE2edReason as maybeEndE2edReason} from '../end';
import {readEventsFromFiles, readStartInfo, removeDirectory} from '../fs';
import {getNotIncludedInPackTests} from '../notIncludedInPackTests';

import type {FullEventsData, UtcTimeInMs} from '../../types/internal';

/**
 * Collect full events data from all sources (for report).
 * @internal
 */
export const collectFullEventsData = async (): Promise<FullEventsData> => {
  const endE2edReason = maybeEndE2edReason ?? EndE2edReason.Unknown;
  const endTimeInMs = Date.now() as UtcTimeInMs;
  const fullTestRuns = await readEventsFromFiles([]);
  const notIncludedInPackTests = await getNotIncludedInPackTests();
  const startInfo = await readStartInfo();

  await removeDirectory(TMP_DIRECTORY_PATH);

  return {endE2edReason, endTimeInMs, fullTestRuns, notIncludedInPackTests, startInfo};
};
