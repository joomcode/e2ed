import {REQUEST_HOOK_CONTEXT_ID_KEY, REQUEST_HOOK_CONTEXT_KEY} from '../../../constants/internal';

import {assertValueIsDefined} from '../../asserts';
import {addNotCompleteRequest, processEventsPredicates} from '../../waitForEvents';

import {getRequestFromRequestOptions} from '../getRequestFromRequestOptions';

import type {
  RequestHookContextId,
  RequestHookRequestEvent,
  RequestWithUtcTimeInMs,
  UtcTimeInMs,
  WaitForEventsState,
} from '../../../types/internal';

/**
 * `onRequest` event handler.
 * Checks if the request matches any request predicate.
 * @internal
 */
export const onRequest = async (
  event: RequestHookRequestEvent,
  waitForEventsState: WaitForEventsState,
): Promise<void> => {
  const request = getRequestFromRequestOptions(event.requestOptions);
  const requestWithUtcTimeInMs: RequestWithUtcTimeInMs = {
    ...request,
    utcTimeInMs: Date.now() as UtcTimeInMs,
  };

  const requestHookContext = event.requestOptions[REQUEST_HOOK_CONTEXT_KEY];
  const requestHookContextId = (requestHookContext?.[REQUEST_HOOK_CONTEXT_ID_KEY] ||
    // eslint-disable-next-line no-underscore-dangle
    event._requestInfo?.requestId) as RequestHookContextId | undefined;

  assertValueIsDefined(requestHookContextId, 'requestHookContextId is defined', {
    requestWithUtcTimeInMs,
  });

  await addNotCompleteRequest(requestWithUtcTimeInMs, requestHookContextId, waitForEventsState);

  if (waitForEventsState.requestPredicates.size > 0) {
    await processEventsPredicates({
      eventType: 'Request',
      requestOrResponse: requestWithUtcTimeInMs,
      waitForEventsState,
    });
  }
};
