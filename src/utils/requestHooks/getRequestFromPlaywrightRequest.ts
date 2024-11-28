import {parse} from 'node:querystring';
import {URL} from 'node:url';

import {LogEventStatus, LogEventType} from '../../constants/internal';

import {log} from '../log';
import {parseValueAsJsonIfNeeded} from '../parse';

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
  const body = playwrightRequest.postData();

  const {value: requestBody, hasParseError} = parseValueAsJsonIfNeeded(
    body,
    isRequestBodyInJsonFormat,
  );

  if (hasParseError) {
    log(
      'Request body is not in JSON format',
      {body, logEventStatus: LogEventStatus.Failed, url},
      LogEventType.InternalUtil,
    );
  }

  const requestHeaders = playwrightRequest.headers();
  const utcTimeInMs = Date.now() as UtcTimeInMs;

  return {method, query, requestBody, requestHeaders, url, utcTimeInMs};
};
