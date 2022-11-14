import {LogEventType} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {cloneWithoutUndefinedProperties} from '../clone';
import {log} from '../log';
import {getBodyAsString, getContentJsonHeaders} from '../request';
import {getMainRequestOptions, getRequestFromRequestOptions} from '../requestHooks';

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
    requestOptions: Inner.RequestOptions,
    responseOptions: Inner.ResponseMock,
  ) => Promise<void>) =>
  async (requestOptions, responseOptions) => {
    const url = requestOptions.url as Url;
    const functionAndRoute = functionAndRouteByUrl[url];

    const mainRequestOptions = getMainRequestOptions(requestOptions);

    assertValueIsDefined(functionAndRoute, 'functionAndRoute is defined', {mainRequestOptions});

    const {apiMockFunction, route} = functionAndRoute;
    const requestBodyIsInJsonFormat = route.getRequestBodyIsInJsonFormat();
    const responseBodyIsInJsonFormat = route.getResponseBodyIsInJsonFormat();

    const request = getRequestFromRequestOptions(requestOptions, requestBodyIsInJsonFormat);

    const response = await apiMockFunction(route.params, request);

    const {responseBody, responseHeaders, statusCode = 200} = response;

    const responseBodyAsString = getBodyAsString(responseBody, responseBodyIsInJsonFormat);

    // eslint-disable-next-line no-param-reassign
    responseOptions.statusCode = statusCode;

    // eslint-disable-next-line no-param-reassign
    responseOptions.headers = cloneWithoutUndefinedProperties({
      ...getContentJsonHeaders(responseBodyAsString),
      ...responseHeaders,
    }) as unknown as Record<string, string>;

    if (responseBodyAsString !== '') {
      responseOptions.setBody(responseBodyAsString);
    }

    await log(
      `A mock was applied to the API route "${route.constructor.name}"`,
      {
        apiMockFunctionCode: apiMockFunction.toString(),
        mainRequestOptions,
        request,
        response,
        responseOptions,
        route,
      },
      LogEventType.InternalCore,
    );
  };
