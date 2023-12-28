import {LogEventType} from '../../constants/internal';
import {getTestRunPromise} from '../../context/testRunPromise';
import {getWaitForEventsState} from '../../context/waitForEventsState';
import {getFullPackConfig} from '../../utils/config';
import {E2edError} from '../../utils/error';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';
import {getPromiseWithResolveAndReject} from '../../utils/promise';
import {RequestHookToWaitForEvents} from '../../utils/requestHooks';

import type {
  Request,
  RequestPredicate,
  RequestPredicateWithPromise,
  RequestWithUtcTimeInMs,
  UtcTimeInMs,
} from '../../types/internal';

/**
 * Waits for some request (from browser) filtered by the request predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForRequest = <SomeRequest extends Request>(
  predicate: RequestPredicate<SomeRequest>,
  {skipLogs = false, timeout}: {skipLogs?: boolean; timeout?: number} = {},
): Promise<RequestWithUtcTimeInMs<SomeRequest>> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  setCustomInspectOnFunction(predicate);

  const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);
  const {waitForRequestTimeout} = getFullPackConfig();
  const rejectTimeout = timeout ?? waitForRequestTimeout;
  const {clearRejectTimeout, promiseWithTimeout, reject, resolve, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject<RequestWithUtcTimeInMs<SomeRequest>, RequestWithUtcTimeInMs>(
      rejectTimeout,
    );

  const requestPredicateWithPromise: RequestPredicateWithPromise = {
    predicate: predicate as RequestPredicate,
    reject,
    resolve,
    skipLogs,
    startTimeInMs,
  };
  const testRunPromise = getTestRunPromise();

  void testRunPromise.then(clearRejectTimeout);

  const timeoutWithUnits = getDurationWithUnits(rejectTimeout);

  setRejectTimeoutFunction(() => {
    const error = new E2edError(
      `waitForRequest promise rejected after ${timeoutWithUnits} timeout`,
      {predicate},
    );

    waitForEventsState.requestPredicates.delete(requestPredicateWithPromise);

    reject(error);
  });

  waitForEventsState.requestPredicates.add(requestPredicateWithPromise);

  if (skipLogs !== true) {
    log(
      `Set wait for request with timeout ${timeoutWithUnits}`,
      {predicate},
      LogEventType.InternalCore,
    );
  }

  return promiseWithTimeout;
};
