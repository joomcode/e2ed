import type {Brand} from './brand';

/**
 * Absolute path to some directory.
 */
export type AbsolutePathToDirectory = Brand<string, 'AbsolutePathToDirectory'>;

/**
 * Path to the directory from project root (for example "e2ed/tests").
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
