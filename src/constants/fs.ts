/**
 * Amount of parallel open files.
 * @internal
 */
export const AMOUNT_OF_PARALLEL_OPEN_FILES = 40;

/**
 * Default options for `readFile`/`readFileSync` function from `node:fs`.
 */
export const READ_FILE_OPTIONS = {encoding: 'utf8'} as const;
