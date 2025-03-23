import {assertValueIsDefined} from '../asserts';
import {E2edError} from '../error';
import {getEntries} from '../object';

import type {
  RequestHookContextId,
  RequestPredicate,
  WaitForEventsState,
} from '../../types/internal';

type HashOfNotCompleteRequests = WaitForEventsState['hashOfNotCompleteRequests'];

/**
 * Get initial set of `requestHookContextId` for predicate of `waitForAllRequestsComplete` function.
 * @internal
 */
export const getInitialIdsForAllRequestsCompletePredicate = async (
  hashOfNotCompleteRequests: HashOfNotCompleteRequests,
  predicate: RequestPredicate,
): Promise<Set<RequestHookContextId>> => {
  const requestHookContextIds = new Set<RequestHookContextId>();

  const promises = getEntries(hashOfNotCompleteRequests).map(
    async ([requestHookContextId, request]) => {
      assertValueIsDefined(request, 'request is defined', {predicate, requestHookContextId});

      try {
        const isMatched = await predicate(request);

        if (isMatched === true) {
          requestHookContextIds.add(requestHookContextId);
        }
      } catch (cause) {
        const error = new E2edError(
          'waitForAllRequestsComplete promise rejected due to error in predicate function',
          {cause, predicate, request},
        );

        throw error;
      }
    },
  );

  await Promise.all(promises);

  return requestHookContextIds;
};
