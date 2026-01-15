import {LogEventType} from '../../../constants/internal';
import {createClientFunction} from '../../../createClientFunction';
import {step} from '../../../step';

import type {AnyPageClassType} from '../../../types/internal';

const forwardPageHistoryClient = createClientFunction(() => window.history.forward(), {
  name: 'forwardPageHistory',
});

/**
 * Go forward in browser page history.
 */
export const forwardPageHistory = (page: InstanceType<AnyPageClassType>): Promise<void> =>
  step(
    `Go forward in browser history from page "${page.constructor.name}"`,
    async () => {
      await forwardPageHistoryClient();

      await page.waitForPageLoaded();
    },
    {type: LogEventType.InternalAction},
  );
