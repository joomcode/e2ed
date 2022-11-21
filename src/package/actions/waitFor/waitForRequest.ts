import {LogEventType} from '../../constants/internal';
import {getTestRunPromise} from '../../context/testRunPromise';
import {getWaitForEventsState} from '../../context/waitForEventsState';
import {E2edError} from '../../utils/E2edError';
import {getFullConfig} from '../../utils/getFullConfig';
import {log} from '../../utils/log';
import {getPromiseWithResolveAndReject} from '../../utils/promise';
import {updateWaitForEventsState} from '../../utils/waitForEvents';
import {wrapInTestRunTracker} from '../../utils/wrapInTestRunTracker';

import type {Request, RequestPredicate, RequestPredicateWithPromise} from '../../types/internal';

/**
 * Wait for some request (from browser) by request predicate.
 */
export const waitForRequest = async <SomeRequest extends Request>(
  predicate: RequestPredicate<SomeRequest>,
  {timeout}: {timeout?: number} = {},
): Promise<SomeRequest> => {
  const waitForEventsState = getWaitForEventsState();
  const {waitForRequestTimeout} = getFullConfig();
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

  await log(
    `Set wait for request with timeout ${rejectTimeout}ms`,
    {predicateCode: predicate.toString()},
    LogEventType.InternalCore,
  );

  return promise;
};
