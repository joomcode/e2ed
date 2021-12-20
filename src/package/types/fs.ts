import type {Brand} from './brand';

/**
 * Path to directory from project root (for example "e2ed/tests").
 */
export type DirectoryPathFromRoot = Brand<string, 'DirectoryPathFromRoot'>;

/**
 * Relative file path for files with tests.
 */
export type TestFilePath = Brand<string, 'TestFilePath'>;
