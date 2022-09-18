import {getWaitForEventsState} from './context/waitForEventsState';
import {getPromiseWithResolveAndReject} from './utils/promise';
import {updateWaitForEventsState} from './utils/waitForEvents';

import type {Response, ResponsePredicate} from './types/internal';

/**
 * Wait for some response (from browser) by response predicate.
 */
export const waitForResponse = async <SomeResponse extends Response>(
  predicate: ResponsePredicate<SomeResponse>,
): Promise<SomeResponse> => {
  const waitForEventsState = getWaitForEventsState();
  const {promise, reject, resolve} = getPromiseWithResolveAndReject<SomeResponse, Response>();

  waitForEventsState.responsePredicates.add({
    predicate: predicate as ResponsePredicate,
    reject,
    resolve,
  });

  await updateWaitForEventsState(waitForEventsState);

  return promise;
};
