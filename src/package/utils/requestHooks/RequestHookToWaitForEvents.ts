import {processEventsPredicates} from '../waitForEvents';

import {getRequestFromRequestOptions} from './getRequestFromRequestOptions';
import {getResponseFromRequestContext} from './getResponseFromRequestContext';
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
  constructor(private waitForEventsState: WaitForEventsState) {
    super();
  }

  /**
   * Checks if the request matches any request predicate.
   */
  override async onRequest({requestOptions}: RequestHookRequestEvent): Promise<void> {
    const request = getRequestFromRequestOptions(requestOptions);

    await processEventsPredicates({
      eventType: 'Request',
      requestOrResponse: request,
      waitForEventsState: this.waitForEventsState,
    });
  }

  /**
   * Checks if the response matches any request predicate.
   */
  override async _onConfigureResponse(event: RequestHookResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    const response = await getResponseFromRequestContext(event._requestContext);

    await processEventsPredicates({
      eventType: 'Response',
      requestOrResponse: response,
      waitForEventsState: this.waitForEventsState,
    });
  }
}
