import {AsyncLocalStorage} from 'node:async_hooks';

import {ADDITIONAL_STEP_TIMEOUT, LogEventType} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';
import {assertValueIsDefined} from '../utils/asserts';
import {getFullPackConfig} from '../utils/config';
import {generalLog} from '../utils/generalLog';
import {applyHeadersMapper} from '../utils/headers';

import {navigateToUrl} from './navigateToUrl';

import type {
  MapOptions,
  NavigateToUrlOptions,
  NavigationReturn,
  StringHeaders,
  Url,
} from '../types/internal';

/**
 * Navigates to the `url` and map custom response and request headers.
 */
export const setHeadersAndNavigateToUrl = async (
  url: Url,
  {mapRequestHeaders, mapResponseHeaders, skipLogs = false}: MapOptions,
  navigateToUrlOptions?: NavigateToUrlOptions,
): Promise<NavigationReturn> => {
  let navigationReturn: NavigationReturn | undefined;
  const timeout = navigateToUrlOptions?.timeout ?? getFullPackConfig().navigationTimeout;

  await step(
    `Navigate to ${url} and map headers`,
    async () => {
      let requestHeaders: StringHeaders | undefined;
      let responseHeaders: StringHeaders | undefined;

      const page = getPlaywrightPage();

      await page.route(
        url,
        AsyncLocalStorage.bind(async (route) => {
          if (mapResponseHeaders === undefined) {
            return route.fallback();
          }

          try {
            const response = await route.fetch({timeout});
            const headers = response.headers();

            applyHeadersMapper(headers, mapResponseHeaders);

            responseHeaders = headers;

            return route.fulfill({headers, response});
          } catch (error) {
            generalLog(`Caught an error when fetching route by url "${url}"`, {
              error: String(error),
            });

            return route.fallback();
          }
        }),
        {times: 1},
      );

      if (mapRequestHeaders !== undefined) {
        await page.route(
          url,
          AsyncLocalStorage.bind(async (route, request) => {
            const headers = request.headers();

            applyHeadersMapper(headers, mapRequestHeaders);

            requestHeaders = headers;

            await route.fallback({headers});
          }),
          {times: 1},
        );
      }

      navigationReturn = await navigateToUrl(url, {skipLogs: true, ...navigateToUrlOptions});

      return {requestHeaders, responseHeaders};
    },
    {
      skipLogs,
      timeout: timeout + ADDITIONAL_STEP_TIMEOUT,
      type: LogEventType.InternalAction,
    },
  );

  assertValueIsDefined(navigationReturn, 'navigationReturn is defined', {
    navigateToUrlOptions,
    url,
  });

  return navigationReturn;
};
