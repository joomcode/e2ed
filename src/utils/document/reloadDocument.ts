import {getCdpClient} from '../../context/cdpClient';
import {createClientFunction} from '../../createClientFunction';

import {getFullPackConfig} from '../config';

import type {ClientFunction} from '../../types/internal';

let clientReloadDocument: ClientFunction | undefined;

/**
 * Reloads current document.
 */
export const reloadDocument = (): Promise<void> => {
  const {enableChromeDevToolsProtocol} = getFullPackConfig();

  if (enableChromeDevToolsProtocol) {
    const cdpClient = getCdpClient();

    return cdpClient.Page.reload({});
  }

  if (clientReloadDocument === undefined) {
    clientReloadDocument = createClientFunction(() => window.location.reload(), {
      name: 'reloadPage',
    });
  }

  return clientReloadDocument();
};
