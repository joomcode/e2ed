import {e2edEnvironment, PATH_TO_PACK_VARIABLE_NAME} from '../../constants/internal';

import type {FilePathFromRoot} from '../../types/internal';

/**
 * Set path to pack for current e2ed run.
 * @internal
 */
export const setPathToPack = (pathToPack: FilePathFromRoot): void => {
  e2edEnvironment[PATH_TO_PACK_VARIABLE_NAME] = pathToPack;
};
