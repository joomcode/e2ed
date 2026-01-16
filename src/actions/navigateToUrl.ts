import {ADDITIONAL_STEP_TIMEOUT, LogEventType} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';

import type {NavigateToUrlOptions, NavigationReturn, StatusCode, Url} from '../types/internal';

/**
 * Navigates to the `url` (without waiting of interface stabilization).
 */
export const navigateToUrl = async (
  url: Url,
  options: NavigateToUrlOptions = {},
): Promise<NavigationReturn> => {
  const {skipLogs = false, timeout} = options;
  let statusCode: StatusCode | undefined;

  await step(
    `Navigate to ${url}`,
    async () => {
      const page = getPlaywrightPage();

      const maybeResponse = await page.goto(url, options);

      if (maybeResponse !== null) {
        statusCode = maybeResponse.status() as StatusCode;
      }

      return {statusCode};
    },
    {
      payload: options,
      skipLogs,
      ...(timeout !== undefined ? {timeout: timeout + ADDITIONAL_STEP_TIMEOUT} : undefined),
      type: LogEventType.InternalAction,
    },
  );

  return {statusCode};
};
