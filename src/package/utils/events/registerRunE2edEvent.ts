import {TMP_DIRECTORY_PATH, EVENTS_DIRECTORY_PATH} from '../../constants/internal';
import {createDirectory} from '../createDirectory';
import {setRunE2edEvent} from '../getAndSetRunE2edEvent';
import {removeDirectory} from '../removeDirectory';

import type {RunE2edEvent} from '../../types/internal';

/**
 * Register run e2ed event (for report) before running any test.
 * @internal
 */
export const registerRunE2edEvent = async (runE2edEvent: RunE2edEvent): Promise<void> => {
  setRunE2edEvent(runE2edEvent);

  await removeDirectory(TMP_DIRECTORY_PATH);

  await createDirectory(EVENTS_DIRECTORY_PATH);
};
