import {rm} from 'fs/promises';

import type {DirectoryPathFromRoot} from '../types/internal';

const options = {recursive: true, force: true};

/**
 * Remove directory by path (recursive and with force).
 * @internal
 */
export const removeDirectory = (path: DirectoryPathFromRoot): Promise<void> => rm(path, options);
