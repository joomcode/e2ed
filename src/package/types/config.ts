import type {SkipTests} from '../hooks';

import type {DeepPartial, DeepReadonly} from './deep';

/**
 * Own e2ed config properties.
 */
type OwnE2edConfig = Readonly<{
  skipTests?: SkipTests;
  testRunExecutionTimeout: number;
}>;

/**
 * Userlanf part of TestCafe config.
 */
type UserlangTestCafeConfig = Readonly<{
  ajaxRequestTimeout: number;
  assertionTimeout: number;
  browserInitTimeout: number;
  browsers: string | readonly string[];
  src: readonly string[];
  pageLoadTimeout: number;
  pageRequestTimeout: number;
  selectorTimeout: number;
  testExecutionTimeout: number;
  concurrency: number;
  port1: number;
  port2: number;
}>;

/**
 * Own part of TestCafe config.
 */
type OwnTestCafeConfig = DeepReadonly<{
  color: boolean;
  compilerOptions: {
    typescript?: {
      customCompilerModulePath?: string;
      options?: {esModuleInterop?: boolean; resolveJsonModule?: boolean};
    };
  };
  hostname: string;
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
 * Native TestCafe config.
 */
type TestCafeConfig = UserlangTestCafeConfig & OwnTestCafeConfig;

/**
 * The complete e2ed config object.
 */
export type FullConfig = TestCafeConfig & OwnE2edConfig;

/**
 * Userland e2ed config.
 */
export type UserlandConfig = DeepPartial<UserlangTestCafeConfig & OwnE2edConfig>;
