import {parse} from 'node:querystring';
import {URL} from 'node:url';

import {RequestMock} from 'testcafe-without-typecheck';

import {assertValueIsDefined, assertValueIsTrue} from './utils/asserts';
import {cloneWithoutUndefinedProperties} from './utils/cloneWithoutUndefinedProperties';
import {getContentJsonHeaders} from './utils/request';
import {testController} from './testController';

import type {Inner} from 'testcafe-without-typecheck';

import type {ApiRoute} from './ApiRoute';
import type {ApiMockFunction, ApiRouteWithGetParamsFromUrl, Method, Url} from './types/internal';

type RouteParamsAndApiMockFunction = Readonly<{
  apiMockFunction: ApiMockFunction<unknown>;
  routeParams: unknown;
}>;

let apiMockFunctionByRoute: // eslint-disable-next-line @typescript-eslint/no-explicit-any
Map<ApiRouteWithGetParamsFromUrl<any>, ApiMockFunction<unknown>> | undefined;
const apiMockFunctionAndRouteParamsByUrl: Record<Url, RouteParamsAndApiMockFunction | undefined> =
  {};

const requestsFilter = (request: Inner.RequestOptions): boolean => {
  assertValueIsDefined(apiMockFunctionByRoute, 'mockFunctionsByRoutes is defined', {request});

  const url = request.url as Url;

  for (const [Route, apiMockFunction] of apiMockFunctionByRoute) {
    try {
      const routeParams = Route.getParamsFromUrl(url);

      const route = new (Route as unknown as new (params: unknown) => ApiRoute)(routeParams);

      assertValueIsTrue(route.isMatchUrl(url), 'route matches on url', {request, route});

      if (route.getMethod) {
        const routeMethod = route.getMethod();

        assertValueIsTrue(
          routeMethod.toLowerCase() === request.method.toLocaleLowerCase(),
          'route method equals to request method',
          {
            request,
            route,
            routeMethod,
          },
        );
      }

      apiMockFunctionAndRouteParamsByUrl[url] = {apiMockFunction, routeParams};

      return true;
    } catch (error) {
      apiMockFunctionAndRouteParamsByUrl[url] = undefined;
    }
  }

  return false;
};

const setResponse = async (
  request: Inner.RequestOptions,
  response: Inner.ResponseMock,
): Promise<void> => {
  const url = request.url as Url;
  const apiMockFunctionAndRouteParams = apiMockFunctionAndRouteParamsByUrl[url];

  assertValueIsDefined(apiMockFunctionAndRouteParams, 'apiMockFunctionAndRouteParams is defined', {
    request,
  });

  const {apiMockFunction, routeParams} = apiMockFunctionAndRouteParams;

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

/**
 * Add mock for some API route.
 */
export const doApiMock = async <RouteParams>(
  Route: ApiRouteWithGetParamsFromUrl<RouteParams>,
  apiMockFunction: ApiMockFunction<RouteParams>,
): Promise<void> => {
  if (apiMockFunctionByRoute === undefined) {
    apiMockFunctionByRoute = new Map();

    const apiMock = RequestMock().onRequestTo(requestsFilter).respond(setResponse);

    await testController.addRequestHooks(apiMock);
  }

  apiMockFunctionByRoute.set(Route, apiMockFunction as ApiMockFunction<unknown>);
};
