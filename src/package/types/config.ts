import type {SkipTests} from '../hooks';

import type {DeepReadonly} from './deep';

/**
 * Own e2ed config properties.
 */
type OwnE2edConfig = Readonly<{
  maxRetriesCountInDocker: number;
  liteReportFileName: string | null;
  printTestLogsInConsole: boolean;
  reportFileName: string | null;
  skipTests: SkipTests;
  testLogsFileName: string | null;
  testTimeout: number;
}>;

/**
 * Userland part of TestCafe config.
 */
type UserlangTestCafeConfig = Readonly<{
  ajaxRequestTimeout: number;
  assertionTimeout: number;
  browserInitTimeout: number;
  browsers: string | readonly string[];
  concurrency: number;
  pageRequestTimeout: number;
  port1: number;
  port2: number;
  selectorTimeout: number;
  src: readonly string[];
}>;

/**
 * Frozen (readonly) part of TestCafe config.
 */
export type FrozenPartOfTestCafeConfig = DeepReadonly<{
  color: boolean;
  compilerOptions: {
    typescript?: {
      customCompilerModulePath?: string;
      options?: {esModuleInterop?: boolean; resolveJsonModule?: boolean};
    };
  };
  hostname: string;
  pageLoadTimeout: number;
  reporter: readonly {name: string; output?: string}[];
  retryTestPages: boolean;
  screenshots: {
    path: string;
    pathPattern: string;
    takeOnFails: boolean;
    thumbnails: boolean;
  };
  skipJsErrors: boolean;
}>;

/**
 * The complete userland e2ed config.
 */
export type UserlandConfig = UserlangTestCafeConfig & OwnE2edConfig;

/**
 * The complete e2ed config object.
 */
export type FullConfig = UserlandConfig & FrozenPartOfTestCafeConfig;
