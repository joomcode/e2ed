import {runEnvironment} from '../../configurator';

import {generalLog} from './generalLog';

/**
 * Logs an error on start of e2ed.
 * @internal
 */
export const logStartE2edError = (error: unknown): void => {
  const message = `Caught an error on ${runEnvironment} start of e2ed`;

  try {
    generalLog(message, {error});
  } catch {
    // eslint-disable-next-line no-console
    console.log(message, error);
  }
};
