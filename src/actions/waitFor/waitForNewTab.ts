import {LogEventType} from '../../constants/internal';
import {getPlaywrightPage} from '../../useContext';
import {getFullPackConfig} from '../../utils/config';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';
import {log} from '../../utils/log';

import type {InternalTab, Tab, Trigger, UtcTimeInMs} from '../../types/internal';

type Options = Readonly<{skipLogs?: boolean; timeout?: number}>;

type WaitForNewTab = ((trigger: Trigger | undefined, options?: Options) => Promise<Tab>) &
  ((options?: Options) => Promise<Tab>);

/**
 * Waits for opening of new tab and returns this tab.
 */
export const waitForNewTab = (async (
  triggerOrOptions?: Options | Trigger | undefined,
  options?: Options,
): Promise<Tab> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const context = getPlaywrightPage().context();
  const trigger = typeof triggerOrOptions === 'function' ? triggerOrOptions : undefined;
  const finalOptions =
    typeof triggerOrOptions === 'function' ? options : (triggerOrOptions ?? options);

  const timeout = finalOptions?.timeout ?? getFullPackConfig().navigationTimeout;
  const timeoutWithUnits = getDurationWithUnits(timeout);

  if (trigger !== undefined) {
    setCustomInspectOnFunction(trigger);
  }

  const pagePromise = context.waitForEvent('page', {timeout});

  if (finalOptions?.skipLogs !== true) {
    log(
      `Set wait for new tab with timeout ${timeoutWithUnits}`,
      {trigger},
      LogEventType.InternalCore,
    );
  }

  await trigger?.();

  const page = await pagePromise;

  const newTab: InternalTab = {page};

  const waitInMs = Date.now() - startTimeInMs;

  const waitWithUnits = getDurationWithUnits(waitInMs);

  const url = page.url();

  if (finalOptions?.skipLogs !== true) {
    log(
      `Have waited for new tab for ${waitWithUnits} at ${url}`,
      {timeoutWithUnits, trigger},
      LogEventType.InternalCore,
    );
  }

  return newTab as Tab;
}) as WaitForNewTab;
