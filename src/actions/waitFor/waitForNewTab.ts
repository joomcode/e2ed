import {ADDITIONAL_STEP_TIMEOUT, LogEventType} from '../../constants/internal';
import {step} from '../../step';
import {getPlaywrightPage} from '../../useContext';
import {assertValueIsDefined} from '../../utils/asserts';
import {getFullPackConfig} from '../../utils/config';
import {setCustomInspectOnFunction} from '../../utils/fn';
import {getDurationWithUnits} from '../../utils/getDurationWithUnits';

import type {InternalTab, Tab, Trigger} from '../../types/internal';

type Options = Readonly<{
  skipLogs?: boolean;
  timeout?: number;
}>;

type WaitForNewTab = ((trigger: Trigger | undefined, options?: Options) => Promise<Tab>) &
  ((options?: Options) => Promise<Tab>);

/**
 * Waits for opening of new tab and returns this tab.
 */
export const waitForNewTab = (async (
  triggerOrOptions?: Options | Trigger | undefined,
  options?: Options,
): Promise<Tab> => {
  const trigger = typeof triggerOrOptions === 'function' ? triggerOrOptions : undefined;
  const finalOptions =
    typeof triggerOrOptions === 'function' ? options : (triggerOrOptions ?? options);

  const timeout = finalOptions?.timeout ?? getFullPackConfig().navigationTimeout;
  const timeoutWithUnits = getDurationWithUnits(timeout);

  if (trigger !== undefined) {
    setCustomInspectOnFunction(trigger);
  }

  let newTab: InternalTab | undefined;

  await step(
    `Wait for new tab with timeout ${timeoutWithUnits}`,
    async () => {
      const context = getPlaywrightPage().context();
      const pagePromise = context.waitForEvent('page', {timeout});

      await trigger?.();

      const page = await pagePromise;

      newTab = {page};

      const url = page.url();

      return {url};
    },
    {
      payload: {timeoutWithUnits, trigger},
      skipLogs: finalOptions?.skipLogs ?? false,
      timeout: timeout + ADDITIONAL_STEP_TIMEOUT,
      type: LogEventType.InternalCore,
    },
  );

  assertValueIsDefined(newTab, 'newTab is defined', {trigger});

  return newTab satisfies InternalTab as Tab;
}) as WaitForNewTab;
