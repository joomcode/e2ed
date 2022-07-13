import {parse} from 'node:querystring';
import {URL} from 'node:url';

import {assertValueIsDefined} from '../asserts';
import {cloneWithoutUndefinedProperties} from '../cloneWithoutUndefinedProperties';
import {getContentJsonHeaders} from '../request';

import type {Inner} from 'testcafe-without-typecheck';

import type {ApiMockState, Method, Url} from '../../types/internal';

/**
 * Get setResponse function for API mocks by ApiMockState.
 * @internal
 */
export const getSetResponse =
  ({
    functionAndRouteParamsByUrl,
  }: ApiMockState): ((
    request: Inner.RequestOptions,
    response: Inner.ResponseMock,
  ) => Promise<void>) =>
  async (request, response) => {
    const url = request.url as Url;
    const functionAndRouteParams = functionAndRouteParamsByUrl[url];

    assertValueIsDefined(functionAndRouteParams, 'functionAndRouteParams is defined', {
      request,
    });

    const {apiMockFunction, routeParams} = functionAndRouteParams;

    const {search} = new URL(url);

    const method = request.method.toUpperCase() as Method;
    const query = parse(search ? search.slice(1) : '');
    const requestBody: unknown = JSON.parse(String(request.body));
    const requestHeaders = request.headers;

    const {
      responseBody,
      responseHeaders,
      statusCode = 200,
    } = await apiMockFunction(routeParams, {method, query, requestBody, requestHeaders, url});

    const responseBodyAsString =
      responseBody === undefined ? undefined : JSON.stringify(responseBody);

    response.statusCode = statusCode;

    response.headers = cloneWithoutUndefinedProperties({
      ...getContentJsonHeaders(responseBodyAsString),
      ...responseHeaders,
    }) as unknown as Record<string, string>;

    if (responseBodyAsString !== undefined) {
      response.setBody(responseBodyAsString);
    }
  };
