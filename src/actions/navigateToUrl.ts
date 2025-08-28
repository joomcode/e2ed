import {LogEventType} from '../constants/internal';
import {getPlaywrightPage} from '../useContext';
import {log} from '../utils/log';

import type {NavigateToUrlOptions, NavigationReturn, StatusCode, Url} from '../types/internal';

/**
 * Navigate to the `url` (without waiting of interface stabilization).
 */
export const navigateToUrl = async (
  url: Url,
  options: NavigateToUrlOptions = {},
): Promise<NavigationReturn> => {
  const {skipLogs = false} = options;

  if (skipLogs !== true) {
    log(`Will navigate to the url ${url}`, options, LogEventType.InternalAction);
  }

  const page = getPlaywrightPage();

  const maybeResponse = await page.goto(url, options);
  let statusCode: StatusCode | undefined;

  if (maybeResponse !== null) {
    statusCode = maybeResponse.status() as StatusCode;
  }

  if (skipLogs !== true) {
    log(`Navigation to the url ${url} completed`, options, LogEventType.InternalAction);
  }

  return {statusCode};
};
