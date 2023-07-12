import {LogEventType} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {log} from '../log';

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
    const {requestHookContextIds, resolve, startTimeInMs} = allRequestsCompletePredicateWithPromise;
    const requestWasWaited = requestHookContextIds.has(requestHookContextId);

    requestHookContextIds.delete(requestHookContextId);

    if (requestHookContextIds.size > 0 || !requestWasWaited) {
      continue;
    }

    allRequestsCompletePredicates.delete(allRequestsCompletePredicateWithPromise);

    const {predicate} = allRequestsCompletePredicateWithPromise;

    const waitInMs = Date.now() - startTimeInMs;

    log(
      `Have waited for all requests complete for ${waitInMs}ms`,
      {predicate},
      LogEventType.InternalUtil,
    );

    resolve();
  }
};
