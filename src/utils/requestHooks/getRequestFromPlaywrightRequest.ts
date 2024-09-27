import {parse} from 'node:querystring';
import {URL} from 'node:url';

import {LogEventType} from '../../constants/internal';

import {log} from '../log';
import {parseMaybeEmptyValueAsJson} from '../parseMaybeEmptyValueAsJson';

import type {Request as PlaywrightRequest} from '@playwright/test';

import type {Method, RequestWithUtcTimeInMs, Url, UtcTimeInMs} from '../../types/internal';

/**
 * Get request object from the original Playwright request object.
 * If `isRequestBodyInJsonFormat` is `true`, then parses body as JSON.
 * If `isRequestBodyInJsonFormat` is `false`, then returns body as is.
 * If `isRequestBodyInJsonFormat` is `undefined`, then safely tries to parse body as JSON.
 * @internal
 */
export const getRequestFromPlaywrightRequest = (
  playwrightRequest: PlaywrightRequest,
  isRequestBodyInJsonFormat?: boolean,
): RequestWithUtcTimeInMs => {
  const url = playwrightRequest.url() as Url;
  const {search} = new URL(url);

  const method = playwrightRequest.method().toUpperCase() as Method;

  const query = parse(search ? search.slice(1) : '');

  let requestBody: unknown;

  const body = playwrightRequest.postData();

  if (isRequestBodyInJsonFormat === true) {
    try {
      requestBody = parseMaybeEmptyValueAsJson(body);
    } catch {
      log('Request body is not in JSON format', {body, url}, LogEventType.InternalUtil);

      requestBody = body;
    }
  } else if (isRequestBodyInJsonFormat === false) {
    requestBody = body;
  } else {
    try {
      requestBody = parseMaybeEmptyValueAsJson(body);
    } catch {
      requestBody = body;
    }
  }

  const requestHeaders = playwrightRequest.headers();
  const utcTimeInMs = Date.now() as UtcTimeInMs;

  return {method, query, requestBody, requestHeaders, url, utcTimeInMs};
};
