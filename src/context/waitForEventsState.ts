import {useContext} from '../useContext';

import type {
  AllRequestsCompletePredicateWithPromise,
  RequestPredicateWithPromise,
  ResponsePredicateWithPromise,
  Url,
  WaitForEventsState,
} from '../types/internal';

/**
 * Raw get and set internal (maybe `undefined`) "wait for events" state.
 * @internal
 */
const [getRawWaitForEventsState, setRawWaitForEventsState] = useContext<WaitForEventsState>();

/**
 * Get internal always defined "wait for events" state (for `waitForRequest`/`waitForResponse`).
 * @internal
 */
export const getWaitForEventsState = (): WaitForEventsState => {
  const maybeWaitForEventsState = getRawWaitForEventsState();

  if (maybeWaitForEventsState !== undefined) {
    return maybeWaitForEventsState;
  }

  const waitForEventsState: WaitForEventsState = {
    allRequestsCompletePredicates: new Set<AllRequestsCompletePredicateWithPromise>(),
    hashOfNotCompleteRequests: Object.create(
      null,
    ) as WaitForEventsState['hashOfNotCompleteRequests'],
    redirects: Object.create(null) as Record<Url, Url>,
    requestPredicates: new Set<RequestPredicateWithPromise>(),
    responsePredicates: new Set<ResponsePredicateWithPromise>(),
  };

  setRawWaitForEventsState(waitForEventsState);

  return waitForEventsState;
};
