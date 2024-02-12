import {exitFromTestsSubprocess} from './exitFromTestsSubprocess';

/**
 * Interrupts tests subprocess ty timeout.
 * @internal
 */
export const interruptByTimeout = (): void => {
  void exitFromTestsSubprocess({hasError: true, reason: 'Run of tests interrupted by timeout'});
};
