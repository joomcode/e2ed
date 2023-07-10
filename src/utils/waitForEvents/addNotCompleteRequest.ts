import {assertValueIsDefined, assertValueIsUndefined} from '../asserts';

import {processAllRequestsCompletePredicates} from './processAllRequestsCompletePredicates';

import type {Request, RequestHookContextId, WaitForEventsState} from '../../types/internal';

/**
 * Adds new request to hash of not complete requests.
 * @internal
 */
export const addNotCompleteRequest = async (
  request: Request,
  requestHookContextId: RequestHookContextId | undefined,
  waitForEventsState: WaitForEventsState,
): Promise<void> => {
  assertValueIsDefined(requestHookContextId, 'requestHookContextId is defined', {request});

  const {hashOfNotCompleteRequests} = waitForEventsState;

  assertValueIsUndefined(
    hashOfNotCompleteRequests[requestHookContextId],
    `request with id "${requestHookContextId}" was not added to hash`,
    {request},
  );

  hashOfNotCompleteRequests[requestHookContextId] = request;

  await processAllRequestsCompletePredicates(requestHookContextId, waitForEventsState);
};
