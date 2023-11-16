import {
  ANY_URL_REGEXP,
  INCLUDE_BODY_AND_HEADERS_IN_RESPONSE_EVENT,
  REQUEST_HOOK_CONTEXT_ID_KEY,
  REQUEST_HOOK_CONTEXT_KEY,
} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {mapBackendResponseForLogs} from '../log';
import {setReadonlyProperty} from '../setReadonlyProperty';
import {addNotCompleteRequest, completeRequest, processEventsPredicates} from '../waitForEvents';

import {getRequestFromRequestOptions} from './getRequestFromRequestOptions';
import {getResponseFromResponseEvent} from './getResponseFromResponseEvent';
import {RequestHookWithEvents} from './RequestHookWithEvents';

import type {
  Request,
  RequestHookConfigureResponseEvent,
  RequestHookContextId,
  RequestHookRequestEvent,
  RequestHookResponseEvent,
  WaitForEventsState,
} from '../../types/internal';

/**
 * `RequestHook` to wait for request/response events (`waitForAllRequestsComplete`,
 * `waitForRequest`/`waitForResponse`).
 * @internal
 */
export class RequestHookToWaitForEvents extends RequestHookWithEvents {
  constructor(private readonly waitForEventsState: WaitForEventsState) {
    super(ANY_URL_REGEXP, INCLUDE_BODY_AND_HEADERS_IN_RESPONSE_EVENT);
  }

  /**
   * Checks if the request matches any request predicate.
   */
  override async onRequest(event: RequestHookRequestEvent): Promise<void> {
    const request = getRequestFromRequestOptions(event.requestOptions);
    const requestHookContext = event.requestOptions[REQUEST_HOOK_CONTEXT_KEY];
    const requestHookContextId = requestHookContext[REQUEST_HOOK_CONTEXT_ID_KEY];

    assertValueIsDefined(requestHookContextId, 'requestHookContextId is defined', {request});

    await addNotCompleteRequest(request, requestHookContextId, this.waitForEventsState);

    if (this.waitForEventsState.requestPredicates.size > 0) {
      await processEventsPredicates({
        eventType: 'Request',
        requestOrResponse: request,
        waitForEventsState: this.waitForEventsState,
      });
    }
  }

  /**
   * Checks if the response matches any request predicate.
   */
  override async onResponse(event: RequestHookResponseEvent): Promise<void> {
    const {headers} = event;
    let request: Request | undefined;

    if (headers) {
      const requestHookContextId = (headers as Record<symbol, RequestHookContextId>)[
        REQUEST_HOOK_CONTEXT_ID_KEY
      ];

      assertValueIsDefined(requestHookContextId, 'requestHookContextId is defined', {
        requestHookResponseEvent: event,
      });

      request = this.waitForEventsState.hashOfNotCompleteRequests[requestHookContextId];

      completeRequest(requestHookContextId, this.waitForEventsState);
    }

    const response = await getResponseFromResponseEvent(event);

    setReadonlyProperty(response, 'request', request);

    mapBackendResponseForLogs(response);

    if (this.waitForEventsState.responsePredicates.size > 0) {
      await processEventsPredicates({
        eventType: 'Response',
        requestOrResponse: response,
        waitForEventsState: this.waitForEventsState,
      });
    }
  }

  override async _onConfigureResponse(event: RequestHookConfigureResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    const requestHookContext = event[REQUEST_HOOK_CONTEXT_KEY];
    const requestHookContextId = requestHookContext[REQUEST_HOOK_CONTEXT_ID_KEY];
    const {headers} = requestHookContext.destRes;

    assertValueIsDefined(headers, 'headers is defined', {requestHookConfigureResponseEvent: event});
    assertValueIsDefined(requestHookContextId, 'requestHookContextId is defined', {
      requestHookConfigureResponseEvent: event,
    });

    (headers as {[REQUEST_HOOK_CONTEXT_ID_KEY]: RequestHookContextId})[
      REQUEST_HOOK_CONTEXT_ID_KEY
    ] = requestHookContextId;
  }
}
