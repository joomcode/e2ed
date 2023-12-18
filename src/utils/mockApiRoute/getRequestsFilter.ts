import {assertValueIsDefined} from '../asserts';
import {getRouteInstanceFromUrl} from '../getRouteInstanceFromUrl';

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
      const maybeMethod = requestOptions.method?.toUpperCase() ?? '';
      const maypeRouteWithRouteParams = getRouteInstanceFromUrl(url, maybeMethod, Route);

      if (maypeRouteWithRouteParams === undefined) {
        // eslint-disable-next-line no-param-reassign
        functionAndRouteByUrl[url] = undefined;

        continue;
      }

      const {route} = maypeRouteWithRouteParams;

      // eslint-disable-next-line no-param-reassign
      functionAndRouteByUrl[url] = {apiMockFunction, route};

      return true;
    }

    return false;
  };
