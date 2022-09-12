import {RequestHook} from 'testcafe-without-typecheck';

import {RESOLVED_PROMISE} from '../../constants/internal';

import {wrapInTestRunTracker} from '../wrapInTestRunTracker';

import type {RequestHookRequestEvent, RequestHookResponseEvent} from '../../types/internal';

/**
 * Abstract RequestHook class with request/respons events.
 */
abstract class RequestHookWithEvents extends RequestHook {
  constructor(...args: unknown[]) {
    // @ts-expect-error: RequestHook constructor require any[] as arguments
    super(...args);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.resetMethods(this.onRequest, this.onResponse, this._onConfigureResponse);
  }

  override onRequest(event: RequestHookRequestEvent): Promise<void> {
    void event;

    return RESOLVED_PROMISE;
  }

  override onResponse(): Promise<void> {
    return RESOLVED_PROMISE;
  }

  override async _onConfigureResponse(event: RequestHookResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);
  }

  /**
   * Wrap RequestHook on-methods to TestRunTracker.
   * @internal
   */
  resetMethods(
    onRequest: this['onRequest'],
    onResponse: this['onResponse'],
    _onConfigureResponse: this['_onConfigureResponse'],
  ): void {
    this.onRequest = onRequest;
    this.onResponse = onResponse;
    this._onConfigureResponse = _onConfigureResponse;
  }
}

RequestHookWithEvents.prototype.resetMethods = wrapInTestRunTracker(
  // eslint-disable-next-line @typescript-eslint/unbound-method
  RequestHookWithEvents.prototype.resetMethods,
);

export {RequestHookWithEvents};
