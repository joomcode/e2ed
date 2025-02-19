import {mkdir} from 'node:fs/promises';

import type {DirectoryPathFromRoot} from '../../types/internal';

const options = {recursive: true} as const;

/**
 * Creates directory by path.
 * @internal
 */
export const createDirectory = async (path: DirectoryPathFromRoot): Promise<void> => {
  await mkdir(path, options);
};
