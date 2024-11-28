import {LogEventType} from '../../../constants/internal';
import {createClientFunction} from '../../../createClientFunction';
import {log} from '../../../utils/log';

import type {AnyPageClassType} from '../../../types/internal';

const goPageHistoryClient = createClientFunction((delta: number) => window.history.go(delta), {
  name: 'goPageHistory',
});

/**
 * Go delta steps in browser page history.
 */
export const goPageHistory = async (
  page: InstanceType<AnyPageClassType>,
  delta: number,
): Promise<void> => {
  log(
    `Go ${delta} steps in browser history from page "${page.constructor.name}"`,
    undefined,
    LogEventType.InternalAction,
  );

  await goPageHistoryClient(delta);

  await page.waitForPageLoaded();
};
