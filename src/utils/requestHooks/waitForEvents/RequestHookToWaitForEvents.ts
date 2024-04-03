import {
  ANY_URL_REGEXP,
  INCLUDE_BODY_AND_HEADERS_IN_RESPONSE_EVENT,
} from '../../../constants/internal';
import {getCdpClient} from '../../../context/cdpClient';

import {addRedirectToWaitForEventsState} from '../addRedirectToWaitForEventsState';
import {removeNotCompleteRequestsByUrl} from '../removeNotCompleteRequestsByUrl';
import {RequestHookWithEvents} from '../RequestHookWithEvents';

import {onConfigureResponse} from './onConfigureResponse';
import {onRequest} from './onRequest';
import {onResponse} from './onResponse';

import type {
  RequestHookConfigureResponseEvent,
  RequestHookRequestEvent,
  RequestHookResponseEvent,
  Url,
  WaitForEventsState,
} from '../../../types/internal';

/**
 * `RequestHook` to wait for request/response events (`waitForAllRequestsComplete`,
 * `waitForRequest`/`waitForResponse`, `waitForRequestToRoute`/`waitForResponseToRoute`).
 * @internal
 */
export class RequestHookToWaitForEvents extends RequestHookWithEvents {
  /**
   * `WaitForEventsState` instance.
   */
  private readonly waitForEventsState: WaitForEventsState;

  constructor(waitForEventsState: WaitForEventsState) {
    super(ANY_URL_REGEXP, INCLUDE_BODY_AND_HEADERS_IN_RESPONSE_EVENT);

    this.waitForEventsState = waitForEventsState;

    const cdpClient = getCdpClient();

    if (cdpClient === undefined) {
      return;
    }

    cdpClient.on('Network.requestWillBeSent', ({redirectResponse}) => {
      if (redirectResponse) {
        addRedirectToWaitForEventsState(redirectResponse, waitForEventsState);
        removeNotCompleteRequestsByUrl(redirectResponse.url as Url, waitForEventsState);
      }
    });
  }

  /**
   * Set `requestHookContextId` to response headers object.
   */
  override async _onConfigureResponse(event: RequestHookConfigureResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    onConfigureResponse(event);
  }

  /**
   * Checks if the request matches any request predicate.
   */
  override onRequest(event: RequestHookRequestEvent): Promise<void> {
    return onRequest(event, this.waitForEventsState);
  }

  /**
   * Checks if the response matches any response predicate.
   */
  override onResponse(event: RequestHookResponseEvent): Promise<void> {
    return onResponse(event, this.waitForEventsState);
  }
}
