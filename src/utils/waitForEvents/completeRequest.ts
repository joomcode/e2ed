import {log} from '../log';

import type {RequestHookContextId, WaitForEventsState} from '../../types/internal';

/**
 * Completes request on getting of its response.
 * @internal
 */
export const completeRequest = (
  requestHookContextId: RequestHookContextId,
  waitForEventsState: WaitForEventsState,
): void => {
  const {allRequestsCompletePredicates, hashOfNotCompleteRequests} = waitForEventsState;

  log(`Complete request with url ${hashOfNotCompleteRequests[requestHookContextId]?.url}`, {
    logTag: 'waitForAllRequestsComplete',
    requestHookContextId,
  });

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
