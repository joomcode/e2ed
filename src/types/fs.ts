import type {Brand} from './brand';

/**
 * Path to the directory from project root (for example "e2ed/tests").
 * @internal
 */
export type DirectoryPathFromRoot = Brand<string, 'DirectoryPathFromRoot'>;

/**
 * Path to the file from project root (for example "e2ed/config.ts").
 * @internal
 */
export type FilePathFromRoot = Brand<string, 'FilePathFromRoot'>;

/**
 * Relative file path for files with tests from project root directory.
 */
export type TestFilePath = Brand<string, 'TestFilePath'>;
