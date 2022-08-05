import {parse} from 'node:querystring';
import {URL} from 'node:url';

import {LogEventType} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {cloneWithoutUndefinedProperties} from '../cloneWithoutUndefinedProperties';
import {log} from '../log';
import {getContentJsonHeaders} from '../request';

import type {Inner} from 'testcafe-without-typecheck';

import type {ApiMockState, Method, Url} from '../../types/internal';

/**
 * Get setResponse function for API mocks by ApiMockState.
 * @internal
 */
export const getSetResponse =
  ({
    functionAndRouteByUrl,
  }: ApiMockState): ((
    originRequest: Inner.RequestOptions,
    originResponse: Inner.ResponseMock,
  ) => Promise<void>) =>
  async (originRequest, originResponse) => {
    const url = originRequest.url as Url;
    const functionAndRoute = functionAndRouteByUrl[url];

    assertValueIsDefined(functionAndRoute, 'functionAndRoute is defined', {originRequest});

    const {apiMockFunction, route} = functionAndRoute;

    const {search} = new URL(url);

    const method = (originRequest.method ?? 'GET').toUpperCase() as Method;
    const query = parse(search ? search.slice(1) : '');
    const requestBody: unknown = JSON.parse(String(originRequest.body));
    const requestHeaders = originRequest.headers ?? {};

    const request = {method, query, requestBody, requestHeaders, url};

    const response = await apiMockFunction(route.params, request);

    const {responseBody, responseHeaders, statusCode = 200} = response;

    const responseBodyAsString =
      responseBody === undefined ? undefined : JSON.stringify(responseBody);

    // eslint-disable-next-line no-param-reassign
    originResponse.statusCode = statusCode;

    // eslint-disable-next-line no-param-reassign
    originResponse.headers = cloneWithoutUndefinedProperties({
      ...getContentJsonHeaders(responseBodyAsString),
      ...responseHeaders,
    }) as unknown as Record<string, string>;

    if (responseBodyAsString !== undefined) {
      originResponse.setBody(responseBodyAsString);
    }

    await log(
      `A mock was applied to the API route "${route.constructor.name}"`,
      {apiMockFunction, originRequest, originResponse, request, response, route},
      LogEventType.InternalCore,
    );
  };
