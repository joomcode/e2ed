import {TMP_DIRECTORY_PATH} from '../../constants/internal';

import {readEventsFromFiles, readStartInfo, removeDirectory} from '../fs';

import type {FullEventsData, UtcTimeInMs} from '../../types/internal';

/**
 * Collect full events data from all sources (for report).
 * @internal
 */
export const collectFullEventsData = async (): Promise<FullEventsData> => {
  const endTimeInMs = Date.now() as UtcTimeInMs;
  const fullTestRuns = await readEventsFromFiles([]);
  const startInfo = await readStartInfo();

  await removeDirectory(TMP_DIRECTORY_PATH);

  return {endTimeInMs, fullTestRuns, startInfo};
};
