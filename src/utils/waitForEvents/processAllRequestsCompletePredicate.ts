import {E2edError} from '../error';

import type {
  AllRequestsCompletePredicateWithPromise,
  Request,
  RequestHookContextId,
} from '../../types/internal';

/**
 * Processes one waitForAllRequestsComplete predicate for new request.
 * Returns `true` if the promise was fulfilled, and `false` otherwise.
 * @internal
 */
export const processAllRequestsCompletePredicate = async (
  allRequestsCompletePredicateWithPromise: AllRequestsCompletePredicateWithPromise,
  request: Request,
  requestHookContextId: RequestHookContextId,
): Promise<boolean> => {
  const {clearResolveTimeout, predicate, reject, requestHookContextIds} =
    allRequestsCompletePredicateWithPromise;

  try {
    const isRequestMatched = await predicate(request);

    if (isRequestMatched !== true) {
      return false;
    }

    clearResolveTimeout?.();

    requestHookContextIds.add(requestHookContextId);
  } catch (cause) {
    clearResolveTimeout?.();

    const error = new E2edError(
      'waitForAllRequestsComplete promise rejected due to error in predicate function',
      {cause, predicate, request},
    );

    reject(error);

    return true;
  }

  return false;
};
