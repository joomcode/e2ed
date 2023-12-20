import {assertValueIsDefined, assertValueIsFalse} from '../asserts';

import {isExtensionOfBaseRequest} from './isExtensionOfBaseRequest';
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

  assertValueIsFalse(
    requestHookContextId in hashOfNotCompleteRequests,
    `request with id "${requestHookContextId}" was not added to hash`,
    {request},
  );

  const previousRequestId = Object.keys(hashOfNotCompleteRequests).at(-1) as
    | RequestHookContextId
    | undefined;

  hashOfNotCompleteRequests[requestHookContextId] = request;

  if (previousRequestId) {
    const previousRequest = hashOfNotCompleteRequests[previousRequestId];

    assertValueIsDefined(previousRequest, 'previousRequest is defined', {
      hashOfNotCompleteRequests,
    });

    if (isExtensionOfBaseRequest(request, previousRequest)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete hashOfNotCompleteRequests[previousRequestId];
    }
  }

  await processAllRequestsCompletePredicates(requestHookContextId, waitForEventsState);
};
