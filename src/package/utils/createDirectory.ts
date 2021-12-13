import {mkdir} from 'fs/promises';

const options = {recursive: true};

/**
 * Create directory by path.
 * @internal
 */
export const createDirectory = async (path: string): Promise<void> => {
  await mkdir(path, options);
};
