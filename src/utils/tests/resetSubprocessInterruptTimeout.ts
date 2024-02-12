import {getFullPackConfig} from '../config';

import {interruptByTimeout} from './interruptByTimeout';

let timeoutId: NodeJS.Timeout | undefined;

/**
 * Resets tests subprocess interrupt timeout.
 * @internal
 */
export const resetSubprocessInterruptTimeout = (): void => {
  clearTimeout(timeoutId);

  const {testIdleTimeout} = getFullPackConfig();
  const interruptTimeout = 2 * testIdleTimeout;

  timeoutId = setTimeout(interruptByTimeout, interruptTimeout);
};
