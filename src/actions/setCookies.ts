import {LogEventType} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';

import type {Cookie} from '../types/internal';

/**
 * Set cookies with the specified cookies parameters.
 */
export const setCookies = (cookies: readonly Cookie[]): Promise<void> =>
  step(
    'Set cookies with the specified cookies parameters',
    async () => {
      const page = getPlaywrightPage();

      const browserContext = page.context();

      await browserContext.addCookies(cookies);
    },
    {payload: {cookies}, type: LogEventType.InternalAction},
  );
