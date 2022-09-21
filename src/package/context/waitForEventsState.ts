import {useContext} from '../useContext';
import {RequestHookToWaitForEvents} from '../utils/requestHooks';

import type {
  RequestPredicateWithPromise,
  ResponsePredicateWithPromise,
  WaitForEventsState,
} from '../types/internal';

/**
 * Raw get and set internal (maybe undefined) "wait for events" state.
 * @internal
 */
const [getRawWaitForEventsState, setRawWaitForEventsState] = useContext<WaitForEventsState>();

/**
 * Get internal always defined "wait for events" state (for waitForRequest/waitForResponse).
 * @internal
 */
export const getWaitForEventsState = (): WaitForEventsState => {
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

  const hook = new RequestHookToWaitForEvents(waitForEventsState);

  (waitForEventsState as {hook: RequestHookToWaitForEvents}).hook = hook;

  setRawWaitForEventsState(waitForEventsState);

  return waitForEventsState;
};
