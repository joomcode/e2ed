import {writeLogEventTime} from '../fs';

import {resetSubprocessInterruptTimeout} from './resetSubprocessInterruptTimeout';

/**
 * Runs once just before the first test run in the tests subprocess.
 * @internal
 */
export const beforeRunFirstTest = (): void => {
  resetSubprocessInterruptTimeout();

  void writeLogEventTime();
};
