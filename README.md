# e2ed

[![NPM version][npm-image]][npm-url]
[![code style: prettier][prettier-image]][prettier-url]
[![TypeScript][typescript-image]][typescript-url]
[![Conventional Commits][conventional-commits-image]][conventional-commits-url]
[![License MIT][license-image]][license-url]

E2E utils for [TestCafe](https://testcafe.io/).

## Install

Requires `node@14` or higher:

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

And run tests for `https://google.com` in docker:

```sh
E2ED_ORIGIN=https://google.com ./e2ed/bin/runDocker.sh
```

### Environment variables

`E2ED_ORIGIN`: origin-part of the url (`protocol` + `host`) on which the tests will be run. For example, `https://google.com`.

`E2ED_SHOW_LOGS`: show detailed logs of test runs if this variable is not empty.

`E2ED_API_ORIGIN`: origin-part of the backend API url that can be used by tests to create and delete test entities.

`E2ED_IS_DOCKER_RUN`: when run in docker the `e2ed` sets this variable to `"true"`.

`E2ED_IS_LOCAL_RUN`: when run local the `e2ed` sets this variable to `"true"`.

`E2ED_DOCKER_IMAGE`: name of the docker image used to run tests with the `your-project/e2ed/bin/runDocker.sh` command
(`e2ed` by default).

`E2ED_DOCKER_CONCURRENCY`: the number of browser windows in which tests with the `your-project/e2ed/bin/runDocker.sh`
command will run in parallel (maximum value 50, 5 by default).

`E2ED_DOCKER_RETRIES`: the maximum number of retries to run a failing test with the `your-project/e2ed/bin/runDocker.sh`
command (maximum value 10, 5 by default). For example, if it is equal to three, the test will be run no more than three times.

`E2ED_NAVIGATE_STABILIZATION_INTERVAL`: after navigating to the page, `e2ed` will wait until
the page is stable for the specified time in milliseconds (maximum value 60000, 2000 by default).

## License

[MIT][license-url]

[conventional-commits-image]: https://img.shields.io/badge/Conventional_Commits-1.0.0-yellow.svg 'Conventional Commits'
[conventional-commits-url]: https://conventionalcommits.org
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg 'The MIT License'
[license-url]: https://github.com/uid11/e2ed/blob/main/LICENSE
[npm-image]: https://img.shields.io/npm/v/e2ed.svg 'e2ed'
[npm-url]: https://www.npmjs.com/package/e2ed
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg 'Prettier code style'
[prettier-url]: https://github.com/prettier/prettier
[typescript-image]: https://img.shields.io/badge/TypeScript-full-brightgreen 'Full TypeScript support'
[typescript-url]: https://www.typescriptlang.org/
