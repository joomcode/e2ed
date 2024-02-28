import {REQUEST_HOOK_CONTEXT_ID_KEY} from '../../../constants/internal';

import {assertValueIsDefined} from '../../asserts';
import {getDurationWithUnits} from '../../getDurationWithUnits';
import {mapBackendResponseForLogs} from '../../log';
import {completeRequest, processEventsPredicates} from '../../waitForEvents';

import {getHeaderValue} from '../getHeaderValue';
import {getResponseFromResponseEvent} from '../getResponseFromResponseEvent';

import type {
  RequestHookContextId,
  RequestHookResponseEvent,
  ResponseWithRequest,
  UtcTimeInMs,
  WaitForEventsState,
} from '../../../types/internal';

/**
 * `onResponse` event handler.
 * Checks if the response matches any response predicate.
 * @internal
 */
export const onResponse = async (
  event: RequestHookResponseEvent,
  waitForEventsState: WaitForEventsState,
): Promise<void> => {
  const {body, headers} = event;

  if (headers === undefined) {
    return;
  }

  const contentLength = getHeaderValue(headers, 'content-length');

  if (contentLength !== '0' && body === undefined) {
    return;
  }

  const requestHookContextId = ((headers as Record<symbol, RequestHookContextId>)[
    REQUEST_HOOK_CONTEXT_ID_KEY
  ] || event.requestId) as RequestHookContextId | undefined;

  assertValueIsDefined(requestHookContextId, 'requestHookContextId is defined', {
    responseHeaders: headers,
  });

  const request = waitForEventsState.hashOfNotCompleteRequests[requestHookContextId];

  if (request === undefined) {
    return;
  }

  completeRequest(requestHookContextId, waitForEventsState);

  const isDecodingNeeded = requestHookContextId !== event.requestId;
  const response = await getResponseFromResponseEvent(event, isDecodingNeeded);
  const completionTimeInMs = Date.now() as UtcTimeInMs;
  const duration = getDurationWithUnits(completionTimeInMs - request.utcTimeInMs);

  const responseWithRequest: ResponseWithRequest = {
    completionTimeInMs,
    duration,
    request,
    ...response,
  };

  mapBackendResponseForLogs(responseWithRequest);

  if (waitForEventsState.responsePredicates.size > 0) {
    await processEventsPredicates({
      eventType: 'Response',
      requestOrResponse: responseWithRequest,
      waitForEventsState,
    });
  }
};
