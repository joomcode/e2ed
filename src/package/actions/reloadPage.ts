import {ClientFunction} from '../ClientFunction';
import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

const clientReloadPage = ClientFunction(() => window.location.reload(), 'reloadPage');

/**
 * Reload page.
 */
export const reloadPage = async (stabilizationInterval = 2000): Promise<void> => {
  await log('Reload page', LogEventType.InternalAction);

  await clientReloadPage();

  await waitForInterfaceStabilization(stabilizationInterval);
};
