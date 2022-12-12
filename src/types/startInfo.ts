import type {RunEnvironment} from '../configurator';

import type {FullConfig} from './config';
import type {UtcTimeInMs} from './date';
import type {AbsolutePathToDirectory, DirectoryPathFromRoot} from './paths';

/**
 * Complete information about the state of the environment and
 * full e2ed configuration before the time the pack were started.
 * Not internal because it is used in report data.
 */
export type StartInfo = Readonly<{
  PWD: string | undefined;
  absolutePathToInstalledE2edDirectory: AbsolutePathToDirectory;
  absolutePathToProjectRootDirectory: AbsolutePathToDirectory;
  'cwd()': string;
  e2edEnvironmentVariables: Record<string, string | undefined>;
  e2edVersion: string;
  fullConfig: FullConfig;
  installedE2edDirectoryPath: DirectoryPathFromRoot;
  nodeVersion: string;
  'process.argv': readonly string[];
  runEnvironment: RunEnvironment;
  startTimeInMs: UtcTimeInMs;
}>;
