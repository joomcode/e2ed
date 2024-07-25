import {AsyncLocalStorage} from 'node:async_hooks';

import {LogEventType, OK_STATUS_CODE} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {cloneWithoutUndefinedProperties} from '../clone';
import {getBodyAsString, getContentJsonHeaders} from '../http';
import {log} from '../log';
import {getMainRequestOptions, getRequestFromPlaywrightRequest} from '../requestHooks';

import type {Request, Route} from '@playwright/test';

import type {ApiMockState, Url} from '../../types/internal';

/**
 * Get `setResponse` function for API mocks by `ApiMockState`.
 * @internal
 */
export const getSetResponse = ({
  optionsWithRouteByUrl,
}: ApiMockState): ((playwrightRoute: Route, playwrightRequest: Request) => Promise<void>) =>
  AsyncLocalStorage.bind(async (playwrightRoute, playwrightRequest) => {
    const url = playwrightRequest.url() as Url;
    const optionsWithRoute = optionsWithRouteByUrl[url];

    const mainRequestOptions = getMainRequestOptions(playwrightRequest);

    assertValueIsDefined(optionsWithRoute, 'optionsWithRoute is defined', {mainRequestOptions});

    const {apiMockFunction, skipLogs, route} = optionsWithRoute;
    const isRequestBodyInJsonFormat = route.getIsRequestBodyInJsonFormat();
    const isResponseBodyInJsonFormat = route.getIsResponseBodyInJsonFormat();

    const request = getRequestFromPlaywrightRequest(playwrightRequest, isRequestBodyInJsonFormat);

    const response = await apiMockFunction(route.routeParams, request);

    const {responseBody, responseHeaders, statusCode = OK_STATUS_CODE} = response;

    const responseBodyAsString = getBodyAsString(responseBody, isResponseBodyInJsonFormat);

    const headers = cloneWithoutUndefinedProperties({
      ...getContentJsonHeaders(responseBodyAsString),
      ...responseHeaders,
    }) as unknown as Readonly<Record<string, string>>;

    await playwrightRoute.fulfill({
      body: responseBodyAsString,
      headers,
      status: statusCode,
    });

    if (skipLogs !== true) {
      log(
        `A mock was applied to the API route "${route.constructor.name}"`,
        {apiMockFunction, request, response, route},
        LogEventType.InternalUtil,
      );
    }
  });
