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
  Response,
  ResponsePredicate,
  ResponsePredicateWithPromise,
  ResponseWithRequest,
  UtcTimeInMs,
} from '../../types/internal';

/**
 * Waits for some response (from browser) filtered by the response predicate.
 * If the function runs longer than the specified timeout, it is rejected.
 */
export const waitForResponse = <
  SomeResponse extends Response = Response,
  SomeRequest extends Request = Request,
>(
  predicate: ResponsePredicate<SomeRequest, SomeResponse>,
  {skipLogs = false, timeout}: {skipLogs?: boolean; timeout?: number} = {},
): Promise<ResponseWithRequest<SomeResponse, SomeRequest>> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  setCustomInspectOnFunction(predicate);

  const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);
  const {waitForResponseTimeout} = getFullPackConfig();
  const rejectTimeout = timeout ?? waitForResponseTimeout;
  const {clearRejectTimeout, promiseWithTimeout, reject, resolve, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject<
      ResponseWithRequest<SomeResponse, SomeRequest>,
      ResponseWithRequest
    >(rejectTimeout);

  const responsePredicateWithPromise: ResponsePredicateWithPromise = {
    predicate: predicate as ResponsePredicate,
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
      `waitForResponse promise rejected after ${timeoutWithUnits} timeout`,
      {predicateCode: predicate.toString()},
    );

    waitForEventsState.responsePredicates.delete(responsePredicateWithPromise);

    reject(error);
  });

  waitForEventsState.responsePredicates.add(responsePredicateWithPromise);

  if (skipLogs !== true) {
    log(
      `Set wait for response with timeout ${timeoutWithUnits}`,
      {predicate},
      LogEventType.InternalCore,
    );
  }

  return promiseWithTimeout;
};
