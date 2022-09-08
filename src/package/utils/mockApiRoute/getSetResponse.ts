import {LogEventType} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {cloneWithoutUndefinedProperties} from '../clone';
import {log} from '../log';
import {getBodyAsString, getContentJsonHeaders} from '../request';
import {getRequestFromOriginalRequest} from '../requestHooks';

import type {Inner} from 'testcafe-without-typecheck';

import type {ApiMockState, Url} from '../../types/internal';

/**
 * Get setResponse function for API mocks by ApiMockState.
 * @internal
 */
export const getSetResponse =
  ({
    functionAndRouteByUrl,
  }: ApiMockState): ((
    originalRequest: Inner.RequestOptions,
    originalResponse: Inner.ResponseMock,
  ) => Promise<void>) =>
  async (originalRequest, originalResponse) => {
    const url = originalRequest.url as Url;
    const functionAndRoute = functionAndRouteByUrl[url];

    assertValueIsDefined(functionAndRoute, 'functionAndRoute is defined', {originalRequest});

    const {apiMockFunction, route} = functionAndRoute;
    const requestBodyIsInJsonFormat = route.requestBodyIsInJsonFormat();
    const responseBodyIsInJsonFormat = route.responseBodyIsInJsonFormat();

    const request = getRequestFromOriginalRequest(originalRequest, requestBodyIsInJsonFormat);

    const response = await apiMockFunction(route.params, request);

    const {responseBody, responseHeaders, statusCode = 200} = response;

    const responseBodyAsString = getBodyAsString(responseBody, responseBodyIsInJsonFormat);

    // eslint-disable-next-line no-param-reassign
    originalResponse.statusCode = statusCode;

    // eslint-disable-next-line no-param-reassign
    originalResponse.headers = cloneWithoutUndefinedProperties({
      ...getContentJsonHeaders(responseBodyAsString),
      ...responseHeaders,
    }) as unknown as Record<string, string>;

    if (responseBodyAsString !== '') {
      originalResponse.setBody(responseBodyAsString);
    }

    await log(
      `A mock was applied to the API route "${route.constructor.name}"`,
      {apiMockFunction, originalRequest, originalResponse, request, response, route},
      LogEventType.InternalCore,
    );
  };
