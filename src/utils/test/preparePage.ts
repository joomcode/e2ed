import {AsyncLocalStorage} from 'node:async_hooks';

import {getIsPageNavigatingNow, setIsPageNavigatingNow} from '../../context/isPageNavigatingNow';
import {getNavigationDelay} from '../../context/navigationDelay';
import {getOnResponseCallbacks} from '../../context/onResponseCallbacks';

import {getResponseFromPlaywrightResponse} from '../requestHooks';

import type {Page} from '@playwright/test';

const afterNavigationRequestsDelayInMs = 300;

/**
 * Prepares page before test.
 * @internal
 */
export const preparePage = async (page: Page): Promise<void> => {
  const navigationDelay = getNavigationDelay();

  await page.route(
    () => navigationDelay.promise !== undefined,
    async (route, request) => {
      const {promise} = navigationDelay;

      if (request.isNavigationRequest() && promise !== undefined) {
        await promise;
      }

      await route.fallback();
    },
  );

  let navigationRequestsCount = 0;
  const skippedRequestUrls = Object.create(null) as Record<string, true>;

  page.on(
    'request',
    AsyncLocalStorage.bind((newRequest) => {
      const isNavigationRequest = newRequest.isNavigationRequest();
      const isPageNavigatingNow = getIsPageNavigatingNow();

      if (isPageNavigatingNow) {
        skippedRequestUrls[newRequest.url()] = true;
      }

      if (isNavigationRequest) {
        navigationRequestsCount += 1;

        setIsPageNavigatingNow(navigationRequestsCount > 0);
      }
    }),
  );

  page.on(
    'response',
    AsyncLocalStorage.bind((newResponse) => {
      const isNavigationRequest = newResponse.request().isNavigationRequest();

      if (isNavigationRequest) {
        setTimeout(() => {
          navigationRequestsCount -= 1;

          setIsPageNavigatingNow(navigationRequestsCount > 0);
        }, afterNavigationRequestsDelayInMs);
      }
    }),
  );

  page.on(
    'requestfinished',
    AsyncLocalStorage.bind(async (request) => {
      const onResponseCallbacks = getOnResponseCallbacks();

      if (onResponseCallbacks.length === 0) {
        return;
      }

      const playwrightResponse = await request.response().catch((error) => {
        if (String(error).includes('Target page, context or browser has been closed')) {
          return null;
        }

        throw error;
      });

      if (playwrightResponse === null) {
        return;
      }

      const responseWithRequest = await getResponseFromPlaywrightResponse(playwrightResponse);

      for (const callback of onResponseCallbacks) {
        callback(responseWithRequest);
      }
    }),
  );
};
