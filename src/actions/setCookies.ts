import {LogEventType} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';

import type {Cookie} from '../types/internal';

const msInSecond = 1_000;

/**
 * Set cookies with the specified cookies parameters.
 */
export const setCookies = (cookies: readonly Cookie[]): Promise<void> =>
  step(
    'Set cookies with the specified cookies parameters',
    async () => {
      const page = getPlaywrightPage();

      const browserContext = page.context();

      // Playwright's `addCookies` expects `expires` in unix time in seconds,
      // while `Cookie` type uses milliseconds (as in `Date.now()`).
      const playwrightCookies = cookies.map(({expires, ...cookie}) => ({
        ...cookie,
        ...(expires !== undefined ? {expires: Math.round(expires / msInSecond)} : undefined),
      }));

      await browserContext.addCookies(playwrightCookies);
    },
    {payload: {cookies}, type: LogEventType.InternalAction},
  );
