import {EndE2edReason} from '../../constants/internal';

import {generalLog} from '../generalLog';

import {endE2ed} from './endE2ed';

/**
 * nodejs e2ed process end hanlder.
 * @internal
 */
const endHandler = (signal: NodeJS.Signals): void => {
  generalLog(`Receive nodejs e2ed process end signal ${signal}`);

  endE2ed(EndE2edReason.ProcessEndSignal);
};

/**
 * Set nodejs e2ed process end hanlders (SIGINT, SIGTERM).
 * @internal
 */
export const setProcessEndHandlers = (): void => {
  process.on('SIGINT', endHandler);
  process.on('SIGTERM', endHandler);
};
