import {RESOLVED_PROMISE} from '../../constants/internal';
import {testController} from '../../testController';

import type {WaitForEventsState} from '../../types/internal';

/**
 * Update "wait for events" state (add or remove request hook).
 * @internal
 */
export const updateWaitForEventsState = (waitForEventsState: WaitForEventsState): Promise<void> => {
  const {hook, hookAdded, requestPredicates, responsePredicates} = waitForEventsState;

  const isHookNeeded = requestPredicates.size > 0 || responsePredicates.size > 0;

  if (hookAdded && isHookNeeded !== true) {
    // eslint-disable-next-line no-param-reassign
    (waitForEventsState as {hookAdded: boolean}).hookAdded = false;

    return testController.removeRequestHooks(hook);
  }

  if (hookAdded !== true && isHookNeeded) {
    // eslint-disable-next-line no-param-reassign
    (waitForEventsState as {hookAdded: boolean}).hookAdded = true;

    return testController.addRequestHooks(hook);
  }

  return RESOLVED_PROMISE;
};
