import {assertValueIsUndefined} from '../asserts';

import {processAllRequestsCompletePredicates} from './processAllRequestsCompletePredicates';

import type {
  RequestHookContextId,
  RequestWithUtcTimeInMs,
  WaitForEventsState,
} from '../../types/internal';

/**
 * Adds new request to hash of not complete requests.
 * @internal
 */
export const addNotCompleteRequest = async (
  request: RequestWithUtcTimeInMs,
  requestHookContextId: RequestHookContextId,
  waitForEventsState: WaitForEventsState,
): Promise<void> => {
  const {hashOfNotCompleteRequests} = waitForEventsState;

  assertValueIsUndefined(
    hashOfNotCompleteRequests[requestHookContextId],
    `request with id "${requestHookContextId}" was not added to hash`,
    {request},
  );

  hashOfNotCompleteRequests[requestHookContextId] = request;

  await processAllRequestsCompletePredicates(requestHookContextId, waitForEventsState);
};
