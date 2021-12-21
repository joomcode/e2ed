import type {DeepReadonly} from './deep';

/**
 * Native TestCafe config.
 */
export type TestCafeConfig = DeepReadonly<{
  ajaxRequestTimeout: number;
  assertionTimeout: number;
  browserInitTimeout: number;
  browsers: string | string[];
  color: boolean;
  compilerOptions: {
    typescript?: {
      customCompilerModulePath?: string;
      options?: {esModuleInterop?: boolean; resolveJsonModule?: boolean};
    };
  };
  hostname: string;
  src: string[];
  pageLoadTimeout: number;
  pageRequestTimeout: number;
  reporter: {name: string; output?: string}[];
  retryTestPages: boolean;
  screenshots: {
    path: string;
    pathPattern: string;
    takeOnFails: boolean;
    thumbnails: boolean;
  };
  skipJsErrors: boolean;
  testExecutionTimeout: number;
  concurrency: number;
  port1: number;
  port2: number;
}>;

/**
 * Own e2ed config properties.
 */
type OwnE2edConfig = Readonly<{
  testRunExecutionTimeout: number;
}>;

/**
 * The complete e2ed config object.
 */
export type Config = TestCafeConfig & OwnE2edConfig;
