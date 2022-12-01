import {LogEventType} from '../../../constants/internal';
import {createClientFunction} from '../../../createClientFunction';
import {log} from '../../../utils/log';

import {waitForInterfaceStabilization} from '../../waitFor';

import type {AnyPageClassType} from '../../../types/internal';

const forwardPageHistoryClient = createClientFunction(() => window.history.forward(), {
  name: 'forwardPageHistory',
});

/**
 * Go forward in browser page history.
 */
export const forwardPageHistory = async (page: InstanceType<AnyPageClassType>): Promise<void> => {
  log(
    `Go forward in browser history from page "${page.constructor.name}"`,
    undefined,
    LogEventType.InternalAction,
  );

  await forwardPageHistoryClient();

  await waitForInterfaceStabilization(page.pageStabilizationInterval);
};
