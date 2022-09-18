import {getWaitForEventsState} from './context/waitForEventsState';
import {getPromiseWithResolveAndReject} from './utils/promise';
import {updateWaitForEventsState} from './utils/waitForEvents';

import type {Request, RequestPredicate} from './types/internal';

/**
 * Wait for some request (from browser) by request predicate.
 */
export const waitForRequest = async <SomeRequest extends Request>(
  predicate: RequestPredicate<SomeRequest>,
): Promise<SomeRequest> => {
  const waitForEventsState = getWaitForEventsState();
  const {promise, reject, resolve} = getPromiseWithResolveAndReject<SomeRequest, Request>();

  waitForEventsState.requestPredicates.add({
    predicate: predicate as RequestPredicate,
    reject,
    resolve,
  });

  await updateWaitForEventsState(waitForEventsState);

  return promise;
};
