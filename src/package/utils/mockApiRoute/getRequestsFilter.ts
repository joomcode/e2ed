import {assertValueIsDefined, assertValueIsTrue} from '../asserts';

import type {Inner} from 'testcafe-without-typecheck';

import type {ApiMockState, Url} from '../../types/internal';

/**
 * Get requestsFilter function for API mocks by ApiMockState.
 * @internal
 */
export const getRequestsFilter =
  ({
    functionAndRouteByUrl,
    functionByRoute,
  }: ApiMockState): ((request: Inner.RequestOptions) => boolean) =>
  (request) => {
    assertValueIsDefined(functionByRoute, 'functionByRoute is defined', {request});

    const url = request.url as Url;

    for (const [Route, apiMockFunction] of functionByRoute) {
      try {
        const routeParams = Route.getParamsFromUrl(url);
        const route = new Route(routeParams);

        assertValueIsTrue(route.isMatchUrl(url), 'route matches on url', {request, route});

        const routeMethod = route.getMethod();

        assertValueIsTrue(
          routeMethod.toLowerCase() === request.method?.toLocaleLowerCase(),
          'route method equals to request method',
          {
            request,
            route,
            routeMethod,
          },
        );

        // eslint-disable-next-line no-param-reassign
        functionAndRouteByUrl[url] = {apiMockFunction, route};

        return true;
      } catch {
        // eslint-disable-next-line no-param-reassign
        functionAndRouteByUrl[url] = undefined;
      }
    }

    return false;
  };
