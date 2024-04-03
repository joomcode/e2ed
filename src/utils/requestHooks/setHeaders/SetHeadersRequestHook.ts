import {INCLUDE_HEADERS_IN_RESPONSE_EVENT} from '../../../constants/internal';
import {getWaitForEventsState} from '../../../context/waitForEventsState';
import {testController} from '../../../testController';

import {RequestHookWithEvents} from '../RequestHookWithEvents';
import {RequestHookToWaitForEvents} from '../waitForEvents';

import {onConfigureResponse} from './onConfigureResponse';
import {onRequest} from './onRequest';

import type {
  MapOptions,
  RequestHookConfigureResponseEvent,
  RequestHookRequestEvent,
  Url,
} from '../../../types/internal';

/**
 * Request hook that set mapped headers for request and response
 * for concrete url.
 * @internal
 */
export class SetHeadersRequestHook extends RequestHookWithEvents {
  /**
   * Options of hook.
   */
  private readonly options: MapOptions;

  /**
   * The url for which the hook is applied.
   */
  private readonly url: Url;

  constructor(url: Url, options: MapOptions) {
    const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);
    let wasCalled = false;

    const predicate = (request: Readonly<{url?: string}>): boolean => {
      if (request.url === url) {
        wasCalled = true;

        return true;
      }

      if (wasCalled && url in waitForEventsState.redirects) {
        return waitForEventsState.redirects[url] === request.url;
      }

      return false;
    };

    super(predicate, INCLUDE_HEADERS_IN_RESPONSE_EVENT);

    this.options = options;
    this.url = url;
  }

  /**
   * Maps response headers.
   */
  override async _onConfigureResponse(event: RequestHookConfigureResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    onConfigureResponse(event, this.options, this.url);
  }

  /**
   * Maps request headers.
   */
  override onRequest(event: RequestHookRequestEvent): Promise<void> {
    return onRequest(event, this.options, this.url);
  }

  /**
   * Removes request hook when request is completed.
   */
  override async onResponse(): Promise<void> {
    await testController.removeRequestHooks(this);
  }
}
