import {testController} from '../../testController';

import type {WaitForEventsState} from '../../types/internal';

/**
 * Update "wait for events" state (add or remove request hook).
 * @internal
 */
export const updateWaitForEventsState = async (
  waitForEventsState: WaitForEventsState,
): Promise<void> => {
  const {hook, hookAdded, requestPredicates, responsePredicates} = waitForEventsState;

  const isHookNeeded = requestPredicates.size > 0 && responsePredicates.size > 0;

  if (hookAdded && isHookNeeded !== true) {
    await testController.removeRequestHooks(hook);
  }

  if (hookAdded !== true && isHookNeeded) {
    await testController.addRequestHooks(hook);
  }

  // eslint-disable-next-line no-param-reassign
  (waitForEventsState as {hookAdded: boolean}).hookAdded = isHookNeeded;
};
