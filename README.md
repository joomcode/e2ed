![e2ed logo](https://raw.githubusercontent.com/joomcode/e2ed/main/logo.svg)

# e2ed

[![NPM version][npm-image]][npm-url]
[![code style: prettier][prettier-image]][prettier-url]
[![TypeScript][typescript-image]][typescript-url]
[![Contributor Covenant][code-of-conduct-image]][code-of-conduct-url]
[![Conventional Commits][conventional-commits-image]][conventional-commits-url]
[![License MIT][license-image]][license-url]

E2E testing framework over [Playwright](https://playwright.dev/).

`e2ed` is designed to quickly parallel run a large number of independent atomic tests
(or others tasks) in an arbitrary browser inside a docker container.
Tests are written in TypeScript, using explicit dependencies and the concept of page objects.
After the run, a detailed HTML report and a summary lite report in JSON format are generated.

## Adding e2ed to a project

Prerequisites: [node](https://nodejs.org/en/) >=22,
[TypeScript](https://www.typescriptlang.org/) >=5.

All commands below are run from the root directory of the project.

### Install

Install the latest version of `e2ed` in devDependencies with the exact version:

```sh
npm install e2ed --save-dev --save-exact
```

Install [Playwright](https://playwright.dev/) [browsers](https://playwright.dev/docs/browsers)
(only `Chromium` for now):

```sh
npx e2ed-install-browsers
```

### Initialize

Initialize `e2ed` in the project; this will add an `autotests` directory
with working sample tests and pageObject-s to the project:

```sh
npx e2ed-init
```

All the code related to `e2ed` will be in the `autotests` directory in the root of the project.

### Add to TypeScript config

[Add](tsconfig.json#L36) the `autotests` directory in field `include` of the project's `tsconfig.json`
in the form `"./autotests/**/*.ts"`, to make type checking work in the tests code:

```json
  "include": [
    "./autotests/**/*.ts",
    "..."
  ],
```

### Re-map imports

Also [add](tsconfig.json#L21-L24) the re-map of imports from the `autotests` directory in field `paths`
of the project's `tsconfig.json`, to use bare imports from the `autotests` directory
(`import {...} from 'autotests/...';`):

```json
  "paths": {
    "autotests": ["./autotests/index.ts"],
    "autotests/*": ["./autotests/*"]
  },
```

It is assumed here that the `baseUrl` field is not specified in the project's `tsconfig.json`,
or that the `baseUrl` is specified as `"baseUrl": "."`.

If, for example, `baseUrl` is equal to `./src`, then it will be necessary
to correct the path to `autotests` directory accordingly:

```json
  "paths": {
    "autotests": ["../autotests/index.ts"],
    "autotests/*": ["../autotests/*"]
  },
```

After that you can run pack with tests in the project locally (sample tests are run on `bing.com`):

```sh
E2ED_ORIGIN=https://bing.com npx e2ed ./autotests/packs/allTests.ts
```

Now you can edit tests, pageObject-s and other files in the `autotests` directory as you need.

## Usage

### Pack

`e2ed` always runs packs of tests (or tasks), one pack at a time.
A [pack](autotests/packs/allTests.ts) is a set of tests (tasks) with their run config,
described in one file. `e2ed` takes one mandatory argument — the path
to the pack (absolute or relative to the current directory,
which should be the root directory of the project).

Packs are usually stored in the `autotests/packs` directory.

### Run local

To run pack with tests locally for `https://bing.com`:

```sh
E2ED_ORIGIN=https://bing.com npx e2ed ./autotests/packs/allTests.ts
```

For convenience, you can add a command to run concrete pack in the `scripts` field
of the `package.json`:

```json
  "scripts": {
    "e2ed:allTests": "e2ed ./autotests/packs/allTests.ts",
    "..."
  },
```

After that, you can run the pack like this:

```sh
E2ED_ORIGIN=https://bing.com npm run e2ed:allTests
```

Also, when running locally, you can pass additional
command-line arguments, such as the path to a specific test file from a pack, to run just that test:

```sh
E2ED_ORIGIN=https://bing.com npm run e2ed:allTests ./autotests/tests/main/exists.ts
```

### Run in docker

You can download the latest `e2ed` docker image from https://hub.docker.com/r/e2edhub/e2ed:

```sh
docker pull e2edhub/e2ed
```

And run tests for `https://bing.com` in docker container:

```sh
E2ED_ORIGIN=https://bing.com ./autotests/bin/runDocker.sh ./autotests/packs/allTests.ts
```

For convenience, you can add a command to run concrete pack in docker in the `scripts` field
of the `package.json`:

```json
  "scripts": {
    "e2ed:docker:allTests": "./autotests/bin/runDocker.sh ./autotests/packs/allTests.ts",
    "..."
  },
```

After that, you can run the pack in docker like this:

```sh
E2ED_ORIGIN=https://bing.com npm run e2ed:docker:allTests
```

### Personal local pack for development

You can add your local pack with custom settings for developing tests
that will not be stored in the repository, under the name `local.ts` in directory `autotests/packs`
(it's already [listed](autotests/.gitignore#L1) in `.gitignore`).

This pack might look like this:

```ts
import {pack as allTestsPack} from './allTests';

import type {Pack} from 'autotests/configurator';

/**
 * Pack from .gitignore for local development.
 */
export const pack: Pack = {
  ...allTestsPack,
  testIdleTimeout: 10_000,
};
```

The `npx e2ed-init` command is already creating such a file as an example.

### How to debug tests

For debugging tests, the local run of the pack is intended.

For example, you can use the `pause` action from `e2ed/actions` in the test code:

```ts
await pause();
```

When calling the `pause` action, `e2ed` will stop the test execution and enter
the debug-mode.

After debugging is complete, remember to remove the call of the `pause` action.

[pause](https://playwright.dev/docs/api/class-page#page-pause) is a function of the `Playwright` itself.

In addition, you can set any non-empty value to the `E2ED_DEBUG` environment variable,
which will also run `e2ed` in debug mode. If this variable has the form `inspect-brk:9229`,
then additionally `nodejs` debugging is started on port `9229` (via `--inspect-brk=9229`):

```sh
E2ED_DEBUG=true npm run e2ed:allTests ./autotests/tests/main/exists.ts
```

```sh
E2ED_DEBUG=inspect-brk:8230 npm run e2ed:allTests ./autotests/tests/main/exists.ts
```

`E2ED_DEBUG` also works for run in docker, and allows you to connect a debugger
to the `e2ed` running in docker container.

When developing a test, you can run it in [UI-mode](https://playwright.dev/docs/test-ui-mode)
by passing the `--ui` parameter (for local run only):

```sh
npm run e2ed:allTests ./autotests/tests/main/exists.ts -- --ui
```

As a result, `Playwright` will launch its [UI-mode](https://playwright.dev/docs/test-ui-mode),
allowing you to quickly rerun tests and see errors.

### Basic fields of pack config

The [pack](autotests/packs/allTests.ts) is a single `ts` file
that exports the pack's config under the name `pack`.

Here are the basic fields of the pack config.

`addLogsWithTags: readonly LogTag[]`: array of additional log tags. Logs with a specific tag
(in `logTag` field) will be added only if their tag is specified in this array.

`browserFlags: string[]`: array of browser flags, like `--disable-dev-shm-usage`,
with which the browser is launched to run tests.

`browserName: BrowserName`: browser name (one of `chromium`, `firefox`, `webkit`).

`concurrency: number`: the number of browser windows in which tests will run in parallel.

`customPackProperties: CustomPackProperties`: a custom set of fields defined within the project.
These fields allow, for example, to customize the behavior of hooks for different packs.

`deviceScaleFactor: number`: device scale factor (aka `window.devicePixelRatio`).

`doAfterPack: ((liteReport: LiteReport) => CustomReportProperties | undefined)[]`:
an array of functions that will be executed, in order, after the pack completes.
The functions accept a lite report object, and can return custom report properties,
which in this case will be included in the lite report.
Each function can thus access the results of the previous function.

`doBeforePack: ((startInfo: StartInfo) => FullPackConfig | undefined)[]`:
an array of functions that will be executed, in order, before the pack starts.
The functions accept a start info object, and can return new full pack config,
which in this case will be included in the start info object, and will be used for running pack.
Each function can thus access the results of the previous function.

`enableCsp: boolean`: enables Content-Security-Policy checks in browser.

`enableHeadlessMode: boolean`: enables headless mode (if browser supports such mode).

`enableMobileDeviceMode: boolean`: enables Chromium [mobile device mode](https://developer.chrome.com/docs/devtools/device-mode).

`enableTouchEventEmulation: boolean`: enables touch event emulation.
If `true`, page fires `touch` events when test interact with the page (instead of `click` events).

`filterTestsIntoPack: (testStaticOptions: TestStaticOptions<TestMeta>) => boolean`: this function
filters tests (tasks) by their static options —
only those tests for which the function returned `true` get into the pack.

`fullMocks: FullMocks | null`: functions that specify the "full mocks" functionality.

`getTestNamePrefixInUiMode: (testOptions: TestOptions<TestMeta>) => string`: get prefix for test name in UI mode by test options.

`liteReportFileName: string | null`: the name of the file under which, after running the tests,
the lite JSON report will be saved in the `autotests/reports` directory, for example, `lite-report.json`.
If `null`, the lite report will not be saved.

`logFileName: string | null`: the name of the file under which, after running the tests,
the pack logs will be saved in the `autotests/reports` directory, for example, `pack-logs.log`.
If `null`, the log will not be saved.

`mapBackendResponseErrorToLog: (response: Response) => Payload | undefined`: maps responses
with errors from the backend to "red" logs (as errors) during the test.
It is assumed that the function will select responses with statuse codes
of 400 and higher (client and server errors).
Backend responses with errors are accumulated in separate "red" log step (with `logEventStatus: 'failed'`).
Log the `responseBody` field carefully, as the body of backend response can be very large.
If the function returns `undefined`, the response is not logged (skipped).

`mapBackendResponseToLog: (response: Response) => Payload | undefined`: maps responses
from the backend to logs during the test.
Backend responses received during a certain test step are accumulated
in an array in the `backendResponses` field of the log of this step.
Log the `responseBody` field carefully, as the body of backend response can be very large.
If the function returns `undefined`, the response is not logged (skipped).

`mapLogPayloadInConsole: (message: string, payload: LogPayload | undefined, logEventType?: LogEventType)
=> LogPayload | 'skipLog' | undefined`: maps log payload for logging in console to clarify,
shorten or skip a console log entry.
If the mapping returns `'skipLog'`, the log entry is skipped.
If the mapping returns `undefined`, the log entry is not skipped, but is printed with an empty payload.

`mapLogPayloadInLogFile: (message: string, payload: LogPayload | undefined, logEventType?: LogEventType)
=> LogPayload | 'skipLog' | undefined`: maps log payload for logging in file to clarify,
shorten or skip a file log entry.
If the mapping returns `'skipLog'`, the log entry is skipped.
If the mapping returns `undefined`, the log entry is not skipped, but is printed with an empty payload.

`mapLogPayloadInReport: (message: string, payload: LogPayload | undefined, logEventType?: LogEventType)
=> LogPayload | null | undefined`: maps log payload for logging step in HTML report and lite report to clarify,
shorten or skip a report step.
If the mapping returns `null`, the step is skipped.
If the mapping returns `undefined`, the log entry is not skipped, but is printed with an empty payload.

`matchScreenshot: MatchScreenshot`: functions that describe the `toMatchScreenshot` assert (in `expect`).

`maxRetriesCountInDocker: number`: the maximum number of retries to run a test with the command
`your-project/autotests/bin/runDocker.sh` (until the test passes).
For example, if it is equal to three, the test will be run no more than three times.

`navigationTimeout: number`: default timeout for navigation to url
(`navigateToPage`, `navigateToUrl` actions) in milliseconds.

`overriddenConfigFields: PlaywrightTestConfig | null`: if not `null`, then this value will override
fields of internal `Playwright` config.

`packTimeout: number`: timeout (in millisecond) for the entire pack of tests (tasks).
If the test pack takes longer than this timeout, the pack will fail with the appropriate error.

`pathToScreenshotsDirectoryForReport: string | null`: path to the directory where screenshots
will be stored for displaying them in the HTML report.
This path must be either relative (from the HTML report file) or absolute (i.e. with http/https protocol).
The screenshot directory should be served by the web server with appropriate headers,
like a normal static directory. The `autotests/reports/screenshots` directory from the project
should be copied to this directory after the pack is completed,
and then screenshots from this directory will be displayed in the HTML report.
If `null`, screenshots will not be displayed in the HTML report.

`reportFileName: string | null`: the name of the file under which, after running the tests,
the HTML report will be saved in the `autotests/reports` directory, for example, `report.html`.
Also this name is used as the title of the report page.
If `null`, the report will not be saved.

`skipTests: SkipTests`: this setting allows you to describe a set of skipped tests in a custom form.
You can define the `SkipTests` type and `skipTests` processing rules in the hook `autotests/hooks/isTestSkipped.ts`.

`takeFullPageScreenshotOnError: boolean`: if `true`, then takes a screenshot of the full page
(not just the viewport) at the time of the test error, for display in the HTML report.

`takeViewportScreenshotOnError: boolean`: if `true`, then takes a screenshot of the page viewport
at the time of the test error, for display in the HTML report.

`testFileGlobs: readonly string[]`: an array of globs with pack test (task) files.
`fs.glob` from `nodejs` is used for matching globs.

`testIdleTimeout: number`: timeout (in milliseconds) for each individual test step.
If the test step (interval between two `log` function calls) takes longer than this timeout,
the test fails and rerun on the next retry.
This parameter can be overridden in the test-specific options.

`testTimeout: number`: timeout (in milliseconds) for each individual test run.
If the test run takes longer than this timeout, the test fails and rerun on the next retry.
This parameter can be overridden in the test-specific options.

`userAgent: string`: `userAgent` string of browser (device) in tests.

`viewportHeight: number`: height of viewport of page in pixels.

`viewportWidth: number`: width of viewport of page in pixels.

`waitBeforeRetry: (options: Options) => number`: returns how many milliseconds `e2ed`
should wait before running test (for retries).

`waitForAllRequestsComplete.maxIntervalBetweenRequestsInMs: number`: default maximum interval
(in milliseconds) between requests for `waitForAllRequestsComplete` function.
If there are no new requests for more than this interval, then the promise
returned by the `waitForAllRequestsComplete` function will be successfully resolved.

`waitForAllRequestsComplete.timeout: number`: default timeout (in milliseconds) for `waitForAllRequestsComplete` function.
If the wait is longer than this timeout, then the promise
returned by the `waitForAllRequestsComplete` function will be rejected.

`waitForInterfaceStabilization.stabilizationInterval: number`: default stabilization interval for `waitForInterfaceStabilization` function.

`waitForInterfaceStabilization.timeout: number`: default timeout (in milliseconds) for `waitForInterfaceStabilization` function.
If the wait is longer than this timeout, then the promise
returned by the `waitForInterfaceStabilization` function will be rejected.

`waitForRequestTimeout: number`: default timeout (in milliseconds) for `waitForRequest`/`waitForRequestToRoute` functions.
If the wait is longer than this timeout, then the promise returned by the `waitForRequest`/`waitForRequestToRoute` function will be rejected.

`waitForResponseTimeout: number`: default timeout (in milliseconds) for `waitForResponse`/`waitForResponseToRoute` functions.
If the wait is longer than this timeout, then the promise returned by the `waitForResponse`/`waitForResponseToRoute` function will be rejected.

### Environment variables

Required environment variables are defined in the `./autotests/variables.env` file (they cannot be deleted):

`E2ED_DOCKER_IMAGE`: the name of the docker image where the tests will run.
The image must be based on the `e2ed` base image.

`E2ED_PATH_TO_TS_CONFIG_OF_PROJECT_FROM_ROOT`: the path to TypeScript config file of the project
from the root directory of the project. The project should have one common TypeScript config
for both the application code and the autotest code.

You can pass the following optional environment variables to the `e2ed` process in any standard way:

`E2ED_ORIGIN`: origin-part of the url (`protocol` + `host`) on which the tests will be run. For example, `https://bing.com`.

`E2ED_DEBUG`: run `e2ed` in debug mode if this variable is not empty. If this variable has the form `inspect-brk:9229`,
then `nodejs` debugging is started on port `9229` (via `--inspect-brk=9229`).

`E2ED_TERMINATION_SIGNAL`: the termination signal received by the `e2ed` process (if any).
Typically this value is `'SIGUSR1'`.

`E2ED_TIMEOUT_FOR_GRACEFUL_SHUTDOWN_IN_SECONDS`: default timeout for "graceful shutdown" of `e2ed` process (in seconds).
If the variable is not set, the default value of `16` is used.

## License

[MIT][license-url]

[code-of-conduct-image]: https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg 'Contributor Covenant Code of Conduct'
[code-of-conduct-url]: CODE_OF_CONDUCT.md
[conventional-commits-image]: https://img.shields.io/badge/Conventional_Commits-1.0.0-yellow.svg 'The Conventional Commits specification'
[conventional-commits-url]: https://www.conventionalcommits.org/en/v1.0.0/
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg 'The MIT License'
[license-url]: LICENSE
[npm-image]: https://img.shields.io/npm/v/e2ed.svg 'e2ed'
[npm-url]: https://www.npmjs.com/package/e2ed
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg 'Prettier code formatter'
[prettier-url]: https://prettier.io/
[typescript-image]: https://img.shields.io/badge/types-TypeScript-blue.svg 'Full TypeScript support'
[typescript-url]: https://www.typescriptlang.org/
