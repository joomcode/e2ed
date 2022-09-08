import {parse} from 'node:querystring';
import {URL} from 'node:url';

import type {Inner} from 'testcafe-without-typecheck';

import type {Method, Request, Url} from '../../types/internal';

/**
 * Get Request object from the original TestCafe request.
 * @internal
 */
export const getRequestFromOriginalRequest = (
  originalRequest: Inner.RequestOptions,
  requestBodyIsInJsonFormat: boolean,
): Request => {
  const url = String(originalRequest.url) as Url;
  const {search} = new URL(url);

  const method = (originalRequest.method ?? 'GET').toUpperCase() as Method;
  const query = parse(search ? search.slice(1) : '');
  const requestBody: unknown = requestBodyIsInJsonFormat
    ? JSON.parse(String(originalRequest.body))
    : originalRequest.body;
  const requestHeaders = originalRequest.headers ?? {};

  return {method, query, requestBody, requestHeaders, url};
};
