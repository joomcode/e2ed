import {parse} from 'node:querystring';
import {URL} from 'node:url';

import {parseMaybeEmptyValueAsJson} from '../parseMaybeEmptyValueAsJson';

import type {Inner} from 'testcafe-without-typecheck';

import type {Method, Request, Url} from '../../types/internal';

/**
 * Get Request object from the original TestCafe request options object.
 * If isRequestBodyInJsonFormat = true, then parses body as JSON.
 * If isRequestBodyInJsonFormat = false, then returns body as is.
 * If isRequestBodyInJsonFormat is not defined, then safely tries to parse body as JSON.
 * @internal
 */
export const getRequestFromRequestOptions = (
  requestOptions: Inner.RequestOptions,
  isRequestBodyInJsonFormat?: boolean,
): Request => {
  const url = String(requestOptions.url) as Url;
  const {search} = new URL(url);

  const method = (requestOptions.method ?? 'GET').toUpperCase() as Method;

  const query = parse(search ? search.slice(1) : '');

  let requestBody: unknown | undefined;

  if (isRequestBodyInJsonFormat === true) {
    requestBody = parseMaybeEmptyValueAsJson(requestOptions.body);
  } else if (isRequestBodyInJsonFormat === false) {
    requestBody = requestOptions.body;
  } else {
    try {
      requestBody = parseMaybeEmptyValueAsJson(requestOptions.body);
    } catch {
      requestBody = requestOptions.body;
    }
  }

  const requestHeaders = requestOptions.headers ?? {};

  return {method, query, requestBody, requestHeaders, url};
};
