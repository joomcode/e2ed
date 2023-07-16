import {LogEventType} from '../../constants/internal';
import {getTestRunPromise} from '../../context/testRunPromise';
import {getWaitForEventsState} from '../../context/waitForEventsState';
import {E2edError} from '../../utils/error';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getFullPackConfig} from '../../utils/getFullPackConfig';
import {log} from '../../utils/log';
import {getPromiseWithResolveAndReject} from '../../utils/promise';
import {RequestHookToWaitForEvents} from '../../utils/requestHooks';

import type {
  Request,
  RequestPredicate,
  RequestPredicateWithPromise,
  UtcTimeInMs,
} from '../../types/internal';

/**
 * Wait for some request (from browser) by the request predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForRequest = <SomeRequest extends Request>(
  predicate: RequestPredicate<SomeRequest>,
  {timeout}: {timeout?: number} = {},
): Promise<SomeRequest> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  setCustomInspectOnFunction(predicate);

  const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);
  const {waitForRequestTimeout} = getFullPackConfig();
  const rejectTimeout = timeout ?? waitForRequestTimeout;
  const {clearRejectTimeout, promise, reject, resolve, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject<SomeRequest, Request>(rejectTimeout);

  const requestPredicateWithPromise: RequestPredicateWithPromise = {
    predicate: predicate as RequestPredicate,
    reject,
    resolve,
    startTimeInMs,
  };
  const testRunPromise = getTestRunPromise();

  void testRunPromise.then(clearRejectTimeout);

  setRejectTimeoutFunction(() => {
    const error = new E2edError(
      `waitForRequest promise rejected after ${rejectTimeout}ms timeout`,
      {predicate},
    );

    waitForEventsState.requestPredicates.delete(requestPredicateWithPromise);

    reject(error);
  });

  waitForEventsState.requestPredicates.add(requestPredicateWithPromise);

  log(
    `Set wait for request with timeout ${rejectTimeout}ms`,
    {predicate},
    LogEventType.InternalCore,
  );

  return promise;
};
