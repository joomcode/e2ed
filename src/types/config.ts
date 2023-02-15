import type {DeepReadonly} from './deep';
import type {CustomPackPropertiesPlaceholder, SkipTestsPlaceholder} from './userland';

/**
 * Own e2ed config properties.
 */
type OwnE2edConfig<
  SkipTests = SkipTestsPlaceholder,
  CustomPackProperties = CustomPackPropertiesPlaceholder,
> = Readonly<{
  /**
   * Custom pack properties for using in hooks, etc.
   */
  customPackProperties: CustomPackProperties;
  /**
   * The name of the docker image where the tests will run.
   * The image must be based on the e2ed base image.
   */
  dockerImage: string;
  /**
   * The maximum number of retries to run a test with the command
   * `your-project/autotests/bin/runDocker.sh` (until the test passes).
   * For example, if it is equal to three, the test will be run no more than three times.
   */
  maxRetriesCountInDocker: number;
  /**
   * The name of the file under which, after running the tests,
   * the lite JSON report will be saved in the `autotests/reports` directory,
   * for example, `lite-report.json`.
   * If `null`, the lite report will not be saved.
   */
  liteReportFileName: string | null;
  /**
   * Timeout (in millisecond) for the entire pack of tests (tasks).
   * If the test pack takes longer than this timeout, the pack will fail with the appropriate error.
   */
  packTimeout: number;
  /**
   * After navigating to the page, `e2ed` will wait until the page is stable
   * for the specified time in millisecond, and only after that it will consider the page loaded.
   * This parameter can be overridden on a specific page instance.
   */
  pageStabilizationInterval: number;
  /**
   * If true, print test logs to the console (literally in console.log).
   */
  printTestLogsInConsole: boolean;
  /**
   * The name of the file under which, after running the tests,
   * the HTML report will be saved in the `autotests/reports` directory, for example, `report.html`.
   * Also this name is used as the title of the report page.
   * If `null`, the report will not be saved.
   */
  reportFileName: string | null;
  /**
   * This setting allows you to describe a set of skipped tests in a custom form.
   * You can define the `SkipTests` type and `skipTests` processing rules
   * in the hook `autotests/hooks/isTestSkipped.ts`.
   */
  skipTests: SkipTests;
  /**
   * An array of globs with pack test (task) files.
   * {@link https://www.npmjs.com/package/globby} is used for matching globs.
   */
  testFileGlobs: readonly string[];
  /**
   * Timeout (in milliseconds) for each individual test step.
   * If the test step (interval between two `log` function calls) takes longer than this timeout,
   * the test fails and rerun on the next retry.
   * This parameter can be overridden in the test-specific options.
   */
  testIdleTimeout: number;
  /**
   * The name of the file under which, after running the tests,
   * the test logs will be saved in the `autotests/reports` directory, for example, `test-logs.log`.
   * If `null`, the report will not be saved.
   */
  testLogsFileName: string | null;
  /**
   * Timeout (in milliseconds) for each individual test run.
   * If the test run takes longer than this timeout, the test fails and rerun on the next retry.
   * This parameter can be overridden in the test-specific options.
   */
  testTimeout: number;
  /**
   * Default timeout (in milliseconds) for waitForRequest function.
   * If the wait is longer than this timeout, then the promise
   * returned by the waitForRequest function is rejected.
   */
  waitForRequestTimeout: number;
  /**
   * Default timeout (in milliseconds) for waitForResponse function.
   * If the wait is longer than this timeout, then the promise
   * returned by the waitForResponse function is rejected.
   */
  waitForResponseTimeout: number;
}>;

/**
 * Userland part of TestCafe config.
 */
type UserlangTestCafeConfig = Readonly<{
  ajaxRequestTimeout: number;
  assertionTimeout: number;
  browserInitTimeout: number;
  browser: string;
  concurrency: number;
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
> = UserlangTestCafeConfig & OwnE2edConfig<SkipTests, CustomPackProperties>;

/**
 * The complete pack configuration object.
 */
export type FullPackConfig<
  SkipTests = unknown,
  CustomPackProperties = unknown,
> = (unknown extends SkipTests
  ? UserlandConfig
  : unknown extends CustomPackProperties
  ? UserlandConfig<SkipTests>
  : UserlandConfig<SkipTests, CustomPackProperties>) &
  FrozenPartOfTestCafeConfig &
  Readonly<{browsers: string; src: readonly string[]}>;

/**
 * Type of userland getFullPackConfig function (with defined Pack type).
 */
export type GetFullPackConfig<Pack extends UserlandConfig<unknown, unknown>> = () => FullPackConfig<
  Pack['skipTests'],
  Pack['customPackProperties']
>;
