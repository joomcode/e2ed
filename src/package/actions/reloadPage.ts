import {ClientFunction} from '../ClientFunction';
import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

const clientReloadPage = ClientFunction(() => window.location.reload(), 'reloadPage');

/**
 * Reload page.
 */
export const reloadPage = async (): Promise<void> => {
  await log('Reload page', LogEventType.InternalAction);

  return clientReloadPage();
};
