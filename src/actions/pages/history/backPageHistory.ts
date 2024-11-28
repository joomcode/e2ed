import {LogEventType} from '../../../constants/internal';
import {createClientFunction} from '../../../createClientFunction';
import {log} from '../../../utils/log';

import type {AnyPageClassType} from '../../../types/internal';

const backPageHistoryClient = createClientFunction(() => window.history.back(), {
  name: 'backPageHistory',
});

/**
 * Go back in browser page history.
 */
export const backPageHistory = async (page: InstanceType<AnyPageClassType>): Promise<void> => {
  log(
    `Go back in browser history from page "${page.constructor.name}"`,
    undefined,
    LogEventType.InternalAction,
  );

  await backPageHistoryClient();

  await page.waitForPageLoaded();
};
