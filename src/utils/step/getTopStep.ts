import {getStepsStackStorage} from '../../context/stepsStackStorage';

import type {LogEvent} from '../../types/internal';

/**
 * Get current top step (log event), if any.
 * @internal
 */
export const getTopStep = (): LogEvent | undefined => {
  const stepsStackStorage = getStepsStackStorage();

  return stepsStackStorage.getStore();
};
