import {LogEventType} from '../../constants/internal';
import {step} from '../../step';

import type {AnyPageClassType} from '../../types/internal';

/**
 * Reloads the page, taking into account its stabilization interval.
 */
export const reloadPage = (page: InstanceType<AnyPageClassType>): Promise<void> =>
  step(
    `Reload page "${page.constructor.name}"`,
    async () => {
      await page.beforeReloadPage?.();

      await page.reloadPage();

      await page.waitForPageLoaded();

      await page.afterReloadPage?.();
    },
    {type: LogEventType.InternalAction},
  );
