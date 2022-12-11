import {ANY_URL_REGEXP, INCLUDE_BODY_AND_HEADERS_IN_RESPONSE_EVENT} from '../../constants/internal';

import {processEventsPredicates} from '../waitForEvents';

import {getRequestFromRequestOptions} from './getRequestFromRequestOptions';
import {getResponseFromResponseEvent} from './getResponseFromResponseEvent';
import {RequestHookWithEvents} from './RequestHookWithEvents';

import type {
  RequestHookRequestEvent,
  RequestHookResponseEvent,
  WaitForEventsState,
} from '../../types/internal';

/**
 * RequestHook to wait for request/response events (waitForRequest/waitForResponse).
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

    await processEventsPredicates({
      eventType: 'Request',
      requestOrResponse: request,
      waitForEventsState: this.waitForEventsState,
    });
  }

  /**
   * Checks if the response matches any request predicate.
   */
  override async onResponse(event: RequestHookResponseEvent): Promise<void> {
    const response = await getResponseFromResponseEvent(event);

    await processEventsPredicates({
      eventType: 'Response',
      requestOrResponse: response,
      waitForEventsState: this.waitForEventsState,
    });
  }
}
