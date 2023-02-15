import {e2edEnvironment, RUN_LABEL_VARIABLE_NAME} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';

import type {RunLabel} from '../../types/internal';

/**
 * Get run label for current e2ed run.
 * @internal
 */
export const getRunLabel = (): RunLabel => {
  const runLabel = e2edEnvironment[RUN_LABEL_VARIABLE_NAME];

  assertValueIsDefined(runLabel, 'runLabel is defined');

  return runLabel;
};

/**
 * Set run label for current e2ed run.
 * @internal
 */
export const setRunLabel = (runLabel: RunLabel): void => {
  e2edEnvironment[RUN_LABEL_VARIABLE_NAME] = runLabel;
};
