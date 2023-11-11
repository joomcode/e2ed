import type {MapLogPayload, MapLogPayloadInReport} from '../log';
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
    liteReport: LiteReport<CustomPackProperties, CustomReportProperties, SkipTests, TestMeta>,
  ) => MaybePromise<CustomReportProperties | Void>)[];

  /**
   * The name of the docker image where the tests will run.
   * The image must be based on the e2ed base image.
   */
  dockerImage: string;

  /**
   * This function filters tests (tasks) by their static options —
   * only those tests for which the function returned `true` get into the pack.
   */
  filterTestsIntoPack: (this: void, testStaticOptions: TestStaticOptions<TestMeta>) => boolean;

  /**
   * The name of the file under which, after running the tests,
   * the lite JSON report will be saved in the `autotests/reports` directory,
   * for example, `lite-report.json`.
   * If `null`, the lite report will not be saved.
   */
  liteReportFileName: string | null;

  /**
   * The name of the file under which, after running the tests,
   * the pack logs will be saved in the `autotests/reports` directory, for example, `pack-logs.log`.
   * If `null`, the log will not be saved.
   */
  logFileName: string | null;

  /**
   * Maps log payload for logging in console to clarify, shorten or skip a console log entry.
   * If the mapping returns `null`, the log entry is skipped.
   * If the mapping returns `undefined`, the log entry is not skipped, but is printed with an empty payload.
   */
  mapLogPayloadInConsole: MapLogPayload;

  /**
   * Maps log payload for logging in file to clarify, shorten or skip a log file entry.
   * If the mapping returns `null`, the log entry is skipped.
   * If the mapping returns `undefined`, the log entry is not skipped, but is printed with an empty payload.
   */
  mapLogPayloadInLogFile: MapLogPayload;

  /**
   * Maps log payload for logging step in HTML report and lite report to clarify,
   * shorten or skip a report step. If the mapping returns `null`, the step is skipped.
   * If the mapping returns `undefined`, the log entry is not skipped, but is printed with an empty payload.
   */
  mapLogPayloadInReport: MapLogPayloadInReport;

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
   * Path to the directory where screenshots will be stored for displaying them in the HTML report.
   * This path must be either relative (from the HTML report file) or absolute (i.e. with http/https protocol).
   * The screenshot directory should be served by the web server with appropriate headers,
   * like a normal static directory.
   * The `autotests/reports/screenshots` directory from the project should be copied
   * to this directory after the pack is completed,
   * and then screenshots from this directory will be displayed in the HTML report.
   * If `null`, screenshots will not be displayed in the HTML report.
   */
  pathToScreenshotsDirectoryForReport: string | null;

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
   * If `true`, then takes a screenshot of the full page (not just the viewport)
   * at the time of the test error, for display in the HTML report.
   */
  takeFullPageScreenshotOnError: boolean;

  /**
   * If `true`, then takes a screenshot of the page viewport
   * at the time of the test error, for display in the HTML report.
   */
  takeViewportScreenshotOnError: boolean;

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
   * Timeout (in milliseconds) for each individual test run.
   * If the test run takes longer than this timeout, the test fails and rerun on the next retry.
   * This parameter can be overridden in the test-specific options.
   */
  testTimeout: number;

  /**
   * Group of settings for the `waitForAllRequestsComplete` function.
   */
  waitForAllRequestsComplete: Readonly<{
    /**
     * Default maximum interval (in milliseconds) between requests.
     * If there are no new requests for more than this interval, then the promise
     * returned by the `waitForAllRequestsComplete` function will be successfully resolved.
     */
    maxIntervalBetweenRequestsInMs: number;

    /**
     * Default timeout (in milliseconds) for `waitForAllRequestsComplete` function.
     * If the wait is longer than this timeout, then the promise
     * returned by the `waitForAllRequestsComplete` function will be rejected.
     */
    timeout: number;
  }>;

  /**
   * Group of settings for the `waitForInterfaceStabilization` function.
   */
  waitForInterfaceStabilization: Readonly<{
    /**
     * Default stabilization interval for `waitForInterfaceStabilization` function.
     */
    stabilizationInterval: number;

    /**
     * Default timeout (in milliseconds) for `waitForInterfaceStabilization` function.
     * If the wait is longer than this timeout, then the promise
     * returned by the `waitForInterfaceStabilization` function will be rejected.
     */
    timeout: number;
  }>;

  /**
   * Default timeout (in milliseconds) for `waitForRequest` function.
   * If the wait is longer than this timeout, then the promise
   * returned by the `waitForRequest` function will be rejected.
   */
  waitForRequestTimeout: number;

  /**
   * Default timeout (in milliseconds) for `waitForResponse` function.
   * If the wait is longer than this timeout, then the promise
   * returned by the `waitForResponse` function will be rejected.
   */
  waitForResponseTimeout: number;
}>;
