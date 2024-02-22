/**
 * Amount of parallel open files.
 * @internal
 */
export const AMOUNT_OF_PARALLEL_OPEN_FILES = 40;

/**
 * Default options for `readFile`/`readFileSync` function from `node:fs`.
 * @internal
 */
export const READ_FILE_OPTIONS = {encoding: 'utf8'} as const;

/**
 * Default file chunk length (for `writeFile`).
 * @internal
 */
export const DEFAULT_FILE_CHUNK_LENGTH = 16_384;
