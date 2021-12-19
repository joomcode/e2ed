import {TMP_DIRECTORY_PATH, EVENTS_DIRECTORY_PATH} from '../../constants/internal';
import {createDirectory} from '../createDirectory';
import {removeDirectory} from '../removeDirectory';

import {setE2edRunEvent} from './getAndSetE2edRunEvent';

import type {E2edRunEvent} from '../../types/internal';

/**
 * Register start e2ed run event (for report) before running any test.
 * @internal
 */
export const registerStartE2edRunEvent = async (e2edRunEvent: E2edRunEvent): Promise<void> => {
  setE2edRunEvent(e2edRunEvent);

  await removeDirectory(TMP_DIRECTORY_PATH);

  await createDirectory(EVENTS_DIRECTORY_PATH);
};
