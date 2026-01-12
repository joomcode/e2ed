import {LogEventType} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';

import type {BrowserContext} from '@playwright/test';

type Options = Parameters<BrowserContext['clearCookies']>[0];

/**
 * Clears cookies with the specified cookies parameters.
 * If there are no cookies parameters, clears all the cookies.
 */
export const clearCookies = (cookiesParameters: Options = {}): Promise<void> =>
  step(
    'Clears cookies with the specified parameters',
    async () => {
      const page = getPlaywrightPage();
      const context = page.context();

      await context.clearCookies(cookiesParameters);
    },
    {payload: cookiesParameters, type: LogEventType.InternalAction},
  );
