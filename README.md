<img alt="e2ed logo" src="https://raw.github.com/joomcode/e2ed/main/logo.svg?sanitize=true">

# e2ed

[![NPM version][npm-image]][npm-url]
[![code style: prettier][prettier-image]][prettier-url]
[![TypeScript][typescript-image]][typescript-url]
[![Contributor Covenant][code-of-conduct-image]][code-of-conduct-url]
[![Conventional Commits][conventional-commits-image]][conventional-commits-url]
[![License MIT][license-image]][license-url]

E2E testing framework over [TestCafe](https://testcafe.io/).

`e2ed` is designed to quickly parallel run a large number of independent atomic tests
(or others tasks) in an arbitrary browser inside a docker container.
Tests are written in TypeScript, using explicit dependencies and the concept of page objects.
After the run, a detailed HTML report and a summary lite report in JSON format are generated.

## Adding e2ed to a project

Prerequisites: [node](https://nodejs.org/en/) >=16,
[TypeScript](https://www.typescriptlang.org/) >=4.8.

All commands below are run from the root directory of the project.

### Install

Install the latest version of `e2ed` in devDependencies with the exact version:

```sh
npm install e2ed --save-dev --save-exact
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

After that you can run pack with tests in the project locally (sample tests are run on `google.com`):

```sh
E2ED_ORIGIN=https://google.com npx e2ed ./autotests/packs/allTests.ts
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

To run pack with tests locally for `https://google.com`:

```sh
E2ED_ORIGIN=https://google.com npx e2ed ./autotests/packs/allTests.ts
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
E2ED_ORIGIN=https://google.com npm run e2ed:allTests
```

Also, when running locally, you can pass additional
[TestCafe-supported](https://testcafe.io/documentation/402639/reference/command-line-interface)
command-line arguments, such as the path to a specific test file from a pack, to run just that test:

```sh
E2ED_ORIGIN=https://google.com npm run e2ed:allTests ./autotests/tests/main/exists.ts
```

### Run in docker

You can download the latest `e2ed` docker image from https://hub.docker.com/r/e2edhub/e2ed:

```sh
docker pull e2edhub/e2ed
```

And run tests for `https://google.com` in docker container:

```sh
E2ED_ORIGIN=https://google.com ./autotests/bin/runDocker.sh ./autotests/packs/allTests.ts
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
E2ED_ORIGIN=https://google.com npm run e2ed:docker:allTests
```

### Personal local pack for development

You can add your local pack with custom settings for developing tests
that will not be stored in the repository, under the name `local.ts` in directory `autotests/packs`
(it's already [listed](autotests/.gitignore#L1) in `.gitignore`).

This pack might look like this:

```ts
import {pack as allTestsPack} from './allTests';

import type {Pack} from 'autotests/types/pack';

/**
 * Pack from .gitignore for local development.
 */
export const pack: Pack = {
  ...allTestsPack,
  browserInitTimeout: 40_000,
};
```

The `npx e2ed-init` command is already creating such a file as an example.

### How to debug tests

For debugging tests, the local run of the pack is intended.

For example, you can use the `debug` action from `e2ed/actions` in the test code:

```ts
await debug();
```

When calling the `debug` action, TestCafe will stop the test execution and enter
the [debug-mode](https://testcafe.io/documentation/402639/reference/command-line-interface?search#-d---debug-mode).

In this mode, using the buttons on the TestCafe panel built into the bottom of the page,
you can proceed to the next action (an action is considered to be a call of `action` or
a call of the `expect`), and between actions you can inspect the page using browser's DevTools
by opening them as usual (before that, you need to unlock the page with tests using the button
on the same panel — without this, the page will not respond to the keyboard and mouse).

After debugging is complete, remember to remove the call of the `debug` action.

In addition, when run pack locally tests can be debugged using the usual `nodejs` debugging flags
(`--inspect-brk`, `--inspect`), as `nodejs` application (for brevity, we omit the setting of
environment variables before commands):

```sh
npm run e2ed:allTests ./autotests/tests/main/exists.ts -- --inspect-brk
```

You can use the `debugger` instruction to stop execution at the desired line.

Or you can set any non-empty value to the `E2ED_DEBUG` environment variable,
which will also run `e2ed` in `nodejs` debug mode
(this is equivalentto passing the `--inspect-brk` flag):

```sh
E2ED_DEBUG=true npm run e2ed:allTests ./autotests/tests/main/exists.ts
```

`E2ED_DEBUG` also works for run in docker, and allows you to connect a debugger
to the `e2ed` running in docker container.

Finally, TestCafe itself has flags `--debug-mode` and `--debug-on-fail` for
[debug-mode](https://testcafe.io/documentation/402639/reference/command-line-interface?search#-d---debug-mode)
and [debug-on-fail](https://testcafe.io/documentation/402639/reference/command-line-interface?search#--debug-on-fail)
modes that call up the debug panel (either immediately when the test is run or when the test fails)
and allow you to open browser's DevTools:

```sh
npm run e2ed:allTests ./autotests/tests/main/exists.ts -- --debug-on-fail
```

### Basic fields of pack config

The [pack](autotests/packs/allTests.ts) is a single `ts` file
that exports the pack's config under the name `pack`.

Here are the basic fields of the pack config.

`browser: string`: browser name as a command to launch it
(like `chrome`, `chromium`, `firefox`, `webkit`, etc).

`browserFlags: string[]`: array of browser flags, like `--disable-dev-shm-usage`,
with which the browser is launched to run tests.

`concurrency: number`: the number of browser windows in which tests will run in parallel.

`customPackProperties: CustomPackProperties`: a custom set of fields defined within the project.
These fields allow, for example, to customize the behavior of hooks for different packs.

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

`dockerImage: string`: the name of the docker image where the tests will run.
The image must be based on the e2ed base image.

`enableChromeDevToolsProtocol: boolean`: enables [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
for browser control in tests (instead of `testcafe-hammerhead`).

`enableHeadlessMode: boolean`: enables headless mode (if browser supports such mode).

`enableMobileDeviceMode: boolean`: enables Chromium [mobile device mode](https://developer.chrome.com/docs/devtools/device-mode).

`enableTouchEventEmulation: boolean`: enables touch event emulation.
If `true`, page fires `touch` events when test interact with the page (instead of `click` events).

`filterTestsIntoPack: (testStaticOptions: TestStaticOptions<TestMeta>) => boolean`: this function
filters tests (tasks) by their static options —
only those tests for which the function returned `true` get into the pack.

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

`maxRetriesCountInDocker: number`: the maximum number of retries to run a test with the command
`your-project/autotests/bin/runDocker.sh` (until the test passes).
For example, if it is equal to three, the test will be run no more than three times.

`overriddenUserAgent: string | null`: if not `null`, then this value will override the browser's user agent in tests.

`packTimeout: number`: timeout (in millisecond) for the entire pack of tests (tasks).
If the test pack takes longer than this timeout, the pack will fail with the appropriate error.

`pageStabilizationInterval: number`: after navigating to the page, `e2ed` will wait until
the page is stable for the specified time in millisecond, and only after that it will consider the page loaded.
This parameter can be overridden on a specific page instance.

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
https://www.npmjs.com/package/globby is used for matching globs.

`testIdleTimeout: number`: timeout (in milliseconds) for each individual test step.
If the test step (interval between two `log` function calls) takes longer than this timeout,
the test fails and rerun on the next retry.
This parameter can be overridden in the test-specific options.

`testTimeout: number`: timeout (in milliseconds) for each individual test run.
If the test run takes longer than this timeout, the test fails and rerun on the next retry.
This parameter can be overridden in the test-specific options.

`viewportHeight: number`: height of viewport of page in pixels.

`viewportWidth: number`: width of viewport of page in pixels.

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

`E2ED_ORIGIN`: origin-part of the url (`protocol` + `host`) on which the tests will be run. For example, `https://google.com`.

`E2ED_DEBUG`: run e2ed in `nodejs` debug mode (`--inspect-brk=0.0.0.0`) if this variable is not empty.

`E2ED_DOCKER_DEBUG_PORT`: debug port when run in docker (9229 by default).

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
