import {LogEventType, OK_STATUS_CODE} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {cloneWithoutUndefinedProperties} from '../clone';
import {log} from '../log';
import {getBodyAsString, getContentJsonHeaders} from '../request';
import {getMainRequestOptions, getRequestFromRequestOptions} from '../requestHooks';

import type {Inner} from 'testcafe-without-typecheck';

import type {ApiMockState, RequestOptions, Url} from '../../types/internal';

/**
 * Get `setResponse` function for API mocks by `ApiMockState`.
 * @internal
 */
export const getSetResponse =
  ({
    optionsWithRouteByUrl,
  }: ApiMockState): ((
    requestOptions: RequestOptions,
    responseOptions: Inner.ResponseMock,
  ) => Promise<void>) =>
  async (requestOptions, responseOptions) => {
    const url = requestOptions.url as Url;
    const optionsWithRoute = optionsWithRouteByUrl[url];

    const mainRequestOptions = getMainRequestOptions(requestOptions);

    assertValueIsDefined(optionsWithRoute, 'optionsWithRoute is defined', {mainRequestOptions});

    const {apiMockFunction, skipLogs, route} = optionsWithRoute;
    const isRequestBodyInJsonFormat = route.getIsRequestBodyInJsonFormat();
    const isResponseBodyInJsonFormat = route.getIsResponseBodyInJsonFormat();

    const request = getRequestFromRequestOptions(requestOptions, isRequestBodyInJsonFormat);

    const response = await apiMockFunction(route.routeParams, request);

    const {responseBody, responseHeaders, statusCode = OK_STATUS_CODE} = response;

    const responseBodyAsString = getBodyAsString(responseBody, isResponseBodyInJsonFormat);

    // eslint-disable-next-line no-param-reassign
    responseOptions.statusCode = statusCode;

    // eslint-disable-next-line no-param-reassign
    responseOptions.headers = cloneWithoutUndefinedProperties({
      ...getContentJsonHeaders(responseBodyAsString),
      ...responseHeaders,
    }) as unknown as Readonly<Record<string, string>>;

    if (responseBodyAsString !== '') {
      responseOptions.setBody(responseBodyAsString);
    }

    if (skipLogs !== true) {
      log(
        `A mock was applied to the API route "${route.constructor.name}"`,
        {apiMockFunction, request, response, route},
        LogEventType.InternalUtil,
      );
    }
  };
