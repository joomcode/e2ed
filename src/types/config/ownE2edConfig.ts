import type {MaybePromise} from '../promise';
import type {LiteReport} from '../report';
import type {TestStaticOptions} from '../testRun';
import type {Void} from '../undefined';
import type {
  CustomPackPropertiesPlaceholder,
  CustomReportPropertiesPlaceholder,
  SkipTestsPlaceholder,
  TestMetaPlaceholder,
} from '../userland';

/**
 * Own e2ed pack config properties without `doBeforepack` properties.
 */
export type OwnE2edConfig<
  CustomPackProperties = CustomPackPropertiesPlaceholder,
  CustomReportProperties = CustomReportPropertiesPlaceholder,
  SkipTests = SkipTestsPlaceholder,
  TestMeta = TestMetaPlaceholder,
> = Readonly<{
  /**
   * Custom pack properties for using in hooks, etc.
   */
  customPackProperties: CustomPackProperties;

  /**
   * An array of functions that will be executed, in order, after the pack completes.
   * The functions accept a lite report object, and can return custom report properties,
   * which in this case will be included in the lite report.
   * Each function can thus access the results of the previous function.
   */
  doAfterPack: readonly ((
    this: void,
    liteReport: LiteReport<CustomReportProperties, TestMeta>,
  ) => MaybePromise<CustomReportProperties | Void>)[];

  /**
   * The name of the docker image where the tests will run.
   * The image must be based on the e2ed base image.
   */
  dockerImage: string;

  /**
   * This function filters tests (tasks) by their static options —
   * only those tests for which the function returned true get into the pack.
   */
  isTestIncludedInPack: (this: void, testStaticOptions: TestStaticOptions<TestMeta>) => boolean;

  /**
   * The name of the file under which, after running the tests,
   * the lite JSON report will be saved in the `autotests/reports` directory,
   * for example, `lite-report.json`.
   * If `null`, the lite report will not be saved.
   */
  liteReportFileName: string | null;

  /**
   * The maximum number of retries to run a test with the command
   * `your-project/autotests/bin/runDocker.sh` (until the test passes).
   * For example, if it is equal to three, the test will be run no more than three times.
   */
  maxRetriesCountInDocker: number;

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
