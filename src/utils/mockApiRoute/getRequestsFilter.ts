import {assertValueIsDefined, assertValueIsTrue} from '../asserts';

import type {ApiMockState, RequestOptions, Url} from '../../types/internal';

/**
 * Get requestsFilter function for API mocks by ApiMockState.
 * @internal
 */
export const getRequestsFilter =
  ({
    functionAndRouteByUrl,
    functionByRoute,
  }: ApiMockState): ((requestOptions: RequestOptions) => boolean) =>
  (requestOptions) => {
    assertValueIsDefined(functionByRoute, 'functionByRoute is defined', {requestOptions});

    const url = requestOptions.url as Url;

    for (const [Route, apiMockFunction] of functionByRoute) {
      try {
        const routeParams = Route.getParamsFromUrl(url);
        const route = new Route(routeParams);

        assertValueIsTrue(route.isMatchUrl(url), 'route matches on url', {requestOptions, route});

        const routeMethod = route.getMethod();

        assertValueIsTrue(
          routeMethod.toLowerCase() === requestOptions.method?.toLowerCase(),
          'route method equals to request method',
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
