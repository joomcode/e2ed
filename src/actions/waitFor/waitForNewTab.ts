import {LogEventType} from '../../constants/internal';
import {getPlaywrightPage} from '../../useContext';
import {getFullPackConfig} from '../../utils/config';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';

import type {AsyncVoid, InternalTab, Tab, UtcTimeInMs} from '../../types/internal';

type Options = Readonly<{
  timeout?: number;
}>;

type WaitForNewTab = ((prepare: () => AsyncVoid, options?: Options) => Promise<Tab>) &
  ((options?: Options) => Promise<Tab>);

/**
 * Waits for opening of new tab and returns this tab.
 */
export const waitForNewTab = (async (
  prepareOrOptions: Options | (() => AsyncVoid),
  options?: Options,
): Promise<Tab> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const context = getPlaywrightPage().context();
  const prepare = typeof prepareOrOptions === 'function' ? prepareOrOptions : undefined;
  const finalOptions = typeof prepareOrOptions === 'function' ? options : prepareOrOptions;

  const timeout = finalOptions?.timeout ?? getFullPackConfig().navigationTimeout;

  const pagePromise = context.waitForEvent('page', {timeout});

  await prepare?.();

  const page = await pagePromise;

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
}) as WaitForNewTab;
