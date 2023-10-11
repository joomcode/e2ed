import type {RunEnvironment} from '../configurator';

import type {FullPackConfig} from './config';
import type {UtcTimeInMs} from './date';
import type {AbsolutePathToDirectory, DirectoryPathFromRoot, FilePathFromRoot} from './paths';

/**
 * Information about used installed npm package (usually from node_modules).
 */
export type PackageInfo = Readonly<{packagePath: AbsolutePathToDirectory; version: string}>;

/**
 * Complete information about the state of the environment and
 * full e2ed configuration before the time the pack were started.
 * Not internal because it is used in report data.
 */
export type StartInfo<FullPackConfigArg = FullPackConfig> = Readonly<{
  absolutePathToProjectRootDirectory: AbsolutePathToDirectory;
  'cwd()': string;
  e2ed: PackageInfo;
  e2edEnvironmentVariables: Readonly<Record<string, string | undefined>>;
  fullPackConfig: FullPackConfigArg;
  installedE2edDirectoryPath: DirectoryPathFromRoot;
  nodeVersion: string;
  pathToPack: FilePathFromRoot;
  'process.argv': readonly string[];
  pwd: string | undefined;
  runEnvironment: RunEnvironment;
  startTimeInMs: UtcTimeInMs;
  testCafeHammerheadUp: PackageInfo;
  testCafeWithoutTypeCheck: PackageInfo;
}>;
