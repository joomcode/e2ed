import {ClientFunction} from '../../..';

import {waitForInterfaceStabilization} from '../../waitFor';

import type {AnyPageClassType} from '../../../types/internal';

const historyGoForwardClient = ClientFunction(() => window.history.forward(), 'historyGoForward');

/**
 * Go forward in browser history.
 */
export const historyGoForward = async (page: InstanceType<AnyPageClassType>): Promise<void> => {
  await historyGoForwardClient();
  await waitForInterfaceStabilization(page.pageStabilizationInterval);
};
