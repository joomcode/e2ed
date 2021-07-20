import {ClientFunction} from 'testcafe';

import {log} from '../utils';

const clientReloadPage = ClientFunction(() => window.location.reload());

/**
 * Reload page.
 */
export const reloadPage = (): Promise<void> => {
  log('Reload page');

  return clientReloadPage();
};
