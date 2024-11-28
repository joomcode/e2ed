import {LogEventType} from '../../constants/internal';
import {getPlaywrightPage} from '../../useContext';
import {getFullPackConfig} from '../../utils/config';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';

import type {InternalTab, Tab, UtcTimeInMs} from '../../types/internal';

type Options = Readonly<{
  timeout?: number;
}>;

/**
 * Waits for opening of new tab and returns this tab.
 */
export const waitForNewTab = async (options?: Options): Promise<Tab> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const context = getPlaywrightPage().context();
  const timeout = options?.timeout ?? getFullPackConfig().navigationTimeout;

  const page = await context.waitForEvent('page', {timeout});

  const newTab: InternalTab = {page};

  const waitInMs = Date.now() - startTimeInMs;

  const waitWithUnits = getDurationWithUnits(waitInMs);

  const url = page.url();

  log(
    `Have waited for new tab for ${waitWithUnits} at ${url}`,
    {timeout},
    LogEventType.InternalCore,
  );

  return newTab as Tab;
};
