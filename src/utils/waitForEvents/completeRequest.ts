import {assertValueIsDefined} from '../asserts';

import type {RequestHookContextId, WaitForEventsState} from '../../types/internal';

/**
 * Completes request on getting his response.
 * @internal
 */
export const completeRequest = (
  requestHookContextId: RequestHookContextId | undefined,
  waitForEventsState: WaitForEventsState,
): void => {
  assertValueIsDefined(requestHookContextId, 'requestHookContextId is defined');

  const {allRequestsCompletePredicates, hashOfNotCompleteRequests} = waitForEventsState;

  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete hashOfNotCompleteRequests[requestHookContextId];

  for (const allRequestsCompletePredicateWithPromise of allRequestsCompletePredicates) {
    const {requestHookContextIds, setResolveTimeout} = allRequestsCompletePredicateWithPromise;
    const requestWasWaited = requestHookContextIds.has(requestHookContextId);

    requestHookContextIds.delete(requestHookContextId);

    if (requestHookContextIds.size === 0 && requestWasWaited) {
      setResolveTimeout();
    }
  }
};
