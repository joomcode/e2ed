import {assertValueIsDefined} from '../asserts';
import {log} from '../log';

import {isReRequest} from './isReRequest';
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

  hashOfNotCompleteRequests[requestHookContextId] = request;

  log(`Add not complete request with url ${request.url}`, {
    logTag: 'waitForAllRequestsComplete',
    requestHookContextId,
  });

  for (const previousRequestId of Object.keys(
    hashOfNotCompleteRequests,
  ) as RequestHookContextId[]) {
    if (previousRequestId === requestHookContextId) {
      continue;
    }

    const previousRequest = hashOfNotCompleteRequests[previousRequestId];

    assertValueIsDefined(previousRequest, 'previousRequest is defined', {
      hashOfNotCompleteRequests,
      url: request.url,
    });

    if (isReRequest(request, previousRequest)) {
      log(`Remove duplicate request with url ${previousRequest.url}`, {
        logTag: 'waitForAllRequestsComplete',
        previousRequestId,
      });

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete hashOfNotCompleteRequests[previousRequestId];
    }
  }

  await processAllRequestsCompletePredicates(requestHookContextId, waitForEventsState);
};
