import {runEnvironment} from '../../configurator';

import {generalLog} from './generalLog';

/**
 * Log an error on start of e2ed.
 * @internal
 */
export const logStartE2edError = (error: unknown): void => {
  generalLog(`Caught an error on ${runEnvironment} start of e2ed`, {error});
};
