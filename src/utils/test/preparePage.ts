import {AsyncLocalStorage} from 'node:async_hooks';

import {TARGET_CLOSED_ERROR_MESSAGE} from '../../constants/internal';
import {setClearPage} from '../../context/clearPage';
import {getConsoleMessagesFromContext} from '../../context/consoleMessages';
import {setIsPageNavigatingNow} from '../../context/isPageNavigatingNow';
import {getJsErrorsFromContext} from '../../context/jsError';
import {getNavigationDelay} from '../../context/navigationDelay';
import {getOnResponseCallbacks} from '../../context/onResponseCallbacks';
import {getWaitForEventsState} from '../../context/waitForEventsState';

import {
  getRequestFromPlaywrightRequest,
  getRequestHookContextId,
  getResponseFromPlaywrightResponse,
} from '../requestHooks';
import {addNotCompleteRequest, completeRequest} from '../waitForEvents';

import type {
  ConsoleMessage as PlaywrightConsoleMessage,
  Page,
  Request as PlaywrightRequest,
  Response as PlaywrightResponse,
} from '@playwright/test';

import type {ConsoleMessage, ConsoleMessageType, JsError} from '../../types/internal';

const afterNavigationRequestsDelayInMs = 300;

/**
 * Prepares page before test.
 * @internal
 */
export const preparePage = async (page: Page): Promise<void> => {
  const consoleMessages = getConsoleMessagesFromContext() as ConsoleMessage[];
  const jsErrors = getJsErrorsFromContext() as JsError[];
  const navigationDelay = getNavigationDelay();
  const waitForEventsState = getWaitForEventsState();

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

  const consoleListener = AsyncLocalStorage.bind(async (message: PlaywrightConsoleMessage) => {
    const args: unknown[] = [];
    const dateTimeInIso = new Date().toISOString();
    const location = message.location();
    const text = message.text();
    const type = message.type() as ConsoleMessageType;

    consoleMessages.push({args, dateTimeInIso, location, text, type});

    for (const jsHandle of message.args()) {
      args.push(await jsHandle.jsonValue().catch(() => 'Error with getting value of argument'));
    }
  });

  const pageerrorListener = AsyncLocalStorage.bind((error: Error) => {
    const dateTimeInIso = new Date().toISOString();

    jsErrors.push({dateTimeInIso, error});
  });

  const requestListener = AsyncLocalStorage.bind(async (newRequest: PlaywrightRequest) => {
    const isNavigationRequest = newRequest.isNavigationRequest();

    if (isNavigationRequest) {
      navigationRequestsCount += 1;

      setIsPageNavigatingNow(navigationRequestsCount > 0);
    }

    const request = getRequestFromPlaywrightRequest(newRequest);
    const requestHookContextId = getRequestHookContextId(newRequest);

    await addNotCompleteRequest(request, requestHookContextId, waitForEventsState);
  });

  const responseListener = AsyncLocalStorage.bind((newResponse: PlaywrightResponse) => {
    const isNavigationRequest = newResponse.request().isNavigationRequest();

    if (isNavigationRequest) {
      setTimeout(() => {
        navigationRequestsCount -= 1;

        setIsPageNavigatingNow(navigationRequestsCount > 0);
      }, afterNavigationRequestsDelayInMs);
    }
  });

  const requestfinishedListener = AsyncLocalStorage.bind(async (request: PlaywrightRequest) => {
    const requestHookContextId = getRequestHookContextId(request);

    completeRequest(requestHookContextId, waitForEventsState);

    const onResponseCallbacks = getOnResponseCallbacks();

    if (onResponseCallbacks.length === 0) {
      return;
    }

    const playwrightResponse = await request.response().catch((error) => {
      if (String(error).includes(TARGET_CLOSED_ERROR_MESSAGE)) {
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
  });

  page.on('console', consoleListener);
  page.on('pageerror', pageerrorListener);
  page.on('request', requestListener);
  page.on('response', responseListener);
  page.on('requestfinished', requestfinishedListener);

  const clearPage = async (): Promise<void> => {
    page.removeListener('console', consoleListener);
    page.removeListener('pageerror', pageerrorListener);
    page.removeListener('request', requestListener);
    page.removeListener('response', responseListener);
    page.removeListener('requestfinished', requestfinishedListener);

    await page.unrouteAll({behavior: 'ignoreErrors'}).catch(() => {});
  };

  setClearPage(clearPage);
};
