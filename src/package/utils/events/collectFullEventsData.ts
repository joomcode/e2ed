import {TMP_DIRECTORY_PATH} from '../../constants/internal';

import {removeDirectory} from '../removeDirectory';

import {getE2edRunEvent} from './getAndSetE2edRunEvent';
import {readEventsFromFiles} from './readEventsFromFiles';

import type {EndE2edRunEvent, FullEventsData} from '../../types/internal';

/**
 * Collect full events data from all sources (for report).
 * @internal
 */
export const collectFullEventsData = async (
  endE2edRunEvent: EndE2edRunEvent,
): Promise<FullEventsData> => {
  const e2edRunEvent = getE2edRunEvent();
  const testRunsWithHooks = await readEventsFromFiles();

  await removeDirectory(TMP_DIRECTORY_PATH);

  return {e2edRunEvent, endE2edRunEvent, testRunsWithHooks};
};
