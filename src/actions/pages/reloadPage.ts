import {LogEventType} from '../../constants/internal';
import {createClientFunction} from '../../createClientFunction';
import {log} from '../../utils/log';

import type {AnyPageClassType} from '../../types/internal';

const clientReloadPage = createClientFunction(() => window.location.reload(), {name: 'reloadPage'});

/**
 * Reloads the page, taking into account its stabilization interval.
 */
export const reloadPage = async (page: InstanceType<AnyPageClassType>): Promise<void> => {
  log(`Reload page "${page.constructor.name}"`, LogEventType.InternalAction);

  await clientReloadPage();

  await page.waitForPageLoaded();
};
