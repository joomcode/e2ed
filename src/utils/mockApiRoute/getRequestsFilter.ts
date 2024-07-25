import {AsyncLocalStorage} from 'node:async_hooks';

import {assertValueIsDefined} from '../asserts';
import {getRouteInstanceFromUrl} from '../getRouteInstanceFromUrl';

import type {URL} from 'node:url';

import type {ApiMockState, Url} from '../../types/internal';

/**
 * Get `requestsFilter` function for API mocks by `ApiMockState`.
 * @internal
 */
export const getRequestsFilter = ({
  optionsByRoute,
  optionsWithRouteByUrl,
}: ApiMockState): ((urlObject: URL) => boolean) =>
  AsyncLocalStorage.bind((urlObject) => {
    assertValueIsDefined(optionsByRoute, 'optionsByRoute is defined', {urlObject});

    const url = urlObject.href as Url;

    for (const [Route, {apiMockFunction, skipLogs}] of optionsByRoute) {
      const maypeRouteWithRouteParams = getRouteInstanceFromUrl(url, Route);

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
  });
