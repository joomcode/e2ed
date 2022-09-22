import {LogEventType} from '../../constants/internal';
import {getWaitForEventsState} from '../../context/waitForEventsState';
import {E2EDError} from '../../utils/E2EDError';
import {getFullConfig} from '../../utils/getFullConfig';
import {log} from '../../utils/log';
import {getPromiseWithResolveAndReject} from '../../utils/promise';
import {updateWaitForEventsState} from '../../utils/waitForEvents';

import type {Response, ResponsePredicate} from '../../types/internal';

/**
 * Wait for some response (from browser) by response predicate.
 */
export const waitForResponse = async <SomeResponse extends Response>(
  predicate: ResponsePredicate<SomeResponse>,
  {timeout}: {timeout?: number} = {},
): Promise<SomeResponse> => {
  const waitForEventsState = getWaitForEventsState();
  const {waitForResponseTimeout} = getFullConfig();
  const rejectTimeout = timeout ?? waitForResponseTimeout;
  const {promise, reject, resolve, setRejectTimeoutFunction} = getPromiseWithResolveAndReject<
    SomeResponse,
    Response
  >(rejectTimeout);

  setRejectTimeoutFunction(() => {
    const error = new E2EDError(
      `waitForResponse promise rejected after ${rejectTimeout}ms timeout`,
      {predicateCode: predicate.toString()},
    );

    reject(error);
  });

  waitForEventsState.responsePredicates.add({
    predicate: predicate as ResponsePredicate,
    reject,
    resolve,
  });

  await updateWaitForEventsState(waitForEventsState);

  await log(
    `Set wait for response with timeout ${rejectTimeout}ms`,
    {predicateCode: predicate.toString()},
    LogEventType.InternalCore,
  );

  return promise;
};
