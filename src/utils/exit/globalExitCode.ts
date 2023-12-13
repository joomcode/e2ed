import {assertValueIsDefined, assertValueIsUndefined} from '../asserts';

import type {ExitCode} from '../../constants/internal';

let globalExitCode: ExitCode | undefined;

/**
 * Get global exit code.
 * @internal
 */
export const getGlobalExitCode = (): ExitCode | undefined => globalExitCode;

/**
 * Set global exit code (once).
 * @internal
 */
export const setGlobalExitCode = (exitCode: ExitCode): void => {
  assertValueIsUndefined(globalExitCode, 'globalExitCode is not defined', {exitCode});

  assertValueIsDefined(exitCode, 'exitCode is defined', {globalExitCode});

  globalExitCode = exitCode;
};
