import type {RunEnvironment} from '../constants/internal';

import type {FullConfig} from './config';
import type {E2edRunEvent} from './events';

/**
 * Full environment information that we receive
 * at the time of the start of the tests.
 * @internal
 */
export type FullStartInfo = E2edRunEvent & StartInfo;

/**
 * Complete information about the state of the environment and
 * full e2ed configuration before the time the tests were started.
 * Not internal because it is used in report data.
 */
export type StartInfo = Readonly<{
  PWD: string | undefined;
  'cwd()': string;
  e2edEnvironmentVariables: Record<string, string | undefined>;
  e2edVersion: string;
  fullConfig: FullConfig;
  nodeVersion: string;
  'process.argv': readonly string[];
  runEnvironment: RunEnvironment;
}>;
