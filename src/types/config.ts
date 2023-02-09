import type {DeepReadonly} from './deep';
import type {CustomPackPropertiesPlaceholder, SkipTestsPlaceholder} from './userland';

/**
 * Own e2ed config properties.
 */
type OwnE2edConfig<SkipTests = SkipTestsPlaceholder> = Readonly<{
  dockerImage: string;
  maxRetriesCountInDocker: number;
  liteReportFileName: string | null;
  packTimeout: number;
  pageStabilizationInterval: number;
  printTestLogsInConsole: boolean;
  reportFileName: string | null;
  skipTests: SkipTests;
  /**
   * An array of globs with pack test (task) files.
   * {@link https://www.npmjs.com/package/globby} is used for matching globs.
   */
  testFileGlobs: readonly string[];
  testIdleTimeout: number;
  testLogsFileName: string | null;
  testTimeout: number;
  waitForRequestTimeout: number;
  waitForResponseTimeout: number;
}>;

/**
 * Userland part of TestCafe config.
 */
type UserlangTestCafeConfig<CustomPackProperties = CustomPackPropertiesPlaceholder> = Readonly<{
  ajaxRequestTimeout: number;
  assertionTimeout: number;
  browserInitTimeout: number;
  browser: string;
  concurrency: number;
  customPackProperties: CustomPackProperties;
  pageRequestTimeout: number;
  port1: number;
  port2: number;
  selectorTimeout: number;
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
export type UserlandConfig<
  SkipTests = SkipTestsPlaceholder,
  CustomPackProperties = CustomPackPropertiesPlaceholder,
> = UserlangTestCafeConfig<CustomPackProperties> & OwnE2edConfig<SkipTests>;

/**
 * The complete e2ed config object.
 */
export type FullConfig<SkipTests = unknown> = (unknown extends SkipTests
  ? UserlandConfig
  : UserlandConfig<SkipTests>) &
  FrozenPartOfTestCafeConfig &
  Readonly<{browsers: string; src: readonly string[]}>;
