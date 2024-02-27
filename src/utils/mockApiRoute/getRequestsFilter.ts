import {assertValueIsDefined} from '../asserts';
import {getRouteInstanceFromUrl} from '../getRouteInstanceFromUrl';

import type {ApiMockState, RequestOptions, Url} from '../../types/internal';

/**
 * Get `requestsFilter` function for API mocks by `ApiMockState`.
 * @internal
 */
export const getRequestsFilter =
  ({
    optionsByRoute,
    optionsWithRouteByUrl,
  }: ApiMockState): ((requestOptions: RequestOptions) => boolean) =>
  (requestOptions) => {
    assertValueIsDefined(optionsByRoute, 'optionsByRoute is defined', {requestOptions});

    const url = requestOptions.url as Url;

    for (const [Route, {apiMockFunction, skipLogs}] of optionsByRoute) {
      const maybeMethod = requestOptions.method?.toUpperCase() ?? '';
      const maypeRouteWithRouteParams = getRouteInstanceFromUrl(url, maybeMethod, Route);

      if (maypeRouteWithRouteParams === undefined) {
        // eslint-disable-next-line no-param-reassign
        optionsWithRouteByUrl[url] = undefined;

        continue;
      }

      const {route} = maypeRouteWithRouteParams;

      // eslint-disable-next-line no-param-reassign
      optionsWithRouteByUrl[url] = {apiMockFunction, route, skipLogs};

      return true;
    }

    return false;
  };
