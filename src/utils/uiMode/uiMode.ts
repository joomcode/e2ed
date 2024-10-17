import {e2edEnvironment, UI_MODE_VARIABLE_NAME} from '../../constants/internal';

import {assertValueIsFalse} from '../asserts';

/**
 * `true` if e2ed run in UI mode, and `false` otherwise.
 */
// eslint-disable-next-line import/no-mutable-exports
export let isUiMode: boolean = Boolean(e2edEnvironment[UI_MODE_VARIABLE_NAME]);

/**
 * Set current run environment before e2ed start.
 * @internal
 */
export const setUiMode = (): void => {
  assertValueIsFalse(isUiMode, 'isUiMode is false');

  isUiMode = true;

  e2edEnvironment[UI_MODE_VARIABLE_NAME] = 'true';
};
