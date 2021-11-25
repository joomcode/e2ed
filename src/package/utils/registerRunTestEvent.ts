import {getRunEvents} from './getRunEvents';

import type {RunTestEvent} from '../types/internal';

/**
 * Register run test event (for report) before running test.
 */
export const registerRunTestEvent = (runTestEvent: RunTestEvent): Promise<void> => {
  const {runTestEvents} = getRunEvents();

  runTestEvents.push(runTestEvent);

  return Promise.resolve();
};
