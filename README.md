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
(or other scenarios) In an arbitrary browser inside a docker container.
Tests are written in TypeScript, using explicit dependencies and the concept of page objects.
After the run, a detailed html report and a summary in JSON format is generated.

## Install

Requires [node](https://nodejs.org/en/) version 16 or higher:

```sh
npm install e2ed --save-dev
```

## Usage

### CLI

First create the necessary initial structure of directories and files in the project,
with a sample test and pageObject (all the code related to `e2ed`
will be in the `e2ed` directory in the root of the project):

```sh
npx e2ed-init
```

Then run tests locally for `https://google.com`:

```sh
E2ED_ORIGIN=https://google.com npx e2ed
```

### Docker

You can download the latest `e2ed` docker image from https://hub.docker.com/r/e2edhub/e2ed:

```sh
docker pull e2edhub/e2ed
```

And run tests for `https://google.com` in docker container:

```sh
E2ED_ORIGIN=https://google.com ./e2ed/bin/runDocker.sh
```

### Config

The config is defined in the file `e2ed/config.ts`.
You can locally override some config fields in an `e2ed/overrideConfig.ts` file that is not included in the repository.

#### Base config fields

`concurrency: number`: the number of browser windows in which tests will run in parallel.

`liteReportFileName: string | null`: the name of the file under which, after running the tests,
the lite JSON report will be saved in the `e2ed/reports` directory, for example, `lite-report.json`.
If `null`, the lite report will not be saved.

`maxRetriesCountInDocker: number`: the maximum number of retries to run a test with the command
`your-project/e2ed/bin/runDocker.sh` (until the test passes).
For example, if it is equal to three, the test will be run no more than three times.

`packTimeout: number`: timeout (in millisecond) for the entire pack of tests (tasks).
If the test pack takes longer than this timeout, the pack will fail with the appropriate error.

`pageStabilizationInterval: number`: after navigating to the page, `e2ed` will wait until
the page is stable for the specified time in millisecond, and only after that it will consider the page loaded.
This parameter can be overridden on a specific page instance.

`printTestLogsInConsole: boolean`: if true, print test logs to the console (literally in console.log).

`reportFileName: string | null`: the name of the file under which, after running the tests,
the HTML report will be saved in the `e2ed/reports` directory, for example, `report.html`.
Also this name is used as the title of the report page.
If `null`, the report will not be saved.

`skipTests: SkipTests`: this setting allows you to describe a set of skipped tests in a custom form.
You can define the `SkipTests` type and `skipTests` processing rules in the hook `e2ed/hooks/isTestSkipped.ts`.

`testIdleTimeout: number`: timeout (in milliseconds) for each individual test step.
If the test step (interval between two `log` function calls) takes longer than this timeout,
the test fails and rerun on the next retry.
This parameter can be overridden in the test-specific options.

`testLogsFileName: string | null`: the name of the file under which, after running the tests,
the test logs will be saved in the `e2ed/reports` directory, for example, `test-logs.log`.
If `null`, the report will not be saved.

`testTimeout: number`: timeout (in milliseconds) for each individual test run.
If the test run takes longer than this timeout, the test fails and rerun on the next retry.
This parameter can be overridden in the test-specific options.

`waitForRequestTimeout: number`: default timeout (in milliseconds) for waitForRequest function.
If the wait is longer than this timeout, then the promise returned by the waitForRequest function is rejected.

`waitForResponseTimeout: number`: default timeout (in milliseconds) for waitForResponse function.
If the wait is longer than this timeout, then the promise returned by the waitForResponse function is rejected.

### Environment variables

`E2ED_ORIGIN`: origin-part of the url (`protocol` + `host`) on which the tests will be run. For example, `https://google.com`.

`E2ED_DEBUG`: run e2ed in nodejs-debug mode (`--inspect-brk=0.0.0.0`) if this variable is not empty.

`E2ED_DOCKER_DEBUG_PORT`: debug port when run in docker (9229 by default).

`E2ED_DOCKER_DO_AFTER_TESTS`: the name of the executable file from the `e2ed/bin` directory that will be run (into container) after running the tests.

`E2ED_DOCKER_DO_BEFORE_TESTS`: the name of the executable file from the `e2ed/bin` directory that will be run (into container) before running the tests.

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
