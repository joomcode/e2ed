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
  Response,
  ResponsePredicate,
  ResponsePredicateWithPromise,
  UtcTimeInMs,
} from '../../types/internal';

/**
 * Wait for some response (from browser) by the response predicate.
 */
export const waitForResponse = <SomeResponse extends Response>(
  predicate: ResponsePredicate<SomeResponse>,
  {timeout}: {timeout?: number} = {},
): Promise<SomeResponse> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  setCustomInspectOnFunction(predicate);

  const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);
  const {waitForResponseTimeout} = getFullPackConfig();
  const rejectTimeout = timeout ?? waitForResponseTimeout;
  const {clearRejectTimeout, promise, reject, resolve, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject<SomeResponse, Response>(rejectTimeout);

  const responsePredicateWithPromise: ResponsePredicateWithPromise = {
    predicate: predicate as ResponsePredicate,
    reject,
    resolve,
    startTimeInMs,
  };
  const testRunPromise = getTestRunPromise();

  void testRunPromise.then(clearRejectTimeout);

  setRejectTimeoutFunction(() => {
    const error = new E2edError(
      `waitForResponse promise rejected after ${rejectTimeout}ms timeout`,
      {predicateCode: predicate.toString()},
    );

    waitForEventsState.responsePredicates.delete(responsePredicateWithPromise);

    reject(error);
  });

  waitForEventsState.responsePredicates.add(responsePredicateWithPromise);

  log(
    `Set wait for response with timeout ${rejectTimeout}ms`,
    {predicate},
    LogEventType.InternalCore,
  );

  return promise;
};
