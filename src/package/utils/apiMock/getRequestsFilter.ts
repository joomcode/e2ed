import {assertValueIsDefined, assertValueIsTrue} from '../asserts';

import type {Inner} from 'testcafe-without-typecheck';

import type {ApiMockState, Url} from '../../types/internal';

/**
 * Get requestsFilter function for API mocks by ApiMockState.
 * @internal
 */
export const getRequestsFilter =
  ({
    functionAndRouteParamsByUrl,
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

        // eslint-disable-next-line no-param-reassign
        functionAndRouteParamsByUrl[url] = {apiMockFunction, routeParams};

        return true;
      } catch (error) {
        // eslint-disable-next-line no-param-reassign
        functionAndRouteParamsByUrl[url] = undefined;
      }
    }

    return false;
  };
