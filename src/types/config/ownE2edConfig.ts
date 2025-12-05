import type {PlaywrightTestConfig} from '@playwright/test';

import type {TestRunStatus} from '../../constants/internal';

import type {LogEvent} from '../events';
import type {FullMocksConfig} from '../fullMocks';
import type {LogTag, MapBackendResponseToLog, MapLogPayload, MapLogPayloadInReport} from '../log';
import type {MatchScreenshotConfig} from '../matchScreenshot';
import type {MaybePromise} from '../promise';
import type {LiteReport} from '../report';
import type {TestOptions, TestStaticOptions} from '../testRun';
import type {Void} from '../undefined';
import type {
  CustomPackPropertiesPlaceholder,
  CustomReportPropertiesPlaceholder,
  SkipTestsPlaceholder,
  TestMetaPlaceholder,
} from '../userland';

import type {BrowserName} from './config';

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
   * Array of additional log tags. Logs with a specific tag (in `logTag` field)
   * will be added only if their tag is specified in this array.
   */
  addLogsWithTags: readonly LogTag[];

  /**
   * Array of browser flags, like `--disable-dev-shm-usage`, with which the browser is launched to run tests.
   */
  browserFlags: readonly string[];

  /**
   * Browser name (one of `chromium`, `firefox`, `webkit`).
   */
  browserName: BrowserName;

  /**
   * Custom pack properties for using in hooks, etc.
   */
  customPackProperties: CustomPackProperties;

  /**
   * Device scale factor (aka `window.devicePixelRatio`);
   */
  deviceScaleFactor: number;

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
   * Enables Content-Security-Policy checks in browser.
   */
  enableCsp: boolean;

  /**
   * Enables headless mode (if browser supports such mode).
   */
  enableHeadlessMode: boolean;

  /**
   * Enables Chromium mobile device mode.
   * {@link https://developer.chrome.com/docs/devtools/device-mode}
   */
  enableMobileDeviceMode: boolean;

  /**
   * Enables touch event emulation.
   * If `true`, page fires `touch` events when test interact with the page (instead of `click` events).
   */
  enableTouchEventEmulation: boolean;

  /**
   * This function filters tests (tasks) by their static options —
   * only those tests for which the function returned `true` get into the pack.
   */
  filterTestsIntoPack: (this: void, testStaticOptions: TestStaticOptions<TestMeta>) => boolean;

  /**
   * Functions that specify the "full mocks" functionality.
   */
  fullMocks: FullMocksConfig<TestMeta> | null;

  /**
   * Get prefix for test name in UI mode by test options.
   */
  getTestNamePrefixInUiMode: (this: void, testOptions: TestOptions<TestMeta>) => string;

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
   * Maps responses with errors from the backend to "red" logs (as errors) during the test.
   * It is assumed that the function will select responses with
   * statuse codes of 400 and higher (client and server errors).
   * Backend responses with errors are accumulated in separate "red" log step
   * (with `logEventStatus: 'failed'`).
   * Log the `responseBody` field carefully, as the body of backend response can be very large.
   * If the function returns `undefined`, the response is not logged (skipped).
   */
  mapBackendResponseErrorToLog: MapBackendResponseToLog;

  /**
   * Maps responses from the backend to logs during the test.
   * Backend responses received during a certain test step are accumulated
   * in an array in the `backendResponses` field of the log of this step.
   * Log the `responseBody` field carefully, as the body of backend response can be very large.
   * If the function returns `undefined`, the response is not logged (skipped).
   */
  mapBackendResponseToLog: MapBackendResponseToLog;

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
   * Functions that describe the `toMatchScreenshot` assert (in `expect`).
   */
  matchScreenshot: MatchScreenshotConfig<TestMeta>;

  /**
   * The maximum number of retries to run a test with the command
   * `your-project/autotests/bin/runDocker.sh` (until the test passes).
   * For example, if it is equal to three, the test will be run no more than three times.
   */
  maxRetriesCountInDocker: number;

  /**
   * Default timeout for navigation to url (`navigateToPage`, `navigateToUrl` actions) in milliseconds.
   */
  navigationTimeout: number;

  /**
   * If not `null`, then this value will override fields of internal Playwright config.
   */
  overriddenConfigFields: PlaywrightTestConfig | null;

  /**
   * Timeout (in millisecond) for the entire pack of tests (tasks).
   * If the test pack takes longer than this timeout, the pack will fail with the appropriate error.
   */
  packTimeout: number;

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
   * Regroup tree of test steps in the HTML report.
   * A function that regroups the tree of test steps in the report.
   * This way, you can leave only the important test steps (actions, checks) at the top level,
   * while hiding minor technical steps at deeper levels of the tree
   * (they will be visible in the report if you explicitly expand them).
   */
  regroupSteps: (this: void, steps: readonly LogEvent[]) => readonly LogEvent[];

  /**
   * The name of the file under which, after running the tests,
   * the HTML report will be saved in the `autotests/reports` directory, for example, `report.html`.
   * Also this name is used as the title of the report page.
   * If `null`, the report will not be saved.
   */
  reportFileName: string | null;

  /**
   * Interval (in milliseconds) for reading resource usage (CPU and memory).
   * The read values are immediately printed in the logs.
   */
  resourceUsageReadingInternal: number;

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
   * `fs.glob` from `nodejs` is used for matching globs.
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
   * `userAgent` string of browser (device) in tests.
   */
  userAgent: string;

  /**
   * Height of viewport of page in pixels.
   */
  viewportHeight: number;

  /**
   * Width of viewport of page in pixels.
   */
  viewportWidth: number;

  /**
   * Returns how many milliseconds `e2ed` should wait before running test (for retries).
   */
  waitBeforeRetry: (
    this: void,
    options: Readonly<{
      previousError: string | undefined;
      retryIndex: number;
      status: TestRunStatus;
      testStaticOptions: TestStaticOptions<TestMeta>;
    }>,
  ) => MaybePromise<number>;

  /**
   * Group of settings for the `waitForAllRequestsComplete` function.
   */
  waitForAllRequestsComplete: Readonly<{
    /**
     * Default maximum interval (in milliseconds) between requests.
     * If there are no new requests for more than this interval, then the promise
     * returned by the `waitForAllRequestsComplete` function will be successfully resolved.
     * This parameter can be overridden on a specific page instance.
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
   * Default timeout (in milliseconds) for `waitForRequest`/`waitForRequestToRoute` functions.
   * If the wait is longer than this timeout, then the promise
   * returned by the `waitForRequest`/`waitForRequestToRoute` function will be rejected.
   */
  waitForRequestTimeout: number;

  /**
   * Default timeout (in milliseconds) for `waitForResponse`/`waitForResponseToRoute` functions.
   * If the wait is longer than this timeout, then the promise
   * returned by the `waitForResponse`/`waitForResponseToRoute` function will be rejected.
   */
  waitForResponseTimeout: number;
}>;
