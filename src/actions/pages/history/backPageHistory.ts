import {LogEventType} from '../../../constants/internal';
import {createClientFunction} from '../../../createClientFunction';
import {step} from '../../../step';

import type {AnyPageClassType} from '../../../types/internal';

const backPageHistoryClient = createClientFunction(() => window.history.back(), {
  name: 'backPageHistory',
});

/**
 * Go back in browser page history.
 */
export const backPageHistory = (page: InstanceType<AnyPageClassType>): Promise<void> =>
  step(
    `Go back in browser history from page "${page.constructor.name}"`,
    async () => {
      await backPageHistoryClient();

      await page.waitForPageLoaded();
    },
    {type: LogEventType.InternalAction},
  );
