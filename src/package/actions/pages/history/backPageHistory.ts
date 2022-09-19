import {ClientFunction} from '../../../ClientFunction';
import {LogEventType} from '../../../constants/internal';
import {log} from '../../../utils/log';

import {waitForInterfaceStabilization} from '../../waitFor';

import type {AnyPageClassType} from '../../../types/internal';

const backPageHistoryClient = ClientFunction(() => window.history.back(), 'backPageHistory');

/**
 * Go back in browser page history.
 */
export const backPageHistory = async (page: InstanceType<AnyPageClassType>): Promise<void> => {
  await log(
    `Go back in browser history from page "${page.constructor.name}"`,
    undefined,
    LogEventType.InternalAction,
  );

  await backPageHistoryClient();

  await waitForInterfaceStabilization(page.pageStabilizationInterval);
};
