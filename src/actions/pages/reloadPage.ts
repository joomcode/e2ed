import {LogEventType} from '../../constants/internal';
import {log} from '../../utils/log';

import type {AnyPageClassType} from '../../types/internal';

/**
 * Reloads the page, taking into account its stabilization interval.
 */
export const reloadPage = async (page: InstanceType<AnyPageClassType>): Promise<void> => {
  log(`Reload page "${page.constructor.name}"`, LogEventType.InternalAction);

  await page.beforeReloadPage?.();

  await page.reloadPage();

  await page.waitForPageLoaded();

  await page.afterReloadPage?.();
};
