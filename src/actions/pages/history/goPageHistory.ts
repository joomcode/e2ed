import {LogEventType} from '../../../constants/internal';
import {createClientFunction} from '../../../createClientFunction';
import {step} from '../../../step';

import type {AnyPageClassType} from '../../../types/internal';

const goPageHistoryClient = createClientFunction((delta: number) => window.history.go(delta), {
  name: 'goPageHistory',
});

/**
 * Go delta steps in browser page history.
 */
export const goPageHistory = (page: InstanceType<AnyPageClassType>, delta: number): Promise<void> =>
  step(
    `Go ${delta} steps in browser history from page "${page.constructor.name}"`,
    async () => {
      await goPageHistoryClient(delta);

      await page.waitForPageLoaded();
    },
    {type: LogEventType.InternalAction},
  );
