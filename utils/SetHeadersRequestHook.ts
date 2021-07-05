/* eslint-disable no-underscore-dangle */

import type {Headers, MapOptions} from 'e2e/types';
import {applyHeadersMapper} from 'e2e/utils';
import {RequestHook} from 'testcafe';

import {log} from './log';
import {wrapInTestRunTracker} from './wrapInTestRunTracker';

type RequestEvent = Readonly<{
  requestOptions: {
    headers: Headers;
  };
}>;

type ResponseEvent = Readonly<{
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
export class SetHeadersRequestHook extends RequestHook {
  constructor(public url: string, public options: MapOptions) {
    super([url], {includeHeaders: true});
    this.resetMethods(this.onRequest, this._onConfigureResponse);
  }

  async onRequest(event: RequestEvent): Promise<void> {
    const {headers} = event.requestOptions;

    applyHeadersMapper(headers, this.options.mapRequestHeaders);

    log(`Map request headers for ${this.url}`, {headers});
  }

  async onResponse(): Promise<void> {
    // do nothing
  }

  async _onConfigureResponse(event: ResponseEvent): Promise<void> {
    await super._onConfigureResponse(event);

    const {headers} = event._requestContext.destRes;

    applyHeadersMapper(headers, this.options.mapResponseHeaders);

    log(`Map response headers for ${this.url}`, {headers});
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
  SetHeadersRequestHook.prototype.resetMethods,
);
