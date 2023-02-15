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

import type {Response, ResponsePredicate, ResponsePredicateWithPromise} from '../../types/internal';

/**
 * Wait for some response (from browser) by response predicate.
 */
export const waitForResponse = async <SomeResponse extends Response>(
  predicate: ResponsePredicate<SomeResponse>,
  {timeout}: {timeout?: number} = {},
): Promise<SomeResponse> => {
  const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);
  const {waitForResponseTimeout} = getFullPackConfig();
  const rejectTimeout = timeout ?? waitForResponseTimeout;
  const {clearRejectTimeout, promise, reject, resolve, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject<SomeResponse, Response>(rejectTimeout);

  const responsePredicateWithPromise: ResponsePredicateWithPromise = {
    predicate: predicate as ResponsePredicate,
    reject,
    resolve,
  };
  const testRunPromise = getTestRunPromise();

  void testRunPromise.then(clearRejectTimeout);

  const wrappedSetRejectTimeoutFunction = wrapInTestRunTracker(setRejectTimeoutFunction);

  wrappedSetRejectTimeoutFunction(() => {
    const error = new E2edError(
      `waitForResponse promise rejected after ${rejectTimeout}ms timeout`,
      {predicateCode: predicate.toString()},
    );

    waitForEventsState.responsePredicates.delete(responsePredicateWithPromise);

    reject(error);

    return updateWaitForEventsState(waitForEventsState);
  });

  waitForEventsState.responsePredicates.add(responsePredicateWithPromise);

  await updateWaitForEventsState(waitForEventsState);

  log(
    `Set wait for response with timeout ${rejectTimeout}ms`,
    {predicateCode: getFunctionCode(predicate)},
    LogEventType.InternalCore,
  );

  return promise;
};
