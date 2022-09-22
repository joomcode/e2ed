import {LogEventType} from '../../constants/internal';
import {getWaitForEventsState} from '../../context/waitForEventsState';
import {E2EDError} from '../../utils/E2EDError';
import {getFullConfig} from '../../utils/getFullConfig';
import {log} from '../../utils/log';
import {getPromiseWithResolveAndReject} from '../../utils/promise';
import {updateWaitForEventsState} from '../../utils/waitForEvents';

import type {Request, RequestPredicate} from '../../types/internal';

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
  const {promise, reject, resolve, setRejectTimeoutFunction} = getPromiseWithResolveAndReject<
    SomeRequest,
    Request
  >(rejectTimeout);

  setRejectTimeoutFunction(() => {
    const error = new E2EDError(
      `waitForRequest promise rejected after ${rejectTimeout}ms timeout`,
      {predicate},
    );

    reject(error);
  });

  waitForEventsState.requestPredicates.add({
    predicate: predicate as RequestPredicate,
    reject,
    resolve,
  });

  await updateWaitForEventsState(waitForEventsState);

  await log(
    `Set wait for request with timeout ${rejectTimeout}ms`,
    {predicateCode: predicate.toString()},
    LogEventType.InternalCore,
  );

  return promise;
};
