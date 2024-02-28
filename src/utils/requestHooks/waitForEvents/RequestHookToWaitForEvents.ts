import {
  ANY_URL_REGEXP,
  INCLUDE_BODY_AND_HEADERS_IN_RESPONSE_EVENT,
  REQUEST_HOOK_CONTEXT_ID_KEY,
  REQUEST_HOOK_CONTEXT_KEY,
} from '../../../constants/internal';
import {getCdpClient} from '../../../context/cdpClient';

import {assertValueIsDefined} from '../../asserts';
import {getFullPackConfig} from '../../config';
import {addNotCompleteRequest, processEventsPredicates} from '../../waitForEvents';

import {addRedirectToWaitForEventsState} from '../addRedirectToWaitForEventsState';
import {getRequestFromRequestOptions} from '../getRequestFromRequestOptions';
import {removeNotCompleteRequestsByUrl} from '../removeNotCompleteRequestsByUrl';
import {RequestHookWithEvents} from '../RequestHookWithEvents';

import {onResponse} from './onResponse';

import type {
  RequestHookConfigureResponseEvent,
  RequestHookContextId,
  RequestHookRequestEvent,
  RequestHookResponseEvent,
  RequestWithUtcTimeInMs,
  Url,
  UtcTimeInMs,
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

    if (!getFullPackConfig().enableChromeDevToolsProtocol) {
      return;
    }

    const cdpClient = getCdpClient();

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

    const requestHookContext = event[REQUEST_HOOK_CONTEXT_KEY];
    const requestHookContextId = requestHookContext?.[REQUEST_HOOK_CONTEXT_ID_KEY];

    // eslint-disable-next-line no-underscore-dangle
    const headers = requestHookContext?._ctx?.destRes?.headers;

    if (headers && requestHookContextId) {
      (headers as {[REQUEST_HOOK_CONTEXT_ID_KEY]: RequestHookContextId})[
        REQUEST_HOOK_CONTEXT_ID_KEY
      ] = requestHookContextId;
    }
  }

  /**
   * Checks if the request matches any request predicate.
   */
  override async onRequest(event: RequestHookRequestEvent): Promise<void> {
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

    await addNotCompleteRequest(
      requestWithUtcTimeInMs,
      requestHookContextId,
      this.waitForEventsState,
    );

    if (this.waitForEventsState.requestPredicates.size > 0) {
      await processEventsPredicates({
        eventType: 'Request',
        requestOrResponse: requestWithUtcTimeInMs,
        waitForEventsState: this.waitForEventsState,
      });
    }
  }

  /**
   * Checks if the response matches any response predicate.
   */
  override onResponse(event: RequestHookResponseEvent): Promise<void> {
    return onResponse(event, this.waitForEventsState);
  }
}
