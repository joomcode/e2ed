import {URL} from 'node:url';

import {LogEventType} from '../../constants/internal';
import {getCdpClient} from '../../context/cdpClient';
import {getDocumentUrl} from '../../utils/document';
import {log} from '../../utils/log';

import type {AnyPageClassType} from '../../types/internal';

/**
 * Reloads the page, taking into account its stabilization interval.
 */
export const reloadPage = async (page: InstanceType<AnyPageClassType>): Promise<void> => {
  log(`Reload page "${page.constructor.name}"`, LogEventType.InternalAction);

  const cdpClient = getCdpClient();

  if (cdpClient !== undefined) {
    const url = await getDocumentUrl();

    const {origin} = new URL(url);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    await cdpClient.ServiceWorker.unregister({scopeURL: origin});
  }

  await page.beforeReloadPage?.();

  await page.reloadPage();

  await page.waitForPageLoaded();

  await page.afterReloadPage?.();
};
