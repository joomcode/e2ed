import {E2EDError} from './E2EDError';
import {getRunEvents} from './getRunEvents';

import type {RunTestEvent} from '../types/internal';

/**
 * Register run test event (for report) before running test.
 */
export const registerRunTestEvent = (runTestEvent: RunTestEvent): Promise<void> => {
  const {runTestEvents} = getRunEvents();

  const {name} = runTestEvent;

  const duplicateRunTestEvent = runTestEvents.find((event) => event.name === name);

  if (duplicateRunTestEvent) {
    throw new E2EDError(`There are duplicate tests with name "${name}":`, {
      firstTest: duplicateRunTestEvent,
      secondTest: runTestEvent,
    });
  }

  runTestEvents.push(runTestEvent);

  return Promise.resolve();
};
