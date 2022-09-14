import {ClientFunction} from '../../..';

import {waitForInterfaceStabilization} from '../../waitFor';

import type {AnyPageClassType} from '../../../types/internal';

const historyGoBackClient = ClientFunction(() => window.history.back(), 'historyGoBack');

/**
 * Go back in browser history.
 */
export const historyGoBack = async (page: InstanceType<AnyPageClassType>): Promise<void> => {
  await historyGoBackClient();
  await waitForInterfaceStabilization(page.pageStabilizationInterval);
};
