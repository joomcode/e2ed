import {e2edEnvironment, EndE2edReason} from '../../constants/internal';

import {generalLog} from '../generalLog';

import {endE2ed} from './endE2ed';

/**
 * `nodejs` e2ed process end hanlder.
 * @internal
 */
const endHandler = (signal: NodeJS.Signals): void => {
  const message = `Receive nodejs e2ed process end signal ${signal}`;

  e2edEnvironment.E2ED_TERMINATION_SIGNAL = signal;

  // eslint-disable-next-line no-console
  console.log(message);
  generalLog(message);

  endE2ed(EndE2edReason.ProcessEndSignal);
};

/**
 * Set `nodejs` e2ed process end hanlders (`SIGHUP`, `SIGINT`, `SIGTERM`, `SIGUSR1`).
 * @internal
 */
export const setProcessEndHandlers = (): void => {
  process.on('SIGHUP', endHandler);
  process.on('SIGINT', endHandler);
  process.on('SIGTERM', endHandler);
  process.on('SIGUSR1', endHandler);
};
