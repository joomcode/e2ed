/* eslint-disable no-underscore-dangle */

import {RequestHook} from 'testcafe-without-typecheck';

import {LogEventType} from '../constants/internal';

import {applyHeadersMapper} from './applyHeadersMapper';
import {log} from './log';
import {wrapInTestRunTracker} from './wrapInTestRunTracker';

import type {DeepReadonly, Headers, MapOptions, Url} from '../types/internal';

type RequestEvent = DeepReadonly<{
  requestOptions: {
    headers: Headers;
  };
}>;

type ResponseEvent = DeepReadonly<{
  setHeader(name: string, value: string): Promise<void>;
  removeHeader(name: string): Promise<void>;
  _requestContext: {
    destRes: {headers: Headers};
  };
}>;

/**
 * RequestHook that set mapped headers for request and response
 * for concrete url.
 */
class SetHeadersRequestHook extends RequestHook {
  constructor(public url: Url, public options: MapOptions) {
    super([url], {includeHeaders: true});
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.resetMethods(this.onRequest, this._onConfigureResponse);
  }

  override async onRequest(event: RequestEvent): Promise<void> {
    const {headers} = event.requestOptions;

    applyHeadersMapper(headers, this.options.mapRequestHeaders);

    await log(`Map request headers for ${this.url}`, {headers}, LogEventType.InternalUtil);
  }

  // eslint-disable-next-line class-methods-use-this
  override async onResponse(): Promise<void> {
    // do nothing
  }

  override async _onConfigureResponse(event: ResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    const {headers} = event._requestContext.destRes;

    applyHeadersMapper(headers, this.options.mapResponseHeaders);

    await log(`Map response headers for ${this.url}`, {headers}, LogEventType.InternalUtil);
  }

  resetMethods(
    onRequest: SetHeadersRequestHook['onRequest'],
    _onConfigureResponse: SetHeadersRequestHook['_onConfigureResponse'],
  ): void {
    this.onRequest = onRequest;
    this._onConfigureResponse = _onConfigureResponse;
  }
}

SetHeadersRequestHook.prototype.resetMethods = wrapInTestRunTracker(
  // eslint-disable-next-line @typescript-eslint/unbound-method
  SetHeadersRequestHook.prototype.resetMethods,
);

export {SetHeadersRequestHook};
