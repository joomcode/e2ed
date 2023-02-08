import type {RunEnvironment} from '../configurator';

import type {FullConfig} from './config';
import type {UtcTimeInMs} from './date';
import type {AbsolutePathToDirectory, DirectoryPathFromRoot} from './paths';

/**
 * Information about used installed npm package (usually from node_modules).
 */
export type PackageInfo = Readonly<{packagePath: AbsolutePathToDirectory; version: string}>;

/**
 * Complete information about the state of the environment and
 * full e2ed configuration before the time the pack were started.
 * Not internal because it is used in report data.
 */
export type StartInfo = Readonly<{
  PWD: string | undefined;
  absolutePathToProjectRootDirectory: AbsolutePathToDirectory;
  'cwd()': string;
  e2ed: PackageInfo;
  e2edEnvironmentVariables: Record<string, string | undefined>;
  fullConfig: FullConfig;
  installedE2edDirectoryPath: DirectoryPathFromRoot;
  nodeVersion: string;
  'process.argv': readonly string[];
  runEnvironment: RunEnvironment;
  startTimeInMs: UtcTimeInMs;
  testCafeHammerheadUp: PackageInfo;
  testCafeWithoutTypeCheck: PackageInfo;
}>;
