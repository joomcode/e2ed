import {LogEventType} from '../../constants/internal';
import {getTestRunPromise} from '../../context/testRunPromise';
import {getWaitForEventsState} from '../../context/waitForEventsState';
import {E2edError} from '../../utils/error';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getFullPackConfig} from '../../utils/getFullPackConfig';
import {log} from '../../utils/log';
import {getPromiseWithResolveAndReject} from '../../utils/promise';
import {RequestHookToWaitForEvents} from '../../utils/requestHooks';
import {setReadonlyProperty} from '../../utils/setReadonlyProperty';
import {getInitialIdsForAllRequestsCompletePredicate} from '../../utils/waitForEvents';

import type {
  AllRequestsCompletePredicateWithPromise,
  RequestPredicate,
  Void,
} from '../../types/internal';

/**
 * Wait for the complete of all requests that satisfy the request predicate.
 */
export const waitForAllRequestsComplete = async (
  predicate: RequestPredicate,
  {firstRequestTimeout, timeout}: {firstRequestTimeout?: number; timeout?: number} = {},
): Promise<void> => {
  setCustomInspectOnFunction(predicate);

  const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);

  const requestHookContextIds = await getInitialIdsForAllRequestsCompletePredicate(
    waitForEventsState.hashOfNotCompleteRequests,
    predicate,
  );

  const {waitForAllRequestsComplete: defaultTimeouts} = getFullPackConfig();

  const firstRequestResolveTimeout = firstRequestTimeout ?? defaultTimeouts.firstRequestTimeout;
  const rejectTimeout = timeout ?? defaultTimeouts.timeout;

  const {clearRejectTimeout, promise, reject, resolve, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject<Void>(rejectTimeout);

  const allRequestsCompletePredicateWithPromise: AllRequestsCompletePredicateWithPromise = {
    clearResolveTimeout: undefined,
    predicate,
    reject,
    requestHookContextIds,
    resolve,
  };
  const testRunPromise = getTestRunPromise();

  void testRunPromise.then(clearRejectTimeout);

  setRejectTimeoutFunction(() => {
    const error = new E2edError(
      `waitForAllRequestsComplete promise rejected after ${rejectTimeout}ms timeout`,
      {predicate},
    );

    waitForEventsState.allRequestsCompletePredicates.delete(
      allRequestsCompletePredicateWithPromise,
    );

    reject(error);
  });

  waitForEventsState.allRequestsCompletePredicates.add(allRequestsCompletePredicateWithPromise);

  log(
    `Set wait for all requests complete with timeout ${rejectTimeout}ms and first request timeout ${firstRequestResolveTimeout}ms`,
    {predicate},
    LogEventType.InternalCore,
  );

  if (requestHookContextIds.size === 0) {
    const {clearRejectTimeout: clearResolveTimeout, promise: firstRequestResolvePromise} =
      getPromiseWithResolveAndReject<Void>(firstRequestResolveTimeout);

    setReadonlyProperty(
      allRequestsCompletePredicateWithPromise,
      'clearResolveTimeout',
      clearResolveTimeout,
    );

    void testRunPromise.then(clearResolveTimeout);

    firstRequestResolvePromise.catch(() => {
      waitForEventsState.allRequestsCompletePredicates.delete(
        allRequestsCompletePredicateWithPromise,
      );

      resolve();
    });
  }

  return promise;
};
