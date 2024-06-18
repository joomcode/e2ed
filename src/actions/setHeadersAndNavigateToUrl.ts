import {getPage} from '../useContext';
import {applyHeadersMapper} from '../utils/requestHooks';

import {navigateToUrl} from './navigateToUrl';

import type {MapOptions, Url} from '../types/internal';

/**
 * Navigate to the url and map custom response and request headers.
 */
export const setHeadersAndNavigateToUrl = async (url: Url, options: MapOptions): Promise<void> => {
  const {mapRequestHeaders, mapResponseHeaders} = options;

  const page = getPage();

  await page.route(
    url,
    async (route) => {
      if (mapResponseHeaders === undefined) {
        return route.fallback();
      }

      const response = await route.fetch();
      const headers = response.headers();

      applyHeadersMapper(headers, mapResponseHeaders);

      return route.fulfill({headers, response});
    },
    {times: 1},
  );

  if (mapRequestHeaders !== undefined) {
    await page.route(
      url,
      async (route, request) => {
        const headers = request.headers();

        applyHeadersMapper(headers, mapRequestHeaders);

        await route.fallback({headers});
      },
      {times: 1},
    );
  }

  await navigateToUrl(url, {skipLogs: true});
};
