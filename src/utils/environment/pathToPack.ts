import {e2edEnvironment, PATH_TO_PACK_VARIABLE_NAME} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';

import type {FilePathFromRoot} from '../../types/internal';

/**
 * Get path to pack for current e2ed run.
 * @internal
 */
export const getPathToPack = (): FilePathFromRoot => {
  const pathToPack = e2edEnvironment[PATH_TO_PACK_VARIABLE_NAME];

  assertValueIsDefined(pathToPack, 'pathToPack is defined');

  return pathToPack as FilePathFromRoot;
};

/**
 * Set path to pack for current e2ed run.
 * @internal
 */
export const setPathToPack = (pathToPack: FilePathFromRoot): void => {
  e2edEnvironment[PATH_TO_PACK_VARIABLE_NAME] = pathToPack;
};
