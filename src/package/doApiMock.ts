import {RequestMock} from 'testcafe-without-typecheck';

import {assertValueIsDefined, assertValueIsTrue} from './utils/asserts';
import {testController} from './testController';

import type {Inner} from 'testcafe-without-typecheck';

import type {ApiRoute} from './ApiRoute';
import type {AnyApiMockFunction, ApiMockFunction, GetParamsType, Url} from './types/internal';

/**
 * Route class with static method getParamsFromUrl.
 */
type RouteWithGetParamsFromUrl = typeof ApiRoute &
  Readonly<{
    getParamsFromUrl: Exclude<typeof ApiRoute['getParamsFromUrl'], undefined>;
  }>;

type RouteParamsAndApiMockFunction = Readonly<{
  apiMockFunction: AnyApiMockFunction;
  routeParams: unknown;
}>;

let apiMockFunctionByRoute: Map<RouteWithGetParamsFromUrl, AnyApiMockFunction> | undefined;
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

        assertValueIsTrue(routeMethod === request.method, 'route method equals to request method', {
          request,
          route,
          routeMethod,
        });
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

  const requestBody = JSON.stringify(request.body);
  const requestHeaders = request.headers;

  const {
    responseBody,
    responseHeaders,
    statusCode = 200,
  } = await apiMockFunction({
    requestBody,
    requestHeaders,
    routeParams,
  });

  response.statusCode = statusCode;

  if (responseHeaders) {
    response.headers = responseHeaders as Record<string, string>;
  }

  if (responseBody) {
    response.setBody(JSON.stringify(responseBody));
  }
};

/**
 * Add mock for some API route.
 */
export const doApiMock = async <RequestBody, ResponseBody>(
  Route: RouteWithGetParamsFromUrl,
  apiMockFunction: ApiMockFunction<RequestBody, ResponseBody, GetParamsType<typeof Route>>,
): Promise<void> => {
  if (apiMockFunctionByRoute === undefined) {
    apiMockFunctionByRoute = new Map();

    const apiMock = RequestMock().onRequestTo(requestsFilter).respond(setResponse);

    await testController.addRequestHooks(apiMock);
  }

  apiMockFunctionByRoute.set(Route, apiMockFunction as AnyApiMockFunction);
};
