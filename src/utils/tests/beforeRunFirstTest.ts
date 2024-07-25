import {writeLogEventTime} from '../fs';

/**
 * Runs once just before the first test run in the tests subprocess.
 * @internal
 */
export const beforeRunFirstTest = (): void => {
  void writeLogEventTime();
};
