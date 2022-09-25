import {ClientFunction} from '../../../ClientFunction';
import {LogEventType} from '../../../constants/internal';
import {log} from '../../../utils/log';

import {waitForInterfaceStabilization} from '../../waitFor';

import type {AnyPageClassType} from '../../../types/internal';

const forwardPageHistoryClient = ClientFunction(
  () => window.history.forward(),
  'forwardPageHistory',
);

/**
 * Go forward in browser page history.
 */
export const forwardPageHistory = async (page: InstanceType<AnyPageClassType>): Promise<void> => {
  await log(
    `Go forward in browser history from page "${page.constructor.name}"`,
    undefined,
    LogEventType.InternalAction,
  );

  await forwardPageHistoryClient();

  await waitForInterfaceStabilization(page.pageStabilizationInterval);
};