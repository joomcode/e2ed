import {getIntegerFromEnvVariable} from '../utils/getIntegerFromEnvVariable';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

/**
 * Waits for the interface stabilization after the (intended) navigation to another page.
 */
export const waitForNavigateInterfaceStabilization = async (): Promise<void> => {
  const stabilizationInterval = getIntegerFromEnvVariable({
    defaultValue: 2000,
    maxValue: 60_000,
    name: 'E2ED_NAVIGATE_STABILIZATION_INTERVAL',
  });

  await log(
    'Wait for the interface stabilization after the intended navigation to another page',
    'internalAction',
  );

  await waitForInterfaceStabilization(stabilizationInterval);
};
