import {LogEventType} from '../../constants/internal';
import {getTestRunPromise} from '../../context/testRunPromise';
import {getWaitForEventsState} from '../../context/waitForEventsState';
import {E2edError} from '../../utils/error';
import {getFunctionCode} from '../../utils/fn';
import {getFullPackConfig} from '../../utils/getFullPackConfig';
import {log} from '../../utils/log';
import {getPromiseWithResolveAndReject} from '../../utils/promise';
import {RequestHookToWaitForEvents} from '../../utils/requestHooks';
import {wrapInTestRunTracker} from '../../utils/testRun';
import {updateWaitForEventsState} from '../../utils/waitForEvents';

import type {Request, RequestPredicate, RequestPredicateWithPromise} from '../../types/internal';

/**
 * Wait for some request (from browser) by request predicate.
 */
export const waitForRequest = async <SomeRequest extends Request>(
  predicate: RequestPredicate<SomeRequest>,
  {timeout}: {timeout?: number} = {},
): Promise<SomeRequest> => {
  const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);
  const {waitForRequestTimeout} = getFullPackConfig();
  const rejectTimeout = timeout ?? waitForRequestTimeout;
  const {clearRejectTimeout, promise, reject, resolve, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject<SomeRequest, Request>(rejectTimeout);

  const requestPredicateWithPromise: RequestPredicateWithPromise = {
    predicate: predicate as RequestPredicate,
    reject,
    resolve,
  };
  const testRunPromise = getTestRunPromise();

  void testRunPromise.then(clearRejectTimeout);

  const wrappedSetRejectTimeoutFunction = wrapInTestRunTracker(setRejectTimeoutFunction);

  wrappedSetRejectTimeoutFunction(() => {
    const error = new E2edError(
      `waitForRequest promise rejected after ${rejectTimeout}ms timeout`,
      {predicate},
    );

    waitForEventsState.requestPredicates.delete(requestPredicateWithPromise);

    reject(error);

    return updateWaitForEventsState(waitForEventsState);
  });

  waitForEventsState.requestPredicates.add(requestPredicateWithPromise);

  await updateWaitForEventsState(waitForEventsState);

  log(
    `Set wait for request with timeout ${rejectTimeout}ms`,
    {predicateCode: getFunctionCode(predicate)},
    LogEventType.InternalCore,
  );

  return promise;
};
