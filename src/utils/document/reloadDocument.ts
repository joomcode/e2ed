import {createClientFunction} from '../../createClientFunction';

import type {ClientFunction} from '../../types/internal';

let clientReloadDocument: ClientFunction | undefined;

/**
 * Reloads current document.
 */
export const reloadDocument = (): Promise<void> => {
  if (clientReloadDocument === undefined) {
    clientReloadDocument = createClientFunction(() => window.location.reload(), {
      name: 'reloadPage',
    });
  }

  return clientReloadDocument();
};
