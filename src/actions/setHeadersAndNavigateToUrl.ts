import {AsyncLocalStorage} from 'node:async_hooks';

import {LogEventType} from '../constants/internal';
import {getPlaywrightPage} from '../useContext';
import {applyHeadersMapper} from '../utils/headers';
import {log} from '../utils/log';

import {navigateToUrl} from './navigateToUrl';

import type {MapOptions, NavigateToUrlOptions, Url} from '../types/internal';

/**
 * Navigate to the url and map custom response and request headers.
 */
export const setHeadersAndNavigateToUrl = async (
  url: Url,
  options: MapOptions,
  navigateToUrlOptions?: NavigateToUrlOptions,
): Promise<void> => {
  const {mapRequestHeaders, mapResponseHeaders} = options;

  const page = getPlaywrightPage();

  await page.route(
    url,
    AsyncLocalStorage.bind(async (route) => {
      if (mapResponseHeaders === undefined) {
        return route.fallback();
      }

      const response = await route.fetch();
      const headers = response.headers();

      applyHeadersMapper(headers, mapResponseHeaders);

      log(`Map response headers for ${url}`, {headers}, LogEventType.InternalAction);

      return route.fulfill({headers, response});
    }),
    {times: 1},
  );

  if (mapRequestHeaders !== undefined) {
    await page.route(
      url,
      AsyncLocalStorage.bind(async (route, request) => {
        const headers = request.headers();

        applyHeadersMapper(headers, mapRequestHeaders);

        log(`Map request headers for ${url}`, {headers}, LogEventType.InternalAction);

        await route.fallback({headers});
      }),
      {times: 1},
    );
  }

  await navigateToUrl(url, {skipLogs: true, ...navigateToUrlOptions});
};
