import {testController} from '../testController';
import {log} from '../utils/log';

/**
 * Pauses the test and switches to the step-by-step execution mode.
 */
export const debug = async (): Promise<void> => {
  await log('Start debug mode', 'internalAction');

  return testController.debug();
};
