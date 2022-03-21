import {TMP_DIRECTORY_PATH} from '../../constants/internal';

import {getFullStartInfo} from '../getAndSetFullStartInfo';
import {removeDirectory} from '../removeDirectory';

import {readEventsFromFiles} from './readEventsFromFiles';

import type {EndE2edRunEvent, FullEventsData} from '../../types/internal';

/**
 * Collect full events data from all sources (for report).
 * @internal
 */
export const collectFullEventsData = async (
  endE2edRunEvent: EndE2edRunEvent,
): Promise<FullEventsData> => {
  const fullStartInfo = getFullStartInfo();
  const testRunsWithHooks = await readEventsFromFiles();

  await removeDirectory(TMP_DIRECTORY_PATH);

  return {endE2edRunEvent, fullStartInfo, testRunsWithHooks};
};
