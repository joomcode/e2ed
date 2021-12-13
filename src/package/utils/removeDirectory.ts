import {rm} from 'fs/promises';

const options = {recursive: true, force: true};

/**
 * Remove directory by path (recursive and with force).
 * @internal
 */
export const removeDirectory = (path: string): Promise<void> => rm(path, options);
