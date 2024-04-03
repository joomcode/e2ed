import {getCdpClient} from '../../context/cdpClient';
import {createClientFunction} from '../../createClientFunction';

import type {ClientFunction} from '../../types/internal';

let clientReloadDocument: ClientFunction | undefined;

/**
 * Reloads current document.
 */
export const reloadDocument = (): Promise<void> => {
  const cdpClient = getCdpClient();

  if (cdpClient !== undefined) {
    return cdpClient.Page.reload({});
  }

  if (clientReloadDocument === undefined) {
    clientReloadDocument = createClientFunction(() => window.location.reload(), {
      name: 'reloadPage',
    });
  }

  return clientReloadDocument();
};
