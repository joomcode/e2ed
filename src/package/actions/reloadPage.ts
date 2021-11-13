import {ClientFunction} from '../ClientFunction';
import {log} from '../utils/log';

const clientReloadPage = ClientFunction(() => window.location.reload());

/**
 * Reload page.
 */
export const reloadPage = async (): Promise<void> => {
  await log('Reload page', 'internalAction');

  return clientReloadPage();
};
