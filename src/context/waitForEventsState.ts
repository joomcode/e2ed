import {useContext} from '../useContext';

import type {
  RequestPredicateWithPromise,
  ResponsePredicateWithPromise,
  WaitForEventsState,
} from '../types/internal';
import type {RequestHookToWaitForEvents} from '../utils/requestHooks';

/**
 * Raw get and set internal (maybe undefined) "wait for events" state.
 * @internal
 */
const [getRawWaitForEventsState, setRawWaitForEventsState] = useContext<WaitForEventsState>();

/**
 * Get internal always defined "wait for events" state (for waitForRequest/waitForResponse).
 * @internal
 */
export const getWaitForEventsState = (
  RequestHookToWaitForEventsClass: typeof RequestHookToWaitForEvents,
): WaitForEventsState => {
  const maybeWaitForEventsState = getRawWaitForEventsState();

  if (maybeWaitForEventsState !== undefined) {
    return maybeWaitForEventsState;
  }

  const waitForEventsState: WaitForEventsState = {
    hook: {} as RequestHookToWaitForEvents,
    hookAdded: false,
    requestPredicates: new Set<RequestPredicateWithPromise>(),
    responsePredicates: new Set<ResponsePredicateWithPromise>(),
  };

  const hook = new RequestHookToWaitForEventsClass(waitForEventsState);

  (waitForEventsState as {hook: RequestHookToWaitForEvents}).hook = hook;

  setRawWaitForEventsState(waitForEventsState);

  return waitForEventsState;
};
