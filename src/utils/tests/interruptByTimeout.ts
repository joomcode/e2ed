import {exitFromTestsSubprocess} from './exitFromTestsSubprocess';

/**
 * Interrupts tests subprocess ty timeout.
 * @internal
 */
export const interruptByTimeout = (): void => {
  void exitFromTestsSubprocess({hasError: true, reason: 'run of tests interrupted by timeout'});
};
