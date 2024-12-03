# Changelog

## [v0.19.3](https://github.com/joomcode/e2ed/tree/v0.19.3) (2024-12-03)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.19.2...v0.19.3)

- [Merge pull request #97 from joomcode/fix/get-params-in-rerequests](https://github.com/joomcode/e2ed/commit/7a25b0e74f1c5a0e6c3767434ea8999fec7e7ae3) ([uid11](https://github.com/uid11))

  fix: ignore query parameters in re-requests

- [fix: ignore query parameters in re-requests](https://github.com/joomcode/e2ed/commit/ce968e0bc47d9c6f631bc9d158f0ada0a117468b) ([uid11](https://github.com/uid11))

## [v0.19.2](https://github.com/joomcode/e2ed/tree/v0.19.2) (2024-12-02)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.19.1...v0.19.2)

- [Merge pull request #96 from joomcode/fix/waitForAllRequestsComplete-rerequests](https://github.com/joomcode/e2ed/commit/60d338f30418b55a8f364ebeeae5e06d7e178b5f) ([uid11](https://github.com/uid11))

  fix: ingore re-requests with the same urls

- [FI-1557 fix: ingore all re-requests when `waitForAllRequestsComplete`](https://github.com/joomcode/e2ed/commit/18553b3f539aa362fa0d924fd821ba9518ee7aa5) ([uid11](https://github.com/uid11))

  tests: add tests of types for `mockWebSocketRoute`

  tests: add tests for `mockWebSocketRoute`

  fix: protocol in `WebSocketRoute.getUrl` method

  fix: types of request and response for `mockWebSocketRoute`

  fix: context in `onMessage` handler for `mockWebSocketRoute`

## [v0.19.1](https://github.com/joomcode/e2ed/tree/v0.19.1) (2024-11-28)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.19.0...v0.19.1)

- [Merge pull request #95 from joomcode/feat/add-mocks-for-web-sockets](https://github.com/joomcode/e2ed/commit/0f8b255c5f8c357a28171cfaa287d1801afff373) ([uid11](https://github.com/uid11))

  feat: add mocks for web sockets

- [chore: update `devDependencies` (TypeSript to 5.7, etc)](https://github.com/joomcode/e2ed/commit/549ae916d92925bd91199e654257d12cb99d6bd9) ([uid11](https://github.com/uid11))
- [FI-1557 fix: skip duplicated requests for `waitForAllRequestsComplete`](https://github.com/joomcode/e2ed/commit/148447539dc6586b9b647230783613c06eddef06) ([uid11](https://github.com/uid11))
- [FI-1534 feat: add `mockWebSocketRoute`/`unmockWebSocketRoute` actions](https://github.com/joomcode/e2ed/commit/28abc13d58e212e40dadd34d040a98f6b103bbc7) ([uid11](https://github.com/uid11))
- [FI-1512 fix: add pack option and page property `navigationTimeout`](https://github.com/joomcode/e2ed/commit/c41b3483b94308131f3339f3897fc5ab439f0352) ([uid11](https://github.com/uid11))

## [v0.19.0](https://github.com/joomcode/e2ed/tree/v0.19.0) (2024-11-19)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.16...v0.19.0)

- [Merge pull request #94 from joomcode/feat/support-for-multiple-windows](https://github.com/joomcode/e2ed/commit/06e36e4f6575764a9194a794dd3a8112c9ae6571) ([uid11](https://github.com/uid11))

  feat: support multiple tabs

- [FI-1434 fix: logs of actual values in `expect`'s assert functions](https://github.com/joomcode/e2ed/commit/457e51a83b2bcd3493b994a01ddd37561a2c1e22) ([uid11](https://github.com/uid11))

  chore: updat Playwright to 1.49.0

  chore: update devDependencies (`husky`, etc)

- [FI-1512 fix: add tests for `waitForAllRequestsComplete`](https://github.com/joomcode/e2ed/commit/f7da93c3d839367c875b2aa85a7420f131f2dea8) ([uid11](https://github.com/uid11))
- [FI-1512 feat: restore `waitForAllRequestsComplete` action](https://github.com/joomcode/e2ed/commit/6cac69fec661b5397969cd9956b963bf8a76a689) ([uid11](https://github.com/uid11))
- [FI-1506 fix: bin command `e2ed-install-browsers`](https://github.com/joomcode/e2ed/commit/5b1c35b01f7e9209d31f4f63aa249da4a0d70cf5) ([uid11](https://github.com/uid11))
- [FI-1434 feat: add links to `trace.zip` in HTML report](https://github.com/joomcode/e2ed/commit/aa1658a047a2f6ee002100ae2157fab630cb0275) ([uid11](https://github.com/uid11))
- [FI-1432 fix: Playwright timeout for test with `waitBeforeRetry`](https://github.com/joomcode/e2ed/commit/a3276ca831cdd68178f0a4b578e803e30cb24dcc) ([uid11](https://github.com/uid11))
- [FI-1434 feat: add links to `trace.zip` in HTML report](https://github.com/joomcode/e2ed/commit/da61cbacb23b6243462ea8bf2c91be28a97caa43) ([uid11](https://github.com/uid11))
- [FI-1476 feat: add actions for switching tabs](https://github.com/joomcode/e2ed/commit/321866c7178fc37218201f3e1976e87fce968d0d) ([uid11](https://github.com/uid11))

  tests: add tests for `waitForStartOfPageLoad` action

  fix: `waitForStartOfPageLoad` first call

  fix: add logs to `waitForStartOfPageLoad` actoin

  fix: add logs to actions for switching tabs

- [FI-1434 feat: add action `waitForStartOfPageLoad`](https://github.com/joomcode/e2ed/commit/90e2d7748e4bfd6c45cddc21fc09fc1ef01c9063) ([uid11](https://github.com/uid11))

## [v0.18.16](https://github.com/joomcode/e2ed/tree/v0.18.16) (2024-11-03)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.15...v0.18.16)

- [Merge pull request #93 from joomcode/feat/support-waitings-before-retries](https://github.com/joomcode/e2ed/commit/c68c9c423f6fb2cc59b5045894401f9367580e62) ([uid11](https://github.com/uid11))

  feat: support waitings before retries

- [chore: update Playwright to 1.48.2](https://github.com/joomcode/e2ed/commit/33278fa98750915a3cc2747fb53c60db96901b49) ([uid11](https://github.com/uid11))

  chore: update `@types/node`

- [FI-1506 feat: add bin-command `e2ed-install-browsers`](https://github.com/joomcode/e2ed/commit/058fb2a2b33e672a294e28077eda4c34fd1ec4a4) ([uid11](https://github.com/uid11))
- [FI-1485 fix: `waitForRequestToRoute` when `routeParams` = `undefined`](https://github.com/joomcode/e2ed/commit/d15265ca49effbf1d1d895638dc85cbaefd3fe89) ([uid11](https://github.com/uid11))
- [FI-1484 feat: rename `getParamsFromUrl` to `getParamsFromUrlOrThrow`](https://github.com/joomcode/e2ed/commit/1b32763ee8f13d8ba8d400b1545825d871ed3da2) ([uid11](https://github.com/uid11))

  fix: test timeout and interrupt timeout during `waitBeforeRetry`

- [FI-1498 feat: `pressKey` can receive selector](https://github.com/joomcode/e2ed/commit/0ae2c510e397f788530d3a49446e51a174550060) ([uid11](https://github.com/uid11))
- [FI-1432 feat: support waitings before retries](https://github.com/joomcode/e2ed/commit/b042b435a99bf5b69a987cc8b922d6af3022b916) ([uid11](https://github.com/uid11))

  fix: remove references on TestCafe

  fix: set actual timeout of tests for Playwright engine

  fix: turn off unnecessary rule `@typescript-eslint/consistent-return`

  feat: add `documentUrl` argument to `assertPage` method of pages

  fix: restore `fullMocks` fixture for internal test of "full mocks"

## [v0.18.15](https://github.com/joomcode/e2ed/tree/v0.18.15) (2024-10-17)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.14...v0.18.15)

- [Merge pull request #92 from joomcode/fix/setmessage-error-in-ui-mode](https://github.com/joomcode/e2ed/commit/43ec29a938762223c7881c95a17b1c4c350d7349) ([uid11](https://github.com/uid11))

  fix: `error.setMessage` method in UI-mode

- [FI-1471 fix: `error.setMessage` method in UI-mode](https://github.com/joomcode/e2ed/commit/0868f8d8a58223ddbf05e19aed366d619669d6a8) ([uid11](https://github.com/uid11))

  refactor: turn on `--isolatedDeclarations` TypeScript option

  chore: update Playwright to 1.48.1

  chore: update TypeScript to 5.6.3 and other `devDependencies`

  fix: remove `createSelectorByCss` function and `htmlElementSelector` from API

  fix: supports regexps in `withText` method of `Selector`

  FI-1477 feat: add action `selectOption`

## [v0.18.14](https://github.com/joomcode/e2ed/tree/v0.18.14) (2024-10-05)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.13...v0.18.14)

- [Merge pull request #91 from joomcode/fix/new-locators](https://github.com/joomcode/e2ed/commit/7e72fd0af1c9714fc1bfed5d41b1888a803bf8a0) ([uid11](https://github.com/uid11))

  fix: using of new locators

- [FI-1424 fix: sort tests by status in HTML report](https://github.com/joomcode/e2ed/commit/32b776d8f9b6a8a5d7a8662495a14d334021c048) ([uid11](https://github.com/uid11))

  feat: add util `assertType`

- [fix: add locators to client code of HTML report](https://github.com/joomcode/e2ed/commit/84f6438b08458aedb22aaaacc68977a5f2f50b10) ([uid11](https://github.com/uid11))
- [FI-653 feat: assert page url at the end of `navigateToPage`](https://github.com/joomcode/e2ed/commit/c1528378f4d53a548fbc64b57306a3fdd35f00a8) ([uid11](https://github.com/uid11))
- [fix: using of new locators](https://github.com/joomcode/e2ed/commit/42759561e141749567fb7c1d8b2409599b06599a) ([uid11](https://github.com/uid11))

  tests: restore selectorCustomMethods test

  fix: do not throw in `getRequestFromPlaywrightRequest` for invalid JSON

  chore: update devDependencies (`eslint`, `@types/node`, etc)

  chore: update `create-locator` to 0.0.25

## [v0.18.13](https://github.com/joomcode/e2ed/tree/v0.18.13) (2024-09-26)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.12...v0.18.13)

- [Merge pull request #90 from joomcode/feat/support-new-create-locator](https://github.com/joomcode/e2ed/commit/d3b2b808a9b738e1e3ecdc72311bd9a9d400d8f1) ([uid11](https://github.com/uid11))

  feat: support new `create-locator` API

- [FI-1346 chore: update `create-locator` to 0.0.24](https://github.com/joomcode/e2ed/commit/99835714152d5e8d6f0a637ee6bec25e79c6f6fe) ([uid11](https://github.com/uid11))

  chore: update devDependencies (TypeScript to 5.6, etc)

  chore: update Playwright to 1.47.2

  feat: replace old locator API to new one

## [v0.18.12](https://github.com/joomcode/e2ed/tree/v0.18.12) (2024-09-09)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.11...v0.18.12)

- [Merge pull request #89 from joomcode/fix/ui-mode-stack-trace](https://github.com/joomcode/e2ed/commit/43f767fa21861a85e1e39e8d7bd07c24c5aea0e7) ([uid11](https://github.com/uid11))

  fix: error in source code in UI mode

- [FI-1345 fix: filter out error's stack trace in UI mode](https://github.com/joomcode/e2ed/commit/711396aeb2e78900b4e2a82fe86c40de76dfec99) ([uid11](https://github.com/uid11))

  fix: remove unnecessary function `wrapInTestRunTracker`

  fix: remove unnecessary pack config field `ajaxRequestTimeout`

  chore: update devDependencies (`@types/node`, etc)

  chore: update Playwright to 1.47.0

  refactor: remove unnecessary function `processRetry`

## [v0.18.11](https://github.com/joomcode/e2ed/tree/v0.18.11) (2024-08-31)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.10...v0.18.11)

- [Merge pull request #88 from joomcode/fix/playwright-config](https://github.com/joomcode/e2ed/commit/f5f08e740f87d4d5ce440f5abaf977318f31f43b) ([uid11](https://github.com/uid11))

  feat: support UI mode

- [FI-1345 refactor: Playwright config (`use` object)](https://github.com/joomcode/e2ed/commit/9d2a2e75d67cf0fbb26f5877275426b9e4233008) ([uid11](https://github.com/uid11))

  refactor: reexport `devices` from `@playwright/test`

  fix: add Playwright's browser version check

  fix: add using Playwright version from `package.json`

  feat: support UI mode flag

  feat: add internal `isUiMode` flag

  fix: remove text style from run errors in HTML report

  feat: add `enableCsp` flag to pack config and to test options

  fix: ingore timeouts in UI mode

  fix: mix up of JS errors and browser console logs from other test runs

  chore: update `@types/node` to 22.5.1

  fix: add `dateTimeInIso` to browser JS errors and console logs

  chore: clarify `@typescript-eslint/no-unused-vars` rule

## [v0.18.10](https://github.com/joomcode/e2ed/tree/v0.18.10) (2024-08-26)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.9...v0.18.10)

- [Merge pull request #87 from joomcode/fix/mobile-emulation](https://github.com/joomcode/e2ed/commit/913dfecdb93369a2773d6d8856b58e65b2738a40) ([uid11](https://github.com/uid11))

  fix: mobile emulation

- [FI-1344 fix: add action `pause` instead of `debug`](https://github.com/joomcode/e2ed/commit/f15fb0b51b796a319050ca4acdf8dc6790ec0a10) ([uid11](https://github.com/uid11))

  fix: `getBrowserConsoleMessages` action

  fix: `getBrowserJsErrors` action

  fix: clear page callbacks in the end ot the test

  chore: update devDependencies (`@types/node`, `husky`)

  fix: rename config property `browser` to `browserName`

  fix: add config property `deviceScaleFactor`

  fix: rename config property `overriddenUserAgent` to `userAgent`

## [v0.18.9](https://github.com/joomcode/e2ed/tree/v0.18.9) (2024-08-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.8...v0.18.9)

## [v0.18.8](https://github.com/joomcode/e2ed/tree/v0.18.8) (2024-08-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.7...v0.18.8)

- [Merge pull request #86 from joomcode/fix/after-playwright](https://github.com/joomcode/e2ed/commit/92ba0050e754ce6744f3aa9e325f23c4dca0a1c5) ([uid11](https://github.com/uid11))

  fix: do not enable "full mocks" in skipped tests

- [FI-1344 fix: do not enable "full mocks" in skipped tests](https://github.com/joomcode/e2ed/commit/15c29ed28e75a5dbd53ecbf57dbefecc5b9b069c) ([uid11](https://github.com/uid11))

  chore: update Playwright to 1.46.1 and some devDependencies

  fix: add function `getPlaywrightPage` to public API

  fix: divide test runs into retries in HTML report

  fix: remove `retryIndex` from run label

  fix: remove unnecessary function `processRetries`

  fix: log message after retries

## [v0.18.7](https://github.com/joomcode/e2ed/tree/v0.18.7) (2024-08-07)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.6...v0.18.7)

- [Merge pull request #85 from joomcode/fix/status-of-local-e2ed-run](https://github.com/joomcode/e2ed/commit/96683c88e32705d42d691c822bcc6c25ab434a08) ([uid11](https://github.com/uid11))

  fix: status of local e2ed run

- [FI-1237 fix: status of local e2ed run](https://github.com/joomcode/e2ed/commit/64df23553466b76ddfe78efbded8ebdaeee1dc51) ([uid11](https://github.com/uid11))

  fix: remove `bin-v8-flags-filter` package

  fix: respect `expect` and `global` timeouts in config

  fix: error in internal `selectorCustomMethods` test

  chore: update version of node in GitHub Actions

  fix: add logs to `setHeadersAndNavigateToUrl` action

  fix: urls of screenshots in HTML report

## [v0.18.6](https://github.com/joomcode/e2ed/tree/v0.18.6) (2024-08-06)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.5...v0.18.6)

- [Merge pull request #84 from joomcode/fix/test-file-path-checks](https://github.com/joomcode/e2ed/commit/6b6d8865251b6dfdac9d5a84f516bea0193d71df) ([uid11](https://github.com/uid11))

  fix: global status of e2ed run

- [FI-1237 fix: global status of e2ed run](https://github.com/joomcode/e2ed/commit/bcd814c059900836fa4868316e7cb0a3940cbf17) ([uid11](https://github.com/uid11))

  chore: update Playwright to 1.46.0

## [v0.18.5](https://github.com/joomcode/e2ed/tree/v0.18.5) (2024-08-05)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.4...v0.18.5)

- [fix: security issues with API keys in logs](https://github.com/joomcode/e2ed/commit/5eed5d7c2f611f0e00c81f370ea1009b3a5b5a4e) ([uid11](https://github.com/uid11))
- [Merge pull request #83 from joomcode/fix/headers-mapping](https://github.com/joomcode/e2ed/commit/b073b6a1528a7702241d42805c57e133ff36737a) ([uid11](https://github.com/uid11))

  fix: mapping of `set-cookie` header and other headers

- [FI-1237 fix: mapping of `set-cookie` header and other headers](https://github.com/joomcode/e2ed/commit/57334202f0bdc9cb887b4bd6e8cf24ba9e4a3862) ([uid11](https://github.com/uid11))

## [v0.18.4](https://github.com/joomcode/e2ed/tree/v0.18.4) (2024-07-30)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.3...v0.18.4)

- [Merge pull request #82 from joomcode/fix/state-of-full-mocks](https://github.com/joomcode/e2ed/commit/d18b79c3954ab7db6d682985f61034b30629047d) ([uid11](https://github.com/uid11))

  fix: state of "full mocks" after first retry

- [FI-1237 fix: state of "full mocks" after first retry](https://github.com/joomcode/e2ed/commit/a480d4ff3da5974a7d007161b2eb0008ed218ced) ([uid11](https://github.com/uid11))

- [Merge pull request #81 from joomcode/fix/use-one-start-e2ed-function](https://github.com/joomcode/e2ed/commit/a366f22e16aa81d38a3ed3e7100299755526b7e1) ([uid11](https://github.com/uid11))

  fix: use one function for starting e2ed

## [v0.18.3](https://github.com/joomcode/e2ed/tree/v0.18.3) (2024-07-29)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.2...v0.18.3)

- [FI-1237 fix: use one function for starting e2ed](https://github.com/joomcode/e2ed/commit/37a63ce6bf9ac67828866f4783a49373c4e2f18f) ([uid11](https://github.com/uid11))

## [v0.18.2](https://github.com/joomcode/e2ed/tree/v0.18.2) (2024-07-28)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.1...v0.18.2)

- [Merge pull request #80 from joomcode/fix/remove-jsx-from-tsconfig](https://github.com/joomcode/e2ed/commit/426a494aecd47de8eea4111bd3030611782f2324) ([uid11](https://github.com/uid11))

  fix: remove `jsx` option from tsconfig for pack

- [FI-1237 fix: remove `jsx` option from tsconfig for pack](https://github.com/joomcode/e2ed/commit/1af6a5242bab9c0a5e9a4e58ff072d8d4693d7df) ([uid11](https://github.com/uid11))

## [v0.18.1](https://github.com/joomcode/e2ed/tree/v0.18.1) (2024-07-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.18.0...v0.18.1)

- [Merge pull request #79 from joomcode/fix/cookies-actions](https://github.com/joomcode/e2ed/commit/68c8abfd50a751ae660f8be8c8093731dbe73d98) ([uid11](https://github.com/uid11))

  fix: `getCookies` action

- [FI-1237 fix: `getCookies` action](https://github.com/joomcode/e2ed/commit/cd782ad2fc04386214c0be175d9a09a290f4e3ce) ([uid11](https://github.com/uid11))

  fix: `pressKey` action

  fix: add description to internal Playwright `expect` calls

## [v0.18.0](https://github.com/joomcode/e2ed/tree/v0.18.0) (2024-07-25)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.17.1...v0.18.0)

- [Merge pull request #78 from joomcode/feat/use-playwright](https://github.com/joomcode/e2ed/commit/a04a7342ddb68cf4dcfcba55ddc4c3dad9f91450) ([uid11](https://github.com/uid11))

  feat: replace TestCafe with Playwright

- [FI-1237 feat: run tests via Playwright](https://github.com/joomcode/e2ed/commit/41d221f08759cb6ab47e77c5cdc0b6edb9445090) ([uid11](https://github.com/uid11))

## [v0.17.1](https://github.com/joomcode/e2ed/tree/v0.17.1) (2024-05-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.17.0...v0.17.1)

- [Merge pull request #77 from joomcode/feature/add-writeOnly-for-fullMocks](https://github.com/joomcode/e2ed/commit/4ec8166323c8e35a17f95e02de4cae6d557f988a) ([uid11](https://github.com/uid11))

  feat: add `writeOnly` flag to "full mocks" config

- [chore: update `create-locator` and `devtools-protocol`](https://github.com/joomcode/e2ed/commit/56d2f47163e53425bd8fde761e5c5a4574f0620e) ([uid11](https://github.com/uid11))
- [FI-1300 feat: add `writeOnly` flag to "full mocks" config](https://github.com/joomcode/e2ed/commit/ff4b7f35bcd103244e7103281bff8f4dcfa8c236) ([uid11](https://github.com/uid11))

## [v0.17.0](https://github.com/joomcode/e2ed/tree/v0.17.0) (2024-05-21)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.21...v0.17.0)

- [Merge pull request #76 from joomcode/feat/add-full-mocks](https://github.com/joomcode/e2ed/commit/cdd103e26726f1f4b7db505bb70c8a51478c2c5d) ([uid11](https://github.com/uid11))

  feat: add "full mocks" functionality

- [fix: error with "fullMocks" field of config in docker mode](https://github.com/joomcode/e2ed/commit/21edbb7a0f59f799f0df66ab3e22669113f0c635) ([uid11](https://github.com/uid11))

  chore: update devDependencies (`@types/node`, etc)

- [FI-1236 feat: add "full mocks" functionality](https://github.com/joomcode/e2ed/commit/e26f88852ff0a7f874470ec09ea6f5a222d6ab83) ([uid11](https://github.com/uid11))

  tests: add tests for "full mocks" functionality

  fix: pack compilation errors `is not under 'rootDir'`

## [v0.16.21](https://github.com/joomcode/e2ed/tree/v0.16.21) (2024-04-10)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.20...v0.16.21)

- [Merge pull request #75 from joomcode/fix/retries-in-cdp-mode](https://github.com/joomcode/e2ed/commit/0555eb61669e847047ed40fd7263921c7bcfe95e) ([uid11](https://github.com/uid11))

  fix: logic of ending of retries in CDP mode

- [chore: update `devDependencies` (`@types/node`, `typescript`, etc)](https://github.com/joomcode/e2ed/commit/10dd9fb2f9f5cb90155b7491a6991a8d83b7a1c2) ([uid11](https://github.com/uid11))

  chore: update `create-locator` to version 0.0.20 with new API

- [FI-1257 fix: `isLastRetrySuccessful` flag in CDP mode](https://github.com/joomcode/e2ed/commit/cce066f08e06d38f19186516f3adff7844871e3a) ([uid11](https://github.com/uid11))

## [v0.16.20](https://github.com/joomcode/e2ed/tree/v0.16.20) (2024-04-03)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.19...v0.16.20)

- [Merge pull request #74 from joomcode/fix/cdp-in-reload-page-action](https://github.com/joomcode/e2ed/commit/814e2951328ae478b0974920987922fa4aa6ff3c) ([uid11](https://github.com/uid11))

  fix: using CDP in `reloadPage` action

- [FI-943 fix: use CDP only when `cdpClient` is defined](https://github.com/joomcode/e2ed/commit/5edd629b724af310ca19f6da24ecb5591bac8fd9) ([uid11](https://github.com/uid11))

  fix: mark `RequestHookWithEvents` as internal class

  refactor: split `SetHeadersRequestHook` into several modules

## [v0.16.19](https://github.com/joomcode/e2ed/tree/v0.16.19) (2024-04-03)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.18...v0.16.19)

- [Merge pull request #73 from joomcode/fix/disable-service-workers-on-cdp](https://github.com/joomcode/e2ed/commit/ab1ba9de58f9164d47e7b8eb65b788269a171545) ([uid11](https://github.com/uid11))

  fix: disable service workers on CDP mode

- [chore: update `devDependencies` (`@types/node`, etc)](https://github.com/joomcode/e2ed/commit/756d32f727dd382bc28f1eebc61c69cdabe492fd) ([uid11](https://github.com/uid11))
- [FI-943 fix: disable Service Workers on CDP mode](https://github.com/joomcode/e2ed/commit/3d5a6c90f0fa01132e5a305b60289f7c72fa58d2) ([uid11](https://github.com/uid11))

  fix: add `retry` field to error params in `request` util

## [v0.16.18](https://github.com/joomcode/e2ed/tree/v0.16.18) (2024-04-01)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.17...v0.16.18)

- [Merge pull request #72 from joomcode/fix/e2ed-debug](https://github.com/joomcode/e2ed/commit/8529cf715b988a2b7a365a9ed155ca006e812251) ([uid11](https://github.com/uid11))

  fix: error with comparing `E2ED_DEBUG` with empty string

- [FI-943 fix: error with comparing `E2ED_DEBUG` with empty string](https://github.com/joomcode/e2ed/commit/015212a51676252d1cfcbdb1615bbf714b070df9) ([uid11](https://github.com/uid11))

  chore: turn on more `@typescript-eslint/*` rules

## [v0.16.17](https://github.com/joomcode/e2ed/tree/v0.16.17) (2024-04-01)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.16...v0.16.17)

- [Merge pull request #71 from joomcode/fix/cdp-errors](https://github.com/joomcode/e2ed/commit/c037f7ef1a36e3fd45d1451bb87add3b32004086) ([uid11](https://github.com/uid11))

  fix: errors in CDP mode

- [chore: update `devDependencies` (`@types/node`, etc)](https://github.com/joomcode/e2ed/commit/d76c30d2219e18e6edb1951a356f7f4ed293b05f) ([uid11](https://github.com/uid11))
- [chore: turn on more `@typescript-eslint/*` rules](https://github.com/joomcode/e2ed/commit/b207ee7b32e31de193c8798dc85399f71f843646) ([uid11](https://github.com/uid11))
- [FI-943 fix: some errors with request hooks on CDP mode](https://github.com/joomcode/e2ed/commit/a873f0cc1d2d6225b01b9d2fcd3579f61c15c035) ([uid11](https://github.com/uid11))

## [v0.16.16](https://github.com/joomcode/e2ed/tree/v0.16.16) (2024-03-28)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.15...v0.16.16)

- [Merge pull request #70 from joomcode/fix/restore-errors-params](https://github.com/joomcode/e2ed/commit/80430966bc20e3203a383d8da494df7475e6956d) ([uid11](https://github.com/uid11))

  fix: restore errors params

- [chore: update `devDependencies` (`typescript`, `@types/node`, etc)](https://github.com/joomcode/e2ed/commit/5c70d6163042a0ee19c7e80d24e1f0db130b4f94) ([uid11](https://github.com/uid11))
- [chore: turn on more `@typescript-eslint/*` rules](https://github.com/joomcode/e2ed/commit/c75d406163459e93efb62bcfb5c8ff70ae17f1a5) ([uid11](https://github.com/uid11))
- [fix: restore field `params` in `E2edError`](https://github.com/joomcode/e2ed/commit/067db47fe4442ddad65310a4ad70aed6d6c2168b) ([uid11](https://github.com/uid11))

  fix: case-sensitive of attributes names in custom selector methods

## [v0.16.15](https://github.com/joomcode/e2ed/tree/v0.16.15) (2024-03-15)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.14...v0.16.15)

- [Merge pull request #69 from joomcode/feat/add-createPageObjectsFromMultiLocator](https://github.com/joomcode/e2ed/commit/8a61c3e24b338fb37102fd71c98068c122a80d88) ([uid11](https://github.com/uid11))

  feat: add `createPageObjectsFromMultiLocator` utility

- [chore: update `create-locator` to 0.0.19](https://github.com/joomcode/e2ed/commit/70845cd170660ab9a50571fe052d0fd8ec86ebe7) ([uid11](https://github.com/uid11))

  chore: update `devDependencies` (`@typescript-eslint/*`, `@types/node`, etc)

- [chore: turn on more `@typescript-eslint/*` rules](https://github.com/joomcode/e2ed/commit/13edd8cf15065e84cbb12105210ca7c132268d9c) ([uid11](https://github.com/uid11))
- [FI-765 fix: directly end `e2ed` on termination signals](https://github.com/joomcode/e2ed/commit/93a4101150e132f67849c05edb532f234bd94aee) ([uid11](https://github.com/uid11))

  fix: add more temporary logs on termination signals

- [FI-765 feat: add environment variable `E2ED_TERMINATION_SIGNAL`](https://github.com/joomcode/e2ed/commit/152c0aa2fec4390553e201e4000c46869beeca43) ([uid11](https://github.com/uid11))

  feat: add environment variable `E2ED_TIMEOUT_FOR_GRACEFUL_SHUTDOWN_IN_SECONDS`

  refactor: move `onRequest` and `onConfigureResponse` methods to thier own modules

- [FI-1010 fix: add runtime tests for `createPageObjectsFromMultiLocator` utility](https://github.com/joomcode/e2ed/commit/4ccef1c71e0e50e0acc2bd1a364e23091167a13c) ([uid11](https://github.com/uid11))
- [FI-1010 feat: add `createPageObjectsFromMultiLocator` utility](https://github.com/joomcode/e2ed/commit/cc371fbe38e884c30404faebecc6ec460183a633) ([uid11](https://github.com/uid11))

  tests: add tests of types of `createPageObjectsFromMultiLocator` utility

## [v0.16.14](https://github.com/joomcode/e2ed/tree/v0.16.14) (2024-03-07)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.13...v0.16.14)

- [Merge pull request #68 from joomcode/fix/correct-exit-on-sigint](https://github.com/joomcode/e2ed/commit/458b35c0b1ba8a481a8f1a0f2ea3c0f26d48cb17) ([uid11](https://github.com/uid11))

  fix: correct exit from docker after exit signals

- [chore: update devDependencies (`typescript`, `@typescript-eslint/*`, etc)](https://github.com/joomcode/e2ed/commit/60441ddf29116c7b8e912709a98afb71d67410c0) ([uid11](https://github.com/uid11))
- [chore: turn on more `@typescript-eslint` rules](https://github.com/joomcode/e2ed/commit/6f6fb998be18e26789e3c6fea6d66fca4685bd7c) ([uid11](https://github.com/uid11))
- [FI-765 fix: writes HTML report after exit signals to `dockerEntrypoint.sh`](https://github.com/joomcode/e2ed/commit/d356502e494f3fee0137bdbbc3bedb9ab3003b00) ([uid11](https://github.com/uid11))

## [v0.16.13](https://github.com/joomcode/e2ed/tree/v0.16.13) (2024-02-28)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.12...v0.16.13)

- [Merge pull request #67 from joomcode/fix/default-charset-encoding](https://github.com/joomcode/e2ed/commit/e9a9c68c94ce61f67e05caf3a44ff0dc23ff607a) ([uid11](https://github.com/uid11))

  fix: default encoding in `Charset` TestCafe class

- [chore: add more `@typescript-eslint/*` rules.](https://github.com/joomcode/e2ed/commit/3bf98835421976f898159c34dbb919e472bd3660) ([uid11](https://github.com/uid11))

  chore: update `devDependencies` (`@types/node`, etc)

- [chore: update `devDependencies` (`@typescript-eslint/*`)](https://github.com/joomcode/e2ed/commit/d763e6063f9883ae3152c99c758d5e0135b6ecb5) ([uid11](https://github.com/uid11))
- [FI-1120 feat: add parameter `method` to `getParamsFromUrl` route method](https://github.com/joomcode/e2ed/commit/dea270b09ec3276e68c2fcdda8b840a252a712cc) ([uid11](https://github.com/uid11))

  feat: add `skipLogs` parameter to `mockApiRoute` function

  feat: add `INTERNAL_SERVER_ERROR` and `NOT_FOUND` HTTP status codes

  fix: `utf-8` encoding in `writeFile` utility

  fix: default encoding in `Charset` TestCafe class

## [v0.16.12](https://github.com/joomcode/e2ed/tree/v0.16.12) (2024-02-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.11...v0.16.12)

- [Merge pull request #66 from joomcode/fix/use-response-with-request-everywhere](https://github.com/joomcode/e2ed/commit/fc6850d81c5258a412710477d4928478165bb9ea) ([uid11](https://github.com/uid11))

  fix: return `ResponseWithRequest` from `request` utility

- [chore: update `devDependencies` (`@types/node`, etc)](https://github.com/joomcode/e2ed/commit/f6506e25dc3db00eefcc8689ab5ac398ce1a770f) ([uid11](https://github.com/uid11))

  chore: fix `npm audit` error and restore `npm audit` check

- [chore: turn on `no-loop-func` and `no-magic-numbers` @typescript-eslint rules](https://github.com/joomcode/e2ed/commit/da0a9fbe55588d69e43ab0b3f74071ac7497b261) ([uid11](https://github.com/uid11))
- [FI-1161 refactor: move all pack-specific types to `autotests/configurator`](https://github.com/joomcode/e2ed/commit/95f65b57ba977af31a59b9a12677b870b2902f7c) ([uid11](https://github.com/uid11))
- [FI-1169 fix: return `ResponseWithRequest` from `request` utility](https://github.com/joomcode/e2ed/commit/b7cdbb1226890904d66c657dbfbf5b552b1907c8) ([uid11](https://github.com/uid11))

  fix: remove unnecessary empty `<script>` from HTML report (fixed by Firefox)

## [v0.16.11](https://github.com/joomcode/e2ed/tree/v0.16.11) (2024-02-16)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.10...v0.16.11)

- [Merge pull request #65 from joomcode/fix/double-exit-from-tests-subprocess](https://github.com/joomcode/e2ed/commit/a33f1a9ab635e5e80c7c6b0260b6355a3458e8f6) ([uid11](https://github.com/uid11))

  fix: prevent double exit from tests subprocess

- [chore: update `devDependencies` (`@types/node`, etc)](https://github.com/joomcode/e2ed/commit/8fb02ffd7101c037ce55f02676f705c4c23332a4) ([uid11](https://github.com/uid11))
- [FI-1160 fix: prevent double exit from tests subprocess](https://github.com/joomcode/e2ed/commit/80e16fea3bcaa83dd32a5bcb946d3f0cddf21711) ([uid11](https://github.com/uid11))

  fix: totale number of successful tests in previous retries

  refactor: add more `@typescript-eslint/*` rules

## [v0.16.10](https://github.com/joomcode/e2ed/tree/v0.16.10) (2024-02-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.9...v0.16.10)

- [Merge pull request #64 from joomcode/fix/exit-from-tests-subprocess](https://github.com/joomcode/e2ed/commit/2190dd69f5e6705d1be8a9f7190ad3aa3aa3fd9b) ([uid11](https://github.com/uid11))

  fix: do not exit from tests subprocess prematurely

- [chore: update `devDependencies` (`devtools-protocol`)](https://github.com/joomcode/e2ed/commit/58cd308ad556d22f74c9a61ca4ea5b7e1386e251) ([uid11](https://github.com/uid11))
- [FI-678 fix: do not exit from tests subprocess prematurely](https://github.com/joomcode/e2ed/commit/16006a94fb6cb1d7c406e4b18012ce0ac5f252b0) ([uid11](https://github.com/uid11))

  chore: turn on `@typescript-eslint/max-params` rule

  chore: turn on `@typescript-eslint/member-ordering` rule

## [v0.16.9](https://github.com/joomcode/e2ed/tree/v0.16.9) (2024-02-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.8...v0.16.9)

- [Merge pull request #63 from joomcode/fix/respect-number-of-disconnected-browsers](https://github.com/joomcode/e2ed/commit/4990386b729235a7a264433382b94d3354a36ae4) ([uid11](https://github.com/uid11))

  feat: exit from tests process if browser disconnect threshold is exceeded

- [chore: update `devDependencies` (`@types/node`, etc)](https://github.com/joomcode/e2ed/commit/bce9052f68dbae5ed473d6aa0b3c3866b50819f1) ([uid11](https://github.com/uid11))

  chore: turn on rule `@typescript-eslint/explicit-module-boundary-types`

- [FI-1154 fix: interrupt tests subprocess even if no tests have been run](https://github.com/joomcode/e2ed/commit/3b3c143f74299181fab93e7534355e064461be69) ([uid11](https://github.com/uid11))
- [FI-678 feat: exit from tests process if browser disconnect threshold is exceeded](https://github.com/joomcode/e2ed/commit/5b6880c39c9aaadba2a195937b3c00ba16a3734b) ([uid11](https://github.com/uid11))

  refactor: rename `processExit` util to `exitFromE2ed`

  feat: add `exitFromTestsSubprocess` util

  feat: add `isLocalRun`/`isDockerRun` flags to public API of configurator

## [v0.16.8](https://github.com/joomcode/e2ed/tree/v0.16.8) (2024-02-08)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.7...v0.16.8)

- [Merge pull request #62 from joomcode/fix/ending-retries-with-browser-disconnect](https://github.com/joomcode/e2ed/commit/610c7c2af69bacf17c341efbcc230565f8d46dcc) ([uid11](https://github.com/uid11))

  fix: do not reject retry if some browser disconnect

- [FI-1142 fix: do not reject retry if some browser disconnect](https://github.com/joomcode/e2ed/commit/9ad8f87985821065b616fa8d1946daa91d84e644) ([uid11](https://github.com/uid11))

  fix: correct CPU cores metrics in resource usage util

  chore: update `@types/node` to 20.11.16

## [v0.16.7](https://github.com/joomcode/e2ed/tree/v0.16.7) (2024-02-06)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.6...v0.16.7)

- [Merge pull request #61 from joomcode/fix/removing-not-complete-requests](https://github.com/joomcode/e2ed/commit/a6d7e7aa649aaf20e072e55970ece22fde3e0038) ([uid11](https://github.com/uid11))

  feat: add resource usage to logs

- [chore: update `devDependencies` (`@types/node`, `husky`, etc)](https://github.com/joomcode/e2ed/commit/5666140ee1e55347cb4eacf2e58d6852f434cb08) ([uid11](https://github.com/uid11))
- [FI-1144 feat: add resource usage to logs](https://github.com/joomcode/e2ed/commit/096223b1ee6e653462e4bbba54d85dc23071e7e7) ([uid11](https://github.com/uid11))

  fix: reading requests from `hashOfNotCompleteRequests`

## [v0.16.6](https://github.com/joomcode/e2ed/tree/v0.16.6) (2024-01-28)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.5...v0.16.6)

- [Merge pull request #60 from joomcode/fix/mapping-headers-on-redirects-on-cdp-mode](https://github.com/joomcode/e2ed/commit/67d1a157e61383d0824fd208563ba16601ecefb4) ([uid11](https://github.com/uid11))

  fix: mapping headers on redirects on CDP mode

- [chore: update devDependencies (`husky` to 9.0.6, `@types/node`, etc)](https://github.com/joomcode/e2ed/commit/d1aa014ade458d46526c352941a5f8840a4c643f) ([uid11](https://github.com/uid11))

  chore: update alpine to 3.19.1 (`chromium` to 121)

- [FI-1133 fix: remove hook `navigateTo`](https://github.com/joomcode/e2ed/commit/3e64fcb803c27d36d37a72cf97055e49f009609e) ([uid11](https://github.com/uid11))

  fix: add methods `assertPage`, `navigateToPage` and `reloadPage` to base `Page`

  feat: add util `reloadDocument`

- [FI-943 fix: map headers for redirected requests also](https://github.com/joomcode/e2ed/commit/192ce0ce61d29d0582ffee9d145d00f076bd973d) ([uid11](https://github.com/uid11))

## [v0.16.5](https://github.com/joomcode/e2ed/tree/v0.16.5) (2024-01-24)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.4...v0.16.5)

- [Merge pull request #59 from joomcode/fix/headers-rewriting-on-cdp-mode](https://github.com/joomcode/e2ed/commit/20d26dc44cc2ae158c5640d7d6fcaa0851c09169) ([uid11](https://github.com/uid11))

  fix: headers rewriting on CDP mode

- [FI-943 fix: do not rewrite header values on CDP mode](https://github.com/joomcode/e2ed/commit/452747d19bb79d0eea41f5e47b7b0a483a33b5a6) ([uid11](https://github.com/uid11))

  feat: add `assertValueIsBoolean` function to public API

  chore: update `@types/node` to 20.11.6

- [FI-1138 feat: add `configCompileTimeWithUnits` field to start info](https://github.com/joomcode/e2ed/commit/168944cdd11d37a67cdd65a3d1043f6130711739) ([uid11](https://github.com/uid11))

  feat: add `afterPackExecutionTimeWithUnits`/`beforePackExecutionTimeWithUnits` fields

## [v0.16.4](https://github.com/joomcode/e2ed/tree/v0.16.4) (2024-01-24)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.3...v0.16.4)

- [Merge pull request #58 from joomcode/fix/rename-env-file](https://github.com/joomcode/e2ed/commit/902bf131f9eae280dfd98b1e73342274b7edf3c0) ([uid11](https://github.com/uid11))

  fix: rename `.env` to `variables.env`

- [FI-943 fix: rename `.env` to `variables.env`](https://github.com/joomcode/e2ed/commit/8c12f992ad1c5494887f41f02b6a125e5061e60c) ([uid11](https://github.com/uid11))

## [v0.16.3](https://github.com/joomcode/e2ed/tree/v0.16.3) (2024-01-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.2...v0.16.3)

- [Merge pull request #57 from joomcode/fix/multiheaders-mapping-for-cdp](https://github.com/joomcode/e2ed/commit/0acb037db0a519ba4f5210c1576fa4764bec282c) ([uid11](https://github.com/uid11))

  fix: multiheaders mapping in CDP mode

- [chore: update devDependencies (`@typescript-eslint/*`, etc)](https://github.com/joomcode/e2ed/commit/f7d16e013d8ff38f22cb7ca260427624b4388b77) ([uid11](https://github.com/uid11))

  fix: remove `UnwrapPromise` type in favor of `Awaited`

  fix: support `lib` field in TypeScript config for compiling pack config

- [FI-1136 fix: use `E2ED_DOCKER_IMAGE` instead of `dockerImage` pack option](https://github.com/joomcode/e2ed/commit/41bb7c76d648d37d21f63c0998ad7c70742a8f44) ([uid11](https://github.com/uid11))

  feat: support dotenv file `./autotests/.env`

  fix: use `E2ED_PATH_TO_TS_CONFIG_OF_PROJECT_FROM_ROOT` environment variables

- [FI-943 fix: mapping of headers with array values in CDP mode](https://github.com/joomcode/e2ed/commit/e67999207bcb657d62cbab6bfa0c9bccd6a31880) ([uid11](https://github.com/uid11))

  feat: add `pathToTsConfigOfProjectFromRoot` option to pack config

## [v0.16.2](https://github.com/joomcode/e2ed/tree/v0.16.2) (2024-01-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.1...v0.16.2)

- [fix: do not wait YouTube on `Search` page](https://github.com/joomcode/e2ed/commit/b2965d500516a797284205775d2ffd3dab3a4a23) ([uid11](https://github.com/uid11))
- [Merge pull request #56 from joomcode/fix/errors-with-status-301-on-cdp](https://github.com/joomcode/e2ed/commit/169e4ab23f0c021adea41bbe780b139496e105b9) ([uid11](https://github.com/uid11))

  fix: errors with redirects on CDP mode

- [fix: errors with redirects on CDP mode](https://github.com/joomcode/e2ed/commit/45e27f4d6c16976080482a00ca443ce2ff426e7d) ([uid11](https://github.com/uid11))

  chore: add `devtools-protocol` package for CDP types

  feat: add assert function `assertValueIsString`

  feat: add util function `getCdpClientOfTestRun`

  feat add `enableLiveMode` option to pack config

  fix: incorrect `timeSinceAllRequestsComplete` in logs

  chore: update devDependencies (`@types/node`, `prettier`, etc)

  chore: save local reports to GitHub Action Artifacts

- [fix: unskip `selectorCustomMethods` test](https://github.com/joomcode/e2ed/commit/44f2fc4c016909c0687ff362c4a9e72943fa1ca0) ([uid11](https://github.com/uid11))

## [v0.16.1](https://github.com/joomcode/e2ed/tree/v0.16.1) (2024-01-01)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.16.0...v0.16.1)

- [Merge pull request #55 from joomcode/fix/locators-on-report-example-page](https://github.com/joomcode/e2ed/commit/281dd454b10343512125db552798b9f3f835bf34) ([uid11](https://github.com/uid11))

  fix: locators on e2ed report example page

- [fix: locators on e2ed report example page](https://github.com/joomcode/e2ed/commit/8feb10c9a678028be3242aef29cb0ad439d216a9) ([uid11](https://github.com/uid11))

  fix: add `timeSinceAllRequestsComplete` field to logs of `waitForAllRequestsComplete`

## [v0.16.0](https://github.com/joomcode/e2ed/tree/v0.16.0) (2023-12-31)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.18...v0.16.0)

- [Merge pull request #54 from joomcode/feat/support-cdp-aka-native-automation](https://github.com/joomcode/e2ed/commit/8c89972c659fd17e8b1148bcae5ecf6aa7165992) ([uid11](https://github.com/uid11))

  feat: support CDP (aka native automation)

- [fix: support debugging tests subprocess in docker](https://github.com/joomcode/e2ed/commit/fb0a4ed1cbf063cee56643f7afd7c67fcf84f285) ([uid11](https://github.com/uid11))

  fix: do not fail parallel tests runs in docker

  fix: reduce size of docker image (remove unnecessary openssl archs)

- [chore: update TestCafe to 3.5.0, update devDependencies (`@types/node`, etc)](https://github.com/joomcode/e2ed/commit/8121348045547fcee2a4d3bc0cf390b06db03828) ([uid11](https://github.com/uid11))
- [FI-1031 feat: add typed browser parameters to pack config](https://github.com/joomcode/e2ed/commit/ab3e25c43e1039d4b1e530f1902189e0c7ca7ee9) ([uid11](https://github.com/uid11))
- [FI-943 feat: support CDP (aka native automation)](https://github.com/joomcode/e2ed/commit/5fd37e38a84836037a51bba5df6d5bae58c16a8c) ([uid11](https://github.com/uid11))

## [v0.15.18](https://github.com/joomcode/e2ed/tree/v0.15.18) (2023-12-18)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.17...v0.15.18)

- [Merge pull request #53 from joomcode/feat/add-waitForRequestToRoute](https://github.com/joomcode/e2ed/commit/13e45547ceca0bdb771f50b096f41698d09a0cf5) ([uid11](https://github.com/uid11))

  feat: add functions `waitForRequestToRoute`/`waitForResponseToRoute`

- [FI-714 feat: add functions `waitForRequestToRoute`/`waitForResponseToRoute`](https://github.com/joomcode/e2ed/commit/2d9c5fdc899f2fc8b5b4ec9078954ea1beac653a) ([uid11](https://github.com/uid11))

  feat: add `RequestWithUtcTimeInMs` public type

  fix: correct definition of `ResponseWithRequest` type

  fix: use `ResponseWithRequest` for `waitForResponse`

  fix: use `RequestWithUtcTimeInMs` for `waitForRequest`

  fix: add `skipLogs` option to `waitForRequest`/`waitForResponse`

  fix: tests for timeout in `expect` functions

  fix: add check that methods `isMatchUrl` and `getParamsFromUrl` are consistent

  fix: printing of `E2edError` after `replaceFields` applying

  chore: add eslint plugin `typescript-sort-keys/recommended`

  tests: add tests for `waitForRequestToRoute` function

  tests: add tests for `waitForResponseToRoute` function

  docs: add mentions about `waitForRequestToRoute`/`waitForResponseToRoute` to README.md

  chore: update devDependencies (eslint, @types/node, etc)

  fix: waiting actual value when it is a promise in `expect` function assertions

  fix: make exports of branches `import` and `require` from `e2ed/testcafe` equal

## [v0.15.17](https://github.com/joomcode/e2ed/tree/v0.15.17) (2023-12-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.15...v0.15.17)

- [fix: update minimal version of TypeScript in `package-lock.json`](https://github.com/joomcode/e2ed/commit/e2e384132d95e577a6eafda727ebc8424e62d4ac) ([uid11](https://github.com/uid11))
- [Merge pull request #52 from joomcode/fix/respect-errors-from-doBeforePack-doAfterPack](https://github.com/joomcode/e2ed/commit/c3238464719f2ad50b25a606d427b0327bbb6d37) ([uid11](https://github.com/uid11))

  fix: fail tests run if `doAfterPack`/`doBeforePack` throw an error

- [FI-1072 fix: fail tests run if `doAfterPack`/`doBeforePack` throw an error](https://github.com/joomcode/e2ed/commit/e138727782a988a95dd89f51da9bd623385e5d51) ([uid11](https://github.com/uid11))

  fix: do not lose error fields after `replaceFields`

  fix: limit the number of copied keys in `replaceFields` function

  refactor: turn on `@typescript-eslint/sort-type-constituents` rule

  fix: add types for `e2ed/testcafe` import from ESM

## [v0.15.15](https://github.com/joomcode/e2ed/tree/v0.15.15) (2023-12-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.14...v0.15.15)

- [Merge pull request #51 from joomcode/fix/failed-assertion-message](https://github.com/joomcode/e2ed/commit/4326f27b5dce2795cd7a27a5238bf805cb664f21) ([uid11](https://github.com/uid11))

  fix: message for failed assertion

- [FI-1063 fix: message for failed assertion](https://github.com/joomcode/e2ed/commit/ccfa7b0075940218e8b23d8058b13f45c15d7c3e) ([uid11](https://github.com/uid11))

  feat: add `duration` field to `ResponseWithRequest`

  fix: move some independent functions to `e2ed/configurator` from `e2ed/utils`

  chore: update alpine to 3.19.0

  fix: use latest version of nodejs, in which browser connection in Docker is stable

  fix: `replaceFields` function for objects with nontrivial prototypes

  chore: update devDependencies (@types/node, @typescript-eslint/\*, etc)

## [v0.15.14](https://github.com/joomcode/e2ed/tree/v0.15.14) (2023-12-07)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.13...v0.15.14)

- [Merge pull request #50 from joomcode/fix/changelog-errors](https://github.com/joomcode/e2ed/commit/1a677918f1221b28b38a5620a47b72e1f9a3287d) ([uid11](https://github.com/uid11))

  fix: errors in `updateChangelog` script

- [fix: errors in `updateChangelog` script](https://github.com/joomcode/e2ed/commit/78c30fdfb0afb594a8c7d04c09a14159c2fb2769) ([uid11](https://github.com/uid11))

  fix: typos in `CHANGELOG.md`

  fix: errors in `package.json` by `npm pkg fix`

  fix: simplify `mapBackendResponseErrorToLog` function

## [v0.15.13](https://github.com/joomcode/e2ed/tree/v0.15.13) (2023-12-07)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.12...v0.15.13)

- [Merge pull request #49 from joomcode/fix/stricter-type-of-expect-function](https://github.com/joomcode/e2ed/commit/5bef95cc0d010394d9654af7d112bf8a5ff85146) ([uid11](https://github.com/uid11))

  fix: stricter type of `expect` function

- [FI-705 fix: stricter type of `expect` function](https://github.com/joomcode/e2ed/commit/d72142f57210d289f7fc5b780122f093e82903d5) ([uid11](https://github.com/uid11))

  fix: support usual promises in `expect` function

  feat: add field `maxIntervalBetweenRequestsInMs` ot abstract class `Page`

  feat: add examples of `mapBackendResponseErrorToLog`/`mapBackendResponseToLog`

  tests: more tests of types of selectors methods

  chore: update nodejs to current LTS (20.10.0)

  chore: update alpine to 3.18.5

  fix: support new contributor in `updateChangelog` script

  refactor: move selectors code to `utils/selectors`

  refactor: remove `utils/locators`

  fix: use default cursor for empty expanded steps

  feat: add duration to backend response logs

  refactor: rename function `it` to `test` in initial autotests examples

  fix: print `message` and `cause` fields of `E2edError` in `replaceFields`

  fix: reject stuck assertion of `expect` by timeout

  tests: add separate tests for `expect` function

  feat: add type `ResponseWithRequest` to public API

  feat: use `ResponseWithRequest` for mapping backend responses to logs

  chore: update devDependencies (typescript, eslint, @types/node, etc)

  chore: update npm `lockfileVersion` (package-lock.json) from 2 to 3

  chore: update github action and node version in ci.yaml

- [Merge pull request #48 from joomcode/FI-1028](https://github.com/joomcode/e2ed/commit/791ed2f932f0cdd541c8d0f719c44dfce8f312ea) ([nnn3d](https://github.com/nnn3d))

  FI-1028: remove E2ED*DOCKER_DO*\* params

- [FI-1028: remove E2ED*DOCKER_DO*\* params](https://github.com/joomcode/e2ed/commit/15794d3a1ab9c227cf4a687bb065e5d60589334a) ([nnn3d](https://github.com/nnn3d))

## [v0.15.12](https://github.com/joomcode/e2ed/tree/v0.15.12) (2023-11-29)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.11...v0.15.12)

- [Merge pull request #47 from joomcode/fix/remove-extra-logs](https://github.com/joomcode/e2ed/commit/88a90399cfbf0c35676f6eae347e413c9e85691a) ([uid11](https://github.com/uid11))

  feat: remove extra logs from `mockApiRoute`

- [FI-1038 feat: remove extra logs from `mockApiRoute`](https://github.com/joomcode/e2ed/commit/5e13a6e3405911c773a80d9defa15c3bbf5c6fb6) ([uid11](https://github.com/uid11))

  fix: do not create client functions on `e2ed/utils` initialization

  fix: mistakes in CHANGELOG.md

  feat: add function `getShallowCopyOfObjectForLogs` to public API

  feat: add function `getStringTrimmedToMaxLength` to public API

  fix: correctly map backend responses to log payload

  tests: add tests for `replaceFields` function

  fix: remove call signature from `Selector` type

  tests: add more tests and type tests on selectors methods

  chore: update devDependencies (@typescript-eslint/\*)

  fix: do not duplicate backend responses (with or without body)

  fix: error with duplicate mocked backend responses

## [v0.15.11](https://github.com/joomcode/e2ed/tree/v0.15.11) (2023-11-24)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.10...v0.15.11)

- [Merge pull request #46 from joomcode/feat/add-log-backend-response-options](https://github.com/joomcode/e2ed/commit/180b38a6552c61b9bccc091ed320265f544fabfe) ([uid11](https://github.com/uid11))

  feat: add `mapBackendResponseErrorToLog`/`mapBackendResponseToLog` options

- [FI-1025 fix: stop docker container if tests are interrupted externally](https://github.com/joomcode/e2ed/commit/25370e36108f907dd78bd374d13165f86706a84f) ([uid11](https://github.com/uid11))

  chore: update alpine to 3.18.4 (so update Chrome to 117, etc)

  chore: update devDependencies (@types/node)

  fix: add `bash` to docker container

  refactor: rename files according to the names of exported functions

- [chore: update devDependencies (@types/node, @typescript-eslint/\*, etc)](https://github.com/joomcode/e2ed/commit/c59ed10ab5ac3c013ff4a3da74bfd6a7c9b51dda) ([uid11](https://github.com/uid11))

  refactor: add `readonly` modifier to `DESCRIPTION_KEY` and other fields

  refactor: use name in form [T/t]estCafe everywhere

- [feat: add JS errors and console messages for failed tests in HTML report](https://github.com/joomcode/e2ed/commit/4f233415d4d3e886bb38ca088f8ff855c16eff16) ([uid11](https://github.com/uid11))
- [FI-665 feat: add `mapBackendResponseErrorToLog`/`mapBackendResponseToLog` options](https://github.com/joomcode/e2ed/commit/d9385a7c14b3104be48fe439e99b7d57fd5699d9) ([uid11](https://github.com/uid11))

  feat: add `timeout` option to `takeElementScreenshot` action

  fix: remove unnecessary backticks around the error message

- [Merge pull request #44 from joomcode/FI-494](https://github.com/joomcode/e2ed/commit/eba8a49e65fc100ca3dc4e1c492c6c86968fb689) ([nnn3d](https://github.com/nnn3d))

  FI-494: add selectors with custom methods

- [FI-494: review fixes](https://github.com/joomcode/e2ed/commit/c69b98dc548a66c043ca99f52e1e8b8ddf89100a) ([nnn3d](https://github.com/nnn3d))
- [FI-494: review fixes](https://github.com/joomcode/e2ed/commit/349c95d7800810ab03b7f2cab4a058e6e988833c) ([nnn3d](https://github.com/nnn3d))
- [FI-494: review fixes](https://github.com/joomcode/e2ed/commit/ef71561bedc4a27428b27bfbecc84fcc106c69e3) ([nnn3d](https://github.com/nnn3d))
- [FI-494: fix prettier](https://github.com/joomcode/e2ed/commit/daa939c3088ef1e41390e79ec2d5293fbe2a578f) ([nnn3d](https://github.com/nnn3d))
- [Merge branch 'main' into FI-494](https://github.com/joomcode/e2ed/commit/ab4f9114b4e3694c363e53f5a2567fed8c77bf4a) ([nnn3d](https://github.com/nnn3d))
- [FI-494: remove default selector exports](https://github.com/joomcode/e2ed/commit/b03ad55d24c53d58fc217efc70b74ec876a4c2a2) ([nnn3d](https://github.com/nnn3d))
- [FI-494: add selectors with custom methods](https://github.com/joomcode/e2ed/commit/3e577d3b7dd113eaba2a135b1bd362e9eeca8d90) ([nnn3d](https://github.com/nnn3d))

## [v0.15.10](https://github.com/joomcode/e2ed/tree/v0.15.10) (2023-11-15)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.9...v0.15.10)

- [Merge pull request #45 from joomcode/fix/timeout-for-take-screenshot](https://github.com/joomcode/e2ed/commit/ff05c039df004d94e87195a971caa993e1cb555b) ([uid11](https://github.com/uid11))

  fix: disable timeout for taking error screenshot

- [FI-1015 feat: add locators to HTML report for testing locator utils](https://github.com/joomcode/e2ed/commit/14e743a5345f327d98d2fd7ccc13a4514955cf17) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@typescript-eslint/\*, prettier)](https://github.com/joomcode/e2ed/commit/65238598df2529dfce2cd164b3159a991ad2ad17) ([uid11](https://github.com/uid11))
- [fix: trim strings in logs by default](https://github.com/joomcode/e2ed/commit/96844c19ca8cba477ae58699df7a3faa50ae13cc) ([uid11](https://github.com/uid11))

  fix: improving the stability of `exists` test (`waitFor*` checks)

- [FI-1013 fix: disable timeout for taking error screenshot](https://github.com/joomcode/e2ed/commit/9ab6f35b1162ec45ce6113ee6c140bf9f9533546) ([uid11](https://github.com/uid11))

  feat: add `replaceFields` utility in configurator to reduce logs

  fix: add more eslint rules abouts type imports

## [v0.15.9](https://github.com/joomcode/e2ed/tree/v0.15.9) (2023-11-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.8...v0.15.9)

- [Merge pull request #43 from joomcode/fix/take-screenshot-timeout-error](https://github.com/joomcode/e2ed/commit/cba1619735015ada52be1a932090b32550e0144e) ([uid11](https://github.com/uid11))

  fix: error with option `timeout` of `takeScreenshot` action

- [fix: error with option `timeout` of `takeScreenshot` action](https://github.com/joomcode/e2ed/commit/bbddb8d8e362e255f540ab5c4f081587a856dc94) ([uid11](https://github.com/uid11))

  refactor: rename `promise` with timeout to `promiseWithTimeout`

  fix: more logs for duplicates of `filePath` and names of tests

## [v0.15.8](https://github.com/joomcode/e2ed/tree/v0.15.8) (2023-11-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.7...v0.15.8)

- [Merge pull request #42 from joomcode/fix/stabilization-interface-argument](https://github.com/joomcode/e2ed/commit/cd368b90b2a0007e7ba080ff4772e3729cf2391b) ([uid11](https://github.com/uid11))

  fix: error with `stabilizationInterval` argument

- [FI-1011 fix: error with `stabilizationInterval` argument](https://github.com/joomcode/e2ed/commit/1c02a3996a01b50e33b0d417bbf26c0642c7e670) ([uid11](https://github.com/uid11))

  fix: by default open failed test in HTML report (if any)

  fix: add timeout option to `takeScreenshot` action

## [v0.15.7](https://github.com/joomcode/e2ed/tree/v0.15.7) (2023-11-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.6...v0.15.7)

- [Merge pull request #41 from joomcode/fix/error-in-interface-stabilization](https://github.com/joomcode/e2ed/commit/e8ee29e474d5a767e63e4d055257030d19a38f47) ([uid11](https://github.com/uid11))

  fix: error in interface stabilization mechanism

- [FI-1011 fix: error in interface stabilization mechanism](https://github.com/joomcode/e2ed/commit/e70c52278e8b2ef59c97ab17fd9c349d9cf761b3) ([uid11](https://github.com/uid11))

  feat: add `getBrowserJsErrors` action

  tests: add tests on `getBrowserJsErrors` action

  feat: add `setPageElementsIgnoredOnInterfaceStabilization` action

  tests: add tests on `setPageElementsIgnoredOnInterfaceStabilization` action

  refactor: add `waitForInterfaceStabilization` block with `timeout` into pack config

  fix: regexp for removing console styles from string

## [v0.15.6](https://github.com/joomcode/e2ed/tree/v0.15.6) (2023-11-10)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.5...v0.15.6)

- [Merge pull request #40 from joomcode/feat/update-dependencies](https://github.com/joomcode/e2ed/commit/1174b92e1ccc95fb56d40fa1a1e50b815c6bce31) ([uid11](https://github.com/uid11))

  feat: add optional `request` field to `Response` object

- [FI-646 chore: update TestCafe to 3.4.0](https://github.com/joomcode/e2ed/commit/45e999b26622ef1f2fc50b84e1c5bdda48344ae1) ([uid11](https://github.com/uid11))
- [FI-646 chore: update devDependencies (eslint, @typescript-eslint, etc)](https://github.com/joomcode/e2ed/commit/25187472e0ad235d7682692bb2541c5b9ed1986a) ([uid11](https://github.com/uid11))

  feat: add `assertFunctionThrows` utility

- [FI-646 feat: add optional `request` field to `Response` object](https://github.com/joomcode/e2ed/commit/26d7c0d5d92c6ed19c26436d34a8a149868327c9) ([uid11](https://github.com/uid11))

  tests: add test for `request` field in `Response` object

- [refactor: rename `isTestIncludedInPack` to `filterTestsIntoPack`](https://github.com/joomcode/e2ed/commit/66acbf620031c881c7d6dd1a4e7ec461b1d6feff) ([uid11](https://github.com/uid11))
- [fix: remove empty d.ts-modules from builded package](https://github.com/joomcode/e2ed/commit/a1d8e97f85d4ac8ff3df9444cde5d139111f1a32) ([uid11](https://github.com/uid11))

## [v0.15.5](https://github.com/joomcode/e2ed/tree/v0.15.5) (2023-10-29)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.4...v0.15.5)

- [Merge pull request #39 from joomcode/feat/time-with-units-everywhere](https://github.com/joomcode/e2ed/commit/4ffbd76ab1fb815521f8395c194e5a3f814168dd) ([uid11](https://github.com/uid11))

  feat: use duration with units everywhere

- [feat: use duration with units everywhere](https://github.com/joomcode/e2ed/commit/01440bc4d11705d6ac4ee3cedc46fee5cf48f32c) ([uid11](https://github.com/uid11))

  fix: add `autotests/configurator` directory

  docs: add `README.md` to `autotests/configurator` directory

  chore: update devDependencies (`eslint`, `@types/node`, etc)

  chore: update `create-locator` to 0.0.18

  fix: change `tsconfig.json` options to more explicit ones (`"module": "CommonJS"`)

- [Merge pull request #38 from joomcode/FI-901](https://github.com/joomcode/e2ed/commit/b401f8323cdb0d19ffeb380e75ccdd83fac13e0f) ([nnn3d](https://github.com/nnn3d))

  fix(report): link color styles for dark theme

- [fix(report): color contrast and var name](https://github.com/joomcode/e2ed/commit/7d09f1c37edd9f7dd6e8ad064f2863f519c544b4) ([nnn3d](https://github.com/nnn3d))
- [fix(report): link color styles for dark theme](https://github.com/joomcode/e2ed/commit/7cf3da6c6db555969f8d3b7098c96a92f952df76) ([nnn3d](https://github.com/nnn3d))

## [v0.15.4](https://github.com/joomcode/e2ed/tree/v0.15.4) (2023-10-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.3...v0.15.4)

- [Merge pull request #37 from joomcode/fix/duration-in-report](https://github.com/joomcode/e2ed/commit/ddc43f861181c956176823fa8f6c08bf9ce04e4e) ([uid11](https://github.com/uid11))

  fix: error with output of duration in HTML report

- [fix: error with output of duration in HTML report](https://github.com/joomcode/e2ed/commit/20377ff8041a1e6444ec1e000471862b1c1b894f) ([uid11](https://github.com/uid11))

  chore: turn on rule `@typescript-eslint/naming-convention`

## [v0.15.3](https://github.com/joomcode/e2ed/tree/v0.15.3) (2023-10-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.2...v0.15.3)

- [Merge pull request #36 from joomcode/feature/update-get-modules-graph](https://github.com/joomcode/e2ed/commit/e24ca1a049b7993b03054e95f5bb2d3fbce04eca) ([uid11](https://github.com/uid11))

  chore: update `get-modules-graph` to 0.0.9

- [chore: update `get-modules-graph` to 0.0.9](https://github.com/joomcode/e2ed/commit/e30bd34be3f565f7a8162e8af42f16fa456c9cb2) ([uid11](https://github.com/uid11))

  chore: update devDependencies (eslint, @typescript-eslint/\*, etc)

  fix: add type `FilePathFromRoot` to public API

  fix: duration for long time intervals (in HTML report)

## [v0.15.2](https://github.com/joomcode/e2ed/tree/v0.15.2) (2023-09-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.1...v0.15.2)

- [Merge pull request #35 from joomcode/fix/update-config-after-do-before-functions](https://github.com/joomcode/e2ed/commit/15a0eb2c38d439df863dff1eab2029159b3c6578) ([uid11](https://github.com/uid11))

  fix: update pack config by values from `doBeforePack` functions

- [fix: update pack config by values from `doBeforePack` functions](https://github.com/joomcode/e2ed/commit/071675ee4102d8806d50ae558ee2cc6adbcf5e32) ([uid11](https://github.com/uid11))

## [v0.15.1](https://github.com/joomcode/e2ed/tree/v0.15.1) (2023-09-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.15.0...v0.15.1)

- [Merge pull request #34 from joomcode/fix/deps-in-docker-image](https://github.com/joomcode/e2ed/commit/0e82cdd6035b8818e6d234ff91f148f32c30572a) ([uid11](https://github.com/uid11))

  fix: error with `get-modules-graph` dependencies in docker image

- [fix: error with `get-modules-graph` dependencies in docker image](https://github.com/joomcode/e2ed/commit/72fa9ce55498e0fea5470d63b55ffc27ea82db66) ([uid11](https://github.com/uid11))

  fix: typo in CHANGELOG.md

  chore: update eslint to 8.50.0

  refactor: move `mapLogPayloadInConsole` to utils

## [v0.15.0](https://github.com/joomcode/e2ed/tree/v0.15.0) (2023-09-21)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.19...v0.15.0)

- [Merge pull request #33 from joomcode/feature/add-get-modules-graph](https://github.com/joomcode/e2ed/commit/48c3e3658e92873175045213048900a8a4e66a29) ([uid11](https://github.com/uid11))

  feat: add get modules graph

- [feat: add `get-modules-graph` package to reexport from `e2ed`](https://github.com/joomcode/e2ed/commit/555daf5b5a634745e98d89e67f4c55acf47cd652) ([uid11](https://github.com/uid11))

  feat: add `globby` package to reexport from `e2ed`

- [chore: update devDependencies (@types/node, @typescript-eslint/\*, eslint)](https://github.com/joomcode/e2ed/commit/14956aee8a6342b6a0a5effaea627fe79c220406) ([uid11](https://github.com/uid11))
- [feat: support markdown links in meta values in HTML report](https://github.com/joomcode/e2ed/commit/793ffdc7ca4c1d16b33a24c186e13b3d7f4a0ab5) ([uid11](https://github.com/uid11))

  feat: add `parseMarkdownLinks` client function for report

- [feat: add `stabilizationInterval` field to pack config](https://github.com/joomcode/e2ed/commit/c2dc91cf78d383d10ee2dbd1fefeceaf523cbb80) ([uid11](https://github.com/uid11))

  feat: add `stabilizationInterval` option to all actions with `waitForInterfaceStabilization`

- [refactor: rename `getLocatorFromSelector` to `getDescriptionFromSelector`](https://github.com/joomcode/e2ed/commit/fda2c3264a529ba0c38256130570a16e28fb48fb) ([uid11](https://github.com/uid11))

## [v0.14.19](https://github.com/joomcode/e2ed/tree/v0.14.19) (2023-08-30)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.18...v0.14.19)

- [Merge pull request #32 from joomcode/fix/reading-locator-key](https://github.com/joomcode/e2ed/commit/83bdbef35b72168f5fb115a4676d55e617094f46) ([uid11](https://github.com/uid11))

  fix: reading locator key from expect argument

- [chore: update TestCafe to 3.3.0](https://github.com/joomcode/e2ed/commit/bcbc2b76917d625960ea0775ef27d4880494898a) ([uid11](https://github.com/uid11))
- [fix: error with reading locator key from argument of expect function](https://github.com/joomcode/e2ed/commit/a0ea06fb5faaa9f8dc25e744ba8160589051c2a0) ([uid11](https://github.com/uid11))

## [v0.14.18](https://github.com/joomcode/e2ed/tree/v0.14.18) (2023-08-29)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.17...v0.14.18)

- [Merge pull request #31 from joomcode/feature/update-dependencies](https://github.com/joomcode/e2ed/commit/bd948bb8497bdbf2573226490a703b9818da5127) ([uid11](https://github.com/uid11))

  chore: update dependencies

- [refactor: rename getCssSelectorFromSelector to getCssSelectorStringFromSelector](https://github.com/joomcode/e2ed/commit/cd509a88846e586544823ede0d54f1d75eec3533) ([uid11](https://github.com/uid11))
- [chore: update alpine to 3.18.3](https://github.com/joomcode/e2ed/commit/25cdb3c670c76f5d0fe3fc33d54ce8898d714d30) ([uid11](https://github.com/uid11))

  fix: add error with message when dockerImage is missed in pack config

  fix: add CSS selector string (if any) to logs of expect function

  fix: add getCssSelectorFromSelector to public API (to e2ed/utils)

- [chore: update TestCafe to 3.2.0; update testcafe-hammerhead](https://github.com/joomcode/e2ed/commit/7c9329c3bfb8698b106e7331ad05ab4553d0cc23) ([uid11](https://github.com/uid11))
- [fix: bash flags for Mac OS](https://github.com/joomcode/e2ed/commit/b82d5f06f5d2f975a87301549a02bb2a0129051b) ([uid11](https://github.com/uid11))

  chore: update devDependencies (eslint, typescript)

## [v0.14.17](https://github.com/joomcode/e2ed/tree/v0.14.17) (2023-07-16)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.16...v0.14.17)

- [Merge pull request #30 from joomcode/feature/add-max-step-between-requests](https://github.com/joomcode/e2ed/commit/ca97f187b67a931660bd82c5e24600744aead883) ([uid11](https://github.com/uid11))

  feat: add maxIntervalBetweenRequestsInMs option to waitForAllRequestsComplete

- [chore: update devDependencies (@types/node and eslint)](https://github.com/joomcode/e2ed/commit/085e8e3f36736b94288096bd1d5b4171ae9c32ef) ([uid11](https://github.com/uid11))
- [feat: add maxIntervalBetweenRequestsInMs option to waitForAllRequestsComplete](https://github.com/joomcode/e2ed/commit/c2c5d989141ac98c8c910e4fbb019e6d031dda85) ([uid11](https://github.com/uid11))

  tests: add more tests for waitForAllRequestsComplete function

  refactor: use E2edError instead of Error in internal runtime tests

## [v0.14.16](https://github.com/joomcode/e2ed/tree/v0.14.16) (2023-07-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.15...v0.14.16)

- [Merge pull request #29 from joomcode/feat/add-wait-time-to-wait-for](https://github.com/joomcode/e2ed/commit/19c616c7279913bab07d134417b7fdb0dc4c5cd9) ([uid11](https://github.com/uid11))

  feat: add wait time to all wait-for actions

- [feat: add wait time to all wait-for actions](https://github.com/joomcode/e2ed/commit/7876d68b7a175f9c8056c63e124b944c0531df9c) ([uid11](https://github.com/uid11))

## [v0.14.15](https://github.com/joomcode/e2ed/tree/v0.14.15) (2023-07-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.14...v0.14.15)

- [Merge pull request #28 from joomcode/fix/log-urls-of-uncomplete-requests](https://github.com/joomcode/e2ed/commit/d6137f1c2b4d2d95335ff2a54b17b72861e88af0) ([uid11](https://github.com/uid11))

  fix(waitForAllRequestsComplete): add urls of not complete requests to logs

- [chore: update @typescript-eslint/\* to 6.0.0](https://github.com/joomcode/e2ed/commit/cbb88e9f67a82d4c809698da2c776dce65f08949) ([uid11](https://github.com/uid11))
- [fix: add urls of not complete requests to logs (for waitForAllRequestsComplete)](https://github.com/joomcode/e2ed/commit/00867dac19a03dae48963b7b301f929fe36c4dc3) ([uid11](https://github.com/uid11))

## [v0.14.14](https://github.com/joomcode/e2ed/tree/v0.14.14) (2023-07-10)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.13...v0.14.14)

- [Merge pull request #27 from joomcode/feature/add-wait-for-all-requests-complete](https://github.com/joomcode/e2ed/commit/9cb516ce61bf15404c933dd9ce055ccacb9edc2d) ([uid11](https://github.com/uid11))

  feat: add waitForAllRequestsComplete function

- [chore: update @types/node to 20.4.1](https://github.com/joomcode/e2ed/commit/e16715478299e90429695d03d2aa07e04a01f75d) ([uid11](https://github.com/uid11))
- [fix: error with unnecessary clear resolve timeout in waitForAllRequestsComplete](https://github.com/joomcode/e2ed/commit/94345fe5ed10b4d2fbaec7d06039efbac91c80fa) ([uid11](https://github.com/uid11))
- [chore: update prettier to 3.0](https://github.com/joomcode/e2ed/commit/6e7f090b641238d61a2cbaabe5111a5fdba0f25e) ([uid11](https://github.com/uid11))

  fix: Incomplete URL substring sanitization issues from CodeQL

- [feat: do not render empty content of test run step](https://github.com/joomcode/e2ed/commit/070f21978ab02963051f0b80bc02a09061cef9ee) ([uid11](https://github.com/uid11))
- [chore: update TestCafe to 3.0.1 and create-locator to 0.0.15](https://github.com/joomcode/e2ed/commit/fe613a26f3447ec1c10abcbc372151f1f2cdd9b3) ([uid11](https://github.com/uid11))

  fix: steps with screenshot of error is opened from the beginning

- [chore: update devDependencies (eslint, typescript, etc)](https://github.com/joomcode/e2ed/commit/f467454bd41c5d06feca088d20d9b6b4fe77b0fc) ([uid11](https://github.com/uid11))
- [feat: add waitForAllRequestsComplete function](https://github.com/joomcode/e2ed/commit/93356e276399b132267d5d65901915af9c4f6359) ([uid11](https://github.com/uid11))

  feat: add waitForPageLoaded method to base Page class

  feat: add util setReadonlyProperty

## [v0.14.13](https://github.com/joomcode/e2ed/tree/v0.14.13) (2023-06-09)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.12...v0.14.13)

- [Merge pull request #26 from joomcode/fix/end-hung-retry-timeout](https://github.com/joomcode/e2ed/commit/c2577c44e5f520375d76f2122c9a694b33f48e96) ([uid11](https://github.com/uid11))

  fix: reset last log event time on each retry

- [fix: reset last log event time on each retry](https://github.com/joomcode/e2ed/commit/a43eef2638e3bc19a66a58fa702b0268b61ad6bd) ([uid11](https://github.com/uid11))

## [v0.14.12](https://github.com/joomcode/e2ed/tree/v0.14.12) (2023-06-08)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.11...v0.14.12)

- [Merge pull request #25 from joomcode/fix/end-hung-retray-by-file](https://github.com/joomcode/e2ed/commit/0724633d57178d6640f788bc333f37bc45305c59) ([uid11](https://github.com/uid11))

  fix: end hung retray in timeout by last log event date

- [chore: update devDependencies (@typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/1a4174e63e4106b8f45f5ce4f3c0905b9b81e3ec) ([uid11](https://github.com/uid11))
- [fix: end hung retray in timeout by last log event date](https://github.com/joomcode/e2ed/commit/1ac1656021650fed3a01604b6d6eac2e3b0a7bd2) ([uid11](https://github.com/uid11))

## [v0.14.11](https://github.com/joomcode/e2ed/tree/v0.14.11) (2023-06-04)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.10...v0.14.11)

- [Merge pull request #24 from joomcode/fix/end-hung-retray](https://github.com/joomcode/e2ed/commit/5f8bd849a1aa5f7f9d4435c40a441e4d921242a3) ([uid11](https://github.com/uid11))

  feat: end hung retry

- [chore: update devDependencies (eslint to 8.42.0)](https://github.com/joomcode/e2ed/commit/12747fa54cc58d8b17540473dbac3ab721a13ea2) ([uid11](https://github.com/uid11))
- [feat: kill TestCafe processes occupying ports after each retry](https://github.com/joomcode/e2ed/commit/2180cf490be7a2c72f47db21ef29c02e61f9c6b7) ([uid11](https://github.com/uid11))
- [chore: update devDependencies and TestCafe (to 2.6.2)](https://github.com/joomcode/e2ed/commit/28986547fb6e7393f1cd92c319d0478f357ce6c1) ([uid11](https://github.com/uid11))

## [v0.14.10](https://github.com/joomcode/e2ed/tree/v0.14.10) (2023-05-03)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.9...v0.14.10)

- [Merge pull request #23 from joomcode/feature/update-docs-about-local-run](https://github.com/joomcode/e2ed/commit/874d40c897fec21de7040661545275fb3e70723d) ([uid11](https://github.com/uid11))

  feat: add pack ./autotests/packs/local.ts to e2ed-init command

- [chore: update devDependencies (@types/node, @typescript-eslint/\*, etc)](https://github.com/joomcode/e2ed/commit/6a8ec37f6372db730615b434f8ef50d51efc0418) ([uid11](https://github.com/uid11))
- [feat: add getDocumentTitle utility](https://github.com/joomcode/e2ed/commit/826293b598a2c83c8de02f94eb5afc56611170d5) ([uid11](https://github.com/uid11))

  refactor: rename utility getCurrentUrl to getDocumentUrl

  fix: error with timeout option in request utility

  tests: add tests for request utility

- [chore: update devDependencies (@types/node, eslint, prettier, etc)](https://github.com/joomcode/e2ed/commit/e7ab7d1c5c11a1904c09430cc694dc6ed8aad6af) ([uid11](https://github.com/uid11))

  docs: add E2ED_DEBUG to README.md item about debugging tests

- [feat: add pack ./autotests/packs/local.ts to e2ed-init command](https://github.com/joomcode/e2ed/commit/9c1664279cb4af1abaa6639defa37c6c95c0eb33) ([uid11](https://github.com/uid11))

  docs: add brief item about debugging tests

## [v0.14.9](https://github.com/joomcode/e2ed/tree/v0.14.9) (2023-04-17)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.8...v0.14.9)

- [Merge pull request #22 from joomcode/fix/read-json-report-data](https://github.com/joomcode/e2ed/commit/263e5d8eb5fc0dba17064abcc87dcc4d1ffba8a6) ([uid11](https://github.com/uid11))

  fix: mechanism of reading JSON report data from scripts

- [chore: update devDependencies (@typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/a5c3b9b1419da158b7b24bc57d61c3856d5186e8) ([uid11](https://github.com/uid11))
- [fix: mechanism of reading JSON report data from scripts fix: open last retry as default retry in HTML report](https://github.com/joomcode/e2ed/commit/3e1ba1c3e2d7271698f44602b87894cbd0c6db1e) ([uid11](https://github.com/uid11))

## [v0.14.8](https://github.com/joomcode/e2ed/tree/v0.14.8) (2023-04-15)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.7...v0.14.8)

## [v0.14.7](https://github.com/joomcode/e2ed/tree/v0.14.7) (2023-04-15)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.6...v0.14.7)

## [v0.14.6](https://github.com/joomcode/e2ed/tree/v0.14.6) (2023-04-15)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.5...v0.14.6)

- [Merge pull request #21 from joomcode/feature/fast-errors-loading-in-report](https://github.com/joomcode/e2ed/commit/5d050b9e6b5f23e0440ebd9a5424bc2e30ee9a37) ([uid11](https://github.com/uid11))

  feat: fast errors loading (tests with errors) in HTML report

- [feat: fast errors loading (tests with errors) in HTML report](https://github.com/joomcode/e2ed/commit/c97464f33c03c42455d8297ea2622f32fc50aee7) ([uid11](https://github.com/uid11))

  feat: support nativeAutomation field in pack config (new TestCafe option)

  fix: support nativeAutomation in navigateToUrl action

  fix: load screenshots in HTML report immediately

## [v0.14.5](https://github.com/joomcode/e2ed/tree/v0.14.5) (2023-04-14)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.4...v0.14.5)

- [Merge pull request #20 from joomcode/feature/add-screenshots-to-report](https://github.com/joomcode/e2ed/commit/88ee935cd993394af8ec98e8e0da09cb9d7abf4b) ([uid11](https://github.com/uid11))

  feat: add screenshots with error in HTML report

- [feat: read warnings from TestCafe and logs it as usual logs](https://github.com/joomcode/e2ed/commit/863df16e514c6d437af5528d8332b6ce0b75a2af) ([uid11](https://github.com/uid11))
- [chore: update testcafe-without-typecheck and create-locator](https://github.com/joomcode/e2ed/commit/c5320c368186b54c470b343f86799d672513f138) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@typescript-eslint/\*, eslint, typescript, etc)](https://github.com/joomcode/e2ed/commit/fc9f5413f292469e12011ff021108d8895b51a3b) ([uid11](https://github.com/uid11))

  fix: display retry errors in console (for run in docker)

  chore: update testcafe-reporter-for-e2ed (include TestCafe warnings in logs)

  refactor: rename START_TIME_VARIABLE_NAME to START_TIME_IN_MS_VARIABLE_NAME

- [feat: add screenshots with error in HTML report](https://github.com/joomcode/e2ed/commit/cd5db557b605af80631263765d9c80c759d63753) ([uid11](https://github.com/uid11))

  docs: update "Adding e2ed to a project" guide

  feat: add field pathToScreenshotsDirectoryForReport to pack config

  chore: update testcafe-reporter-for-e2ed (support warnings)

  fix: use Green instead of GreenBright for console logs

  refactor: remove unnecessary prefix e2ed from reportClientState fields

  fix: error with saving screenshots with double quotes in names

  fix: error messages for rules "one test in one file" and "test name is unique"

## [v0.14.4](https://github.com/joomcode/e2ed/tree/v0.14.4) (2023-04-02)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.3...v0.14.4)

- [Merge pull request #19 from joomcode/fix/local-run-and-logs](https://github.com/joomcode/e2ed/commit/40f837948c73c94192c0467a2b3faf6b8af8389b) ([uid11](https://github.com/uid11))

  fix: error with local run and skipped general logs in pack logs file

- [fix: error with local run (because of testcafe-reporter-for-e2ed)](https://github.com/joomcode/e2ed/commit/ea9d3f613b8e8d0a210c24be445e685b5fabfbd7) ([uid11](https://github.com/uid11))

  docs: format of list in README.md

  docs: add example of mapLogPayloadInConsole

  feat: add assert-modules-support-case-insensitive-fs and assert-package-lock-is-consistent

  fix: code of mapLogPayload-functions in logs

  fix: write all general logs to pack logs file

## [v0.14.3](https://github.com/joomcode/e2ed/tree/v0.14.3) (2023-04-01)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.2...v0.14.3)

- [Merge pull request #18 from joomcode/fix/exclude-tests-outside-of-packs](https://github.com/joomcode/e2ed/commit/2d6be9304fa44db8a9f5ab0fb329c88a2fafa57d) ([uid11](https://github.com/uid11))

  fix: exclude tests that are outside of the packs

- [chore: update TypeScript to 5.0](https://github.com/joomcode/e2ed/commit/c307e50380776889fb8fb1e914e59ff8fb07d4fd) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@types/node, eslint, etc)](https://github.com/joomcode/e2ed/commit/d4f404028d1ce4afe4cb22ffa2d75c9259959971) ([uid11](https://github.com/uid11))
- [feat: add successful test run counts in test run result logs](https://github.com/joomcode/e2ed/commit/4ccc018080e2c57a11be9930dcb79b29772300bb) ([uid11](https://github.com/uid11))

  fix: typo in FAILED_TEST_RUN_STATUSES JSDoc

- [fix: add stackTrace to runError from TestCafe](https://github.com/joomcode/e2ed/commit/12a971b2073602db919b229b1775628d58942bdd) ([uid11](https://github.com/uid11))

  feat: print summary pack results in logs

- [fix: presentation of test run error in logs](https://github.com/joomcode/e2ed/commit/3df979f86110cb9d9cf914c6775a372117e6212f) ([uid11](https://github.com/uid11))

  fix: presentation of E2edError in JSON

  fix: presentation of multiline assertions in logs

  fix: presentation of functions in logs

- [feat: print status of test run on test run end](https://github.com/joomcode/e2ed/commit/80c13595eee22d06bb388adb009c3e53fe122ab5) ([uid11](https://github.com/uid11))

  refactor: use "HTML report" instead of "html report" :)

  feat: remove text style from log messages

- [feat: add fields takeFullPageScreenshotOnError/takeViewportScreenshotOnError to pack config](https://github.com/joomcode/e2ed/commit/40d2a660de78eb9c1a4c1b994439d90d73696d85) ([uid11](https://github.com/uid11))

  fix: error with Google main page input locator (sometimes it's textarea)

  fix: error with copying test result from local build to docker build

  fix: order of test statuses for printing

- [refactor: rename cssSelector to createSelectorByCss](https://github.com/joomcode/e2ed/commit/3f5e2a2318e9a371f073ed98f061baea292fc85a) ([uid11](https://github.com/uid11))

  fix: error with run in docker with locally installed e2ed package

  fix: error with printing of functions in steps in HTML report

- [feat: add testcafe-reporter-for-e2ed instead of testcafe-reporter-spec](https://github.com/joomcode/e2ed/commit/70cbf8bd7d68cdb7b0164d3011237e2e2fb38d14) ([uid11](https://github.com/uid11))
- [fix: add field mapLogPayloadInReport in pack config](https://github.com/joomcode/e2ed/commit/07505b6718c7cad1f84a7ae37f3b5b857d8a4c86) ([uid11](https://github.com/uid11))

  refactor: rename config field mapLogPayloadInFile to mapLogPayloadInLogFile

  fix: add MapLogPayload-types in PackSpecificTypes generic type

- [feat: add fields mapLogPayloadInConsole/mapLogPayloadInFile to pack config](https://github.com/joomcode/e2ed/commit/e49ef274ee7a72d23e26746a967681fc8a6466f7) ([uid11](https://github.com/uid11))

  feat: remove field printLogsInConsole from pack config

  docs: in the comments, highlight JS-values with apostrophes

- [feat: join test logs and general logs to single logs stream](https://github.com/joomcode/e2ed/commit/235b137a7a12b49bd0178b19e4f6b02a50528ffe) ([uid11](https://github.com/uid11))

  fix: add readonly modifier to indexed types (to Records)

- [fix: add list of not included in pack tests](https://github.com/joomcode/e2ed/commit/33221a6c5d398aa4fd650d63359420f37df7cfda) ([uid11](https://github.com/uid11))

  fix: do not run not included in pack test in retry

  fix: skip test that not included in pack in unvisited test files assert

  fix: use objects without prototype for hashes with arbitrary string keys

  fix: throw an error if test file is duplicate in "not included in pack test" files

  fix: exit with code 2 if there are unvisited test files

  fix: attributes of empty script tag in HTML report (for Firefox bug)

- [fix: import create-locator in tests directly](https://github.com/joomcode/e2ed/commit/ea108569a89f37a37b9ea8d6f648e50fbe464636) ([uid11](https://github.com/uid11))

  fix: add create-locator in e2ed container as everywhere available package

  docs: add item "Adding e2ed to a project" to README.md

  docs: describe packs and commands to run packs in README.md

  fix: extra \" in assertPage logs

  fix: exit from e2ed with positive code if there are global errors

  fix: Firefox error with <script async type=module>...

## [v0.14.2](https://github.com/joomcode/e2ed/tree/v0.14.2) (2023-03-09)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.1...v0.14.2)

- [Merge pull request #17 from joomcode/feature/add-create-locator](https://github.com/joomcode/e2ed/commit/eadb4027b02b3e9b3a3a23ab8ac261a5c6a766b1) ([uid11](https://github.com/uid11))

  feat: add create-locator

- [feat: add create-locator@0.0.3](https://github.com/joomcode/e2ed/commit/f06ed5cd72221764135ed0897bf439c05e4a30dd) ([uid11](https://github.com/uid11))

  chore: update TestCafe to 2.4.0

- [chore: update devDependencies (@typescript-eslint/\*, etc)](https://github.com/joomcode/e2ed/commit/97900782df86d212770565391664b6f71643b89d) ([uid11](https://github.com/uid11))
- [fix: type of liteReport.startInfo.fullPackConfig in userland](https://github.com/joomcode/e2ed/commit/dddbc3ce581aa8e940fef0d4aa25941668533600) ([uid11](https://github.com/uid11))

  feat: add LiteReport type to PackSpecificTypes

## [v0.14.1](https://github.com/joomcode/e2ed/tree/v0.14.1) (2023-03-01)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.14.0...v0.14.1)

- [chore: update pngjs to 7.0.0 in testcafe-without-typecheck](https://github.com/joomcode/e2ed/commit/3c78624af1846cf6169963d74ef662f589ac0c2c) ([uid11](https://github.com/uid11))
- [Merge pull request #16 from joomcode/feature/add-userland-functions-types](https://github.com/joomcode/e2ed/commit/ba53913a7355626a2da6e84ccb9592470257edd2) ([uid11](https://github.com/uid11))

  feat: add userland functions types

- [feat: add failedTestsMainParams field to report and lite report](https://github.com/joomcode/e2ed/commit/091758f2b2ab38daf0907fe31af2c090291a8c85) ([uid11](https://github.com/uid11))

  refactor: rename summaryRunE2edResults to summaryPackResults

- [chore: update devDependencies (eslint, @typescript-eslint/\*, etc)](https://github.com/joomcode/e2ed/commit/d192c2e3ad18b7152f66b587512067d92b773fab) ([uid11](https://github.com/uid11))
- [chore: update @types/node to 18.14.1](https://github.com/joomcode/e2ed/commit/52592445db10416c6cf14b7df1eeb92b9c457977) ([uid11](https://github.com/uid11))
- [fix: remove import cycle with getFullPackConfig](https://github.com/joomcode/e2ed/commit/67f18125c90a3a5d97244d338e39f3f4ca6e8b5f) ([uid11](https://github.com/uid11))

  refactor: rename projectApi types to pack-specific types

  refactor: replace createProjectApi with createTestFunction

  refactor: remove GetFullPackConfigFn type

- [feat: add ready-made types for project functions](https://github.com/joomcode/e2ed/commit/1b5e7e897cf4e2f31681769a093fb99a059c3856) ([uid11](https://github.com/uid11))

  refactor: use verb 'creates' in functions JSDoc

- [chore: update pngjs to 7.0.0; update @typescript-eslint/\*](https://github.com/joomcode/e2ed/commit/f9697695ce18a790538c98b39d45d8f040c358e7) ([uid11](https://github.com/uid11))

## [v0.14.0](https://github.com/joomcode/e2ed/tree/v0.14.0) (2023-02-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.13.9...v0.14.0)

- [Merge pull request #15 from joomcode/feature/add-before-and-after-pack-functions](https://github.com/joomcode/e2ed/commit/4a540fd97bbc6a91abcc0aef2bddf9de9ee748c5) ([uid11](https://github.com/uid11))

  feat: add doBeforePack/doAfterPack fields to pack config

- [feat: add customReportProperties field to lite report](https://github.com/joomcode/e2ed/commit/70b90820b66d4810ad77c6426a3da2a3dd6a949b) ([uid11](https://github.com/uid11))

  feat: add doAfterPack field to pack config (array of functions)

  feat: add doBeforePack field to pack config (array of functions)

  refactor: organization of pack config types code

- [feat: add setCustomInspectOnFunction utility for logging functions](https://github.com/joomcode/e2ed/commit/8e1866e79a6b4909af9f5d003b013a7cec8bbc16) ([uid11](https://github.com/uid11))

  chore: updat alpine to 3.17.2 (node@18, Chrome 109)

  chore: update @types/node to 18.14.0

  fix: use setCustomInspectOnFunction instead of getFunctionCode

  refactor: separate asserts.ts to several files

  feat: add assertValueHasProperty utility

- [Merge pull request #14 from joomcode/feature/add-pack-tests-filter](https://github.com/joomcode/e2ed/commit/ac65dcc2f6a8c25ca56ee0f3d36e91fa1df55a60) ([uid11](https://github.com/uid11))

  feat: add pack tests filter

- [feat: add isTestIncludedInPack filter for tests in pack](https://github.com/joomcode/e2ed/commit/8ef47e29e8d86a13917048c8c517cba4cbbd1438) ([uid11](https://github.com/uid11))

  fix: use 'Asserts that ...' instead of 'Assert that ...' everywhere

  fix: move all project custom types to Pack type

  fix: add descriptions for all own pack config fields

  fix: move all internal environment variables to E2edEnvironment type

  fix: add printed stackTrace to E2edError

  fix: add getters and setters for internal environment variables

- [chore: update devDependencies (@typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/f6dbd6b286790573da6edb3bb72a08b2daba1331) ([uid11](https://github.com/uid11))
- [Merge pull request #13 from joomcode/feature/add-packs](https://github.com/joomcode/e2ed/commit/ab1fb2e2484084c2cb9d1b9281af2e1ca9b85e70) ([uid11](https://github.com/uid11))

  feat: add packs

- [feat: add packs support (for local and docker e2ed runs)](https://github.com/joomcode/e2ed/commit/d0fa5db9a254b97d98813bebf5bad16c8a80f1da) ([uid11](https://github.com/uid11))

  fix: rename userland config to pack

  fix: use local gitignored pack instead of overrideConfig

  fix: contributor names in CHANGELOG.md

  fix: color of test duration string in HTML report

  fix: add stacktrace to E2edError presentation

- [Merge pull request #12 from joomcode/feature/add-custom-pack-properties](https://github.com/joomcode/e2ed/commit/630f050de11689c525c742bd39b1be684a808194) ([uid11](https://github.com/uid11))

  feat: Add custom pack properties

- [chore: update eslint to 8.34.0](https://github.com/joomcode/e2ed/commit/deb65e3c362690d34f84bfd971c993922d1d61ad) ([uid11](https://github.com/uid11))
- [chore: update TestCafe to 2.3.1 (and testcafe-hammerhead to 28.4.2)](https://github.com/joomcode/e2ed/commit/e77195168c686884a68ec1ed79b162f74115ffa4) ([uid11](https://github.com/uid11))
- [feat: add test on custom pack properties](https://github.com/joomcode/e2ed/commit/44aeec78036dbb87f749d07e065808dc17d59ffa) ([uid11](https://github.com/uid11))

  fix: add JSDoc comments for all userland config properties

- [feat: add custom pack properties for customizing hooks and so on](https://github.com/joomcode/e2ed/commit/87134dc6299467918deecf151862f390911da31e) ([uid11](https://github.com/uid11))
- [chore: update prettier to 2.8.4](https://github.com/joomcode/e2ed/commit/29b14eb24f94142b5c99859068ffd12a2a291109) ([uid11](https://github.com/uid11))

  fix: clear prettier cache by npm run clear:\* command

  fix: move eslint cache file to node_modules/.cache

- [Merge pull request #11 from joomcode/feature/add-info-about-packages](https://github.com/joomcode/e2ed/commit/e4f5678b46ce886c6bd64383ea19010efefd58b3) ([uid11](https://github.com/uid11))

  feat: add info about used installed packages

- [feat: add info about used installed packages](https://github.com/joomcode/e2ed/commit/4510786d4112a5da39a9c4440eb6c614e8a70d6d) ([uid11](https://github.com/uid11))

  fix: log about errors on start e2ed

  fix: correct export of testCafeHammerheadUpPath

  fix: correct name of testcafe-hammerhead-up package

- [chore: update @types/node to 18.13.0](https://github.com/joomcode/e2ed/commit/fb8a32c1c59d77cdb24226e5afa9793bccbd7a41) ([uid11](https://github.com/uid11))

## [v0.13.9](https://github.com/joomcode/e2ed/tree/v0.13.9) (2023-02-07)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.13.8...v0.13.9)

- [chore: update @typescript-eslint/\* to 5.51.0](https://github.com/joomcode/e2ed/commit/b1e4bcc31a0397c08b009ce1dcc9abccca8c2729) ([uid11](https://github.com/uid11))
- [fix: name of testcafe-hammerhead package in testcafe-without-typecheck package](https://github.com/joomcode/e2ed/commit/9d0b40a543ca82d2b36b439519fa79c5ceb779b7) ([uid11](https://github.com/uid11))

## [v0.13.8](https://github.com/joomcode/e2ed/tree/v0.13.8) (2023-02-06)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.13.7...v0.13.8)

- [chore: update @types/node to 18.11.19](https://github.com/joomcode/e2ed/commit/2445ee06327106c9cfae13a4c1150e40a78ccf72) ([uid11](https://github.com/uid11))
- [fix: add testcafe-hammerhead fork with fix for srcset proxy url bug](https://github.com/joomcode/e2ed/commit/b6e43f7ce3b338214829bf94297b95304ad27ccb) ([uid11](https://github.com/uid11))
- [fix: reduce in next retry concurrency if no test passes](https://github.com/joomcode/e2ed/commit/dfc2fcbae856e727a3b92459affc1a0c59b50bd9) ([uid11](https://github.com/uid11))

## [v0.13.7](https://github.com/joomcode/e2ed/tree/v0.13.7) (2023-02-03)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.13.6...v0.13.7)

- [chore: update TestCafe to 2.3.0](https://github.com/joomcode/e2ed/commit/d6fa8c7f5bfef2c8c297950bbfd389889d4eeee2) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (eslint, typescript, etc)](https://github.com/joomcode/e2ed/commit/1ac71c438ee4b1d1e08b375bc11e5f9d5f346586) ([uid11](https://github.com/uid11))
- [fix: dark theme in HTML report](https://github.com/joomcode/e2ed/commit/c5273afcc9dee142699abbb6977e32c060a8dd42) ([uid11](https://github.com/uid11))

  fix: ability to copy text from HTML report

- [refactor: API routes in autotests example](https://github.com/joomcode/e2ed/commit/6c71c48e083571b75193e4e8f9631abc3beb2e34) ([uid11](https://github.com/uid11))
- [docs: add src/README.md with base dependency graph](https://github.com/joomcode/e2ed/commit/e79fd320c6fa5491ce397af3ad1043c262aaf992) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (eslint, prettier, etc)](https://github.com/joomcode/e2ed/commit/5e7081a7fd5e0e2c045d86f904539ca858ae44ad) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@typescript-eslint/\*, eslint-plugin-import)](https://github.com/joomcode/e2ed/commit/ef47f58bc825dc0352fdb19705bad6b145ceb654) ([uid11](https://github.com/uid11))

  fix: cycled import error (with valueToString)

  feat: add getTestsThatRunningAtGivenTime internal util

## [v0.13.6](https://github.com/joomcode/e2ed/tree/v0.13.6) (2023-01-09)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.13.5...v0.13.6)

- [chore: update prettier to 2.8.2](https://github.com/joomcode/e2ed/commit/10a995eb1709138d12424cdc6593b6417629497e) ([uid11](https://github.com/uid11))

## [v0.13.5](https://github.com/joomcode/e2ed/tree/v0.13.5) (2023-01-06)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.13.4...v0.13.5)

- [feat: add actions deleteCookies, getCookies and setCookies](https://github.com/joomcode/e2ed/commit/1bb8dbddd652f199778bed9266c120f7583df828) ([uid11](https://github.com/uid11))

  fix: rename assertNever to assertValueIsNever

- [fix: stable path to compiled config](https://github.com/joomcode/e2ed/commit/2d2e097b7c6e31af8708b11cba81e9aef31adfc0) ([uid11](https://github.com/uid11))
- [fix: add copying of .gitignore to e2ed init command](https://github.com/joomcode/e2ed/commit/0218d1b31c32c1e7f8af3c01857dd885a798eff9) ([uid11](https://github.com/uid11))

## [v0.13.4](https://github.com/joomcode/e2ed/tree/v0.13.4) (2023-01-04)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.13.3...v0.13.4)

- [fix: in docker run e2ed from image (instead of copied local e2ed)](https://github.com/joomcode/e2ed/commit/b1deae2f95fbf77288e958180314c8edf7b86197) ([uid11](https://github.com/uid11))
- [fix: add test of e2ed dependencies (matches with testcafe-without-typecheck dependencies)](https://github.com/joomcode/e2ed/commit/dc90ae69bee5b191a3a5b120d4994757c74dcfec) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@typescript-eslint/\*, husky, etc)](https://github.com/joomcode/e2ed/commit/589f6874b3340a1f8f339df78c7134299522fb42) ([uid11](https://github.com/uid11))
- [fix: install e2ed dependencies via npm install in docker image](https://github.com/joomcode/e2ed/commit/c5e30096cc589062ebddc1215b50a99faaa542fa) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (eslint, @typescript-eslint/\*, @types/node)](https://github.com/joomcode/e2ed/commit/c75d83b0d52a7c447aaf9ef4e61e75f89ab4e0a0) ([uid11](https://github.com/uid11))
- [fix: TypeScript errors on compiling e2ed config](https://github.com/joomcode/e2ed/commit/daf23e3bda8268dd2fb38bc7264df7ae1d9c25a6) ([uid11](https://github.com/uid11))
- [style: add some eslint max-rules (max-depth, max-lines, etc)](https://github.com/joomcode/e2ed/commit/24a001adead0219db5a4acf5a472d8604dbc06fd) ([uid11](https://github.com/uid11))

## [v0.13.3](https://github.com/joomcode/e2ed/tree/v0.13.3) (2022-12-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.13.2...v0.13.3)

- [fix: add bin-v8-flags-filter to main dependencies](https://github.com/joomcode/e2ed/commit/abcd5ed9c737a494ca0d94f86d60ede634c5de05) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (eslint, @types/node, ...)](https://github.com/joomcode/e2ed/commit/814d0a17a9440bc400f55f06a4e04ba97e87272f) ([uid11](https://github.com/uid11))

## [v0.13.2](https://github.com/joomcode/e2ed/tree/v0.13.2) (2022-12-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.13.1...v0.13.2)

- [feat: use import type instead of import for types in split imports script](https://github.com/joomcode/e2ed/commit/a89b0bd2b46633acadd51b922e4b23d7524f5d6d) ([uid11](https://github.com/uid11))

## [v0.13.1](https://github.com/joomcode/e2ed/tree/v0.13.1) (2022-12-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.13.0...v0.13.1)

- [chore: update devDependencies (@typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/c2d27db2d745bd15743d2a3f3b885946b19c66d8) ([uid11](https://github.com/uid11))
- [feat: add temporary scripts for splitting imports (autotests or e2ed)](https://github.com/joomcode/e2ed/commit/8231b93cf6a9b687ce8eb81891e3be99cd3488c7) ([uid11](https://github.com/uid11))
- [feat: add assertSelectorEntirelyInViewport/assertSelectorInViewport](https://github.com/joomcode/e2ed/commit/bdcbda470992484b07305facc24d18ea4b28d564) ([uid11](https://github.com/uid11))

  refactor: utils about distance between selectors

## [v0.13.0](https://github.com/joomcode/e2ed/tree/v0.13.0) (2022-12-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.17...v0.13.0)

- [feat: add utils isSelectorEntirelyInViewport/isSelectorInViewport](https://github.com/joomcode/e2ed/commit/9b86bbd2976b5e0aa28d314daf65ed989de00863) ([uid11](https://github.com/uid11))
- [fix: calculate real-time path to installed e2ed package directory](https://github.com/joomcode/e2ed/commit/89650ba9b107d11ae29c8369cb17dda12b9c098a) ([uid11](https://github.com/uid11))

  docs: fix name of directory with autotests code in README.md

  fix: init command use real path to installed e2ed package

  docs: Renders instead of Render in JSDoc description of render functions

- [feat: use src directory instead of src/package for package source code](https://github.com/joomcode/e2ed/commit/93221f5376a45e6887dc8154fde857e485193a2f) ([uid11](https://github.com/uid11))

  fix: path to compiled userland config (from package)

- [chore: update devDependencies (eslint, prettier, typescript, typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/72a8c0637ba30b97677830f9bd0711fcea44e242) ([uid11](https://github.com/uid11))

  fix: TypeScript errors with building (restore symlink to node_modules/e2ed)

- [feat: use separate namespaces for import from package and from project](https://github.com/joomcode/e2ed/commit/bd74d79cd9ddc8153c698a9af4437a2254b24bce) ([uid11](https://github.com/uid11))

  feat: rename e2ed directory to autotests (separate namespace)

  feat: import types TestMeta and SkipTests from userland project code

  fix: remove setMeta from public API (metadata is immutable during the test run)

  fix: do not import from internal.ts in index.ts (not to import too much)

- [feat: add createTestFunction in e2ed's API instead of it/test/task](https://github.com/joomcode/e2ed/commit/deac7441d675bc834c8c2ace0b34420eefd839f9) ([uid11](https://github.com/uid11))

  feat: directly read hooks from userland (in createTestFunction)

  feat: remove unnecessary internal userland types checks

  feat: add autotests bare import for project utils

## [v0.12.17](https://github.com/joomcode/e2ed/tree/v0.12.17) (2022-12-02)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.16...v0.12.17)

- [fix: use custom navigateToUrl function instead of navigateTo from TestCafe](https://github.com/joomcode/e2ed/commit/345249e25952aef1ecfc79dc449aaaf3622d50c6) ([uid11](https://github.com/uid11))

  fix: rerun client functions (waitForInterfaceStabilization), rejected by page unload

## [v0.12.16](https://github.com/joomcode/e2ed/tree/v0.12.16) (2022-12-01)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.15...v0.12.16)

- [fix: skip waitForInterfaceStabilization if stabilization internal equals 0](https://github.com/joomcode/e2ed/commit/a9c458151949b29955d51df1fc43215f5b832e67) ([uid11](https://github.com/uid11))

  fix: skip client function, rejected due to page unload

## [v0.12.15](https://github.com/joomcode/e2ed/tree/v0.12.15) (2022-12-01)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.14...v0.12.15)

- [chore: update @types/node to 18.11.10](https://github.com/joomcode/e2ed/commit/a4d9db4f2b96d6d67d89f48e21461e82d6d490c2) ([uid11](https://github.com/uid11))
- [fix: make log function synchronous again (for simplicity)](https://github.com/joomcode/e2ed/commit/3ecfd0140b2cea1b180bbe951d7e46af04f5dd65) ([uid11](https://github.com/uid11))

  fix: remove request mock hook when it is unnecessary

## [v0.12.14](https://github.com/joomcode/e2ed/tree/v0.12.14) (2022-11-29)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.13...v0.12.14)

- [fix: client function actions timeouts is equal to test idle timeouts](https://github.com/joomcode/e2ed/commit/a7e7c6efb945d51edc96e54bf8ed9f94dd3f45bc) ([uid11](https://github.com/uid11))

## [v0.12.13](https://github.com/joomcode/e2ed/tree/v0.12.13) (2022-11-29)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.12...v0.12.13)

- [fix: error with cycle imports in createClientFunction](https://github.com/joomcode/e2ed/commit/d1a901a58565eeb097e1f26e73b19fc9f1220f76) ([uid11](https://github.com/uid11))

  feat: add summaryRunE2edResults field to JSON lite report

## [v0.12.12](https://github.com/joomcode/e2ed/tree/v0.12.12) (2022-11-29)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.11...v0.12.12)

- [fix: move flag isNeedRerunClientFunction into call context](https://github.com/joomcode/e2ed/commit/b173af356115a221cccc4dc3eda10a1209d3977a) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@typescript-eslint/\*, prettier)](https://github.com/joomcode/e2ed/commit/7373909f4de05fee54f39b5f42b1c345f5d7b029) ([uid11](https://github.com/uid11))
- [fix: rerun client function after "interrupted by page unload" error](https://github.com/joomcode/e2ed/commit/aa87c77d20a9fc662477cca9b58e2e308ef08d6f) ([uid11](https://github.com/uid11))

  refactor: client function wrappers

  refactor: simplify waitForInterfaceStabilization

  fix: add getFunctionCode utility

- [feat: get errors messages from client functions](https://github.com/joomcode/e2ed/commit/b106b0fdcfd21cb64169c133ea156a3fc5745229) ([uid11](https://github.com/uid11))

  refactor: createTestRunCallback support throwExceptionAtCallPoint parameter

- [chore: update eslint to 8.28.0](https://github.com/joomcode/e2ed/commit/8e04b3f58a67fbbc1ffdce4955082748498d1732) ([uid11](https://github.com/uid11))
- [refactor: rename E2EDError to E2edError (strict CamelCase)](https://github.com/joomcode/e2ed/commit/33af72446cfede7597962ce225e18c1de3879203) ([uid11](https://github.com/uid11))

  fix: log errors with losing TestCafe test context

  fix: log errors in test run callback (like RequestHook events)

  refactor: more separate directories for internal utils

- [fix: init JS in HTML report as soon as possible](https://github.com/joomcode/e2ed/commit/beeff9c37d7cd74bc612823cb27234978c0ccb64) ([uid11](https://github.com/uid11))

## [v0.12.11](https://github.com/joomcode/e2ed/tree/v0.12.11) (2022-11-18)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.10...v0.12.11)

- [fix: import correct version of testcafe-hammerhead](https://github.com/joomcode/e2ed/commit/f8ce0f67074f04174a0bd9522ad4f1ec5be47ed1) ([uid11](https://github.com/uid11))

  refactor: add types to "require" function

## [v0.12.10](https://github.com/joomcode/e2ed/tree/v0.12.10) (2022-11-17)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.9...v0.12.10)

- [chore: update devDependencies (includes TypeScript to 4.9.3)](https://github.com/joomcode/e2ed/commit/22933eddb031f4cdcedce1459db757a64e3c0294) ([uid11](https://github.com/uid11))
- [refactor: rename route params to routeParams](https://github.com/joomcode/e2ed/commit/9d893d57d62483ba98415a89c9a8f68120c188a9) ([uid11](https://github.com/uid11))

  fix: remove unnecessary peer dependencies

  refactor: rename "request/response body in JSON format" flags

  fix: error with empty request body in mock API routes

- [fix: separate messages in CHANGELOG.md start on a new line](https://github.com/joomcode/e2ed/commit/4abcc4a7fd836ff8f5e0bad03e7e3c9b8b10310c) ([uid11](https://github.com/uid11))

## [v0.12.9](https://github.com/joomcode/e2ed/tree/v0.12.9) (2022-11-14)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.8...v0.12.9)

- [chore: update TestCafe to 2.1.0 and husky to 8.0.2](https://github.com/joomcode/e2ed/commit/68515c5c60ce331030b3ad3ee7eb55929dc8b389) ([uid11](https://github.com/uid11))

## [v0.12.8](https://github.com/joomcode/e2ed/tree/v0.12.8) (2022-11-14)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.7...v0.12.8)

- [fix: error in internal tests with unmockApiRoute](https://github.com/joomcode/e2ed/commit/17ef320b65fd574ceabb59a1e6ccc1deb04eae8c) ([uid11](https://github.com/uid11))

  refactor: working with cookies on testing pages

  fix: error with premature removing request hooks

  refactor: working with request hook events is more secure and covered with more logs

  refactor: working with client functions is more secure and covered with more logs

  refactor: some simplifications in the e2ed config

- [chore: update devDependencies (eslint, @typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/cb517745a549953a9402bb882fa2a84161f4b8d6) ([uid11](https://github.com/uid11))
- [feat: add more functions to work with cookies](https://github.com/joomcode/e2ed/commit/0ac4111c0d9ee48ee111a02c706e697a68028349) ([uid11](https://github.com/uid11))

  docs: the testFileGlobs config field is described in README.md

- [fix: add request hook context to request/response events](https://github.com/joomcode/e2ed/commit/41eeeec671286a879d34990654c3b6b5dde7f979) ([uid11](https://github.com/uid11))

  chore: update TestCafe to 2.0.2

- [chore: update devDependencies (@types/node, @typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/31c2d59cd4ad292fcf346063b6bddb8e3f536c8b) ([uid11](https://github.com/uid11))
- [fix: rename config field testFiles to testFileGlobs](https://github.com/joomcode/e2ed/commit/078594e2fda61639b86f303c05a17725539b9e4f) ([uid11](https://github.com/uid11))

  fix: report's message about unvisited test files

  refactor: move mock API actions to separate files

## [v0.12.7](https://github.com/joomcode/e2ed/tree/v0.12.7) (2022-10-25)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.6...v0.12.7)

- [chore: update devDependencies (@types/node, @typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/7c78155effec2b26642b67af68634602e6991f56) ([uid11](https://github.com/uid11))
- [feat: remove spec.ts extension from test files](https://github.com/joomcode/e2ed/commit/1273bc5aa7ece31febfa4c050b9cafe8a0868202) ([uid11](https://github.com/uid11))

  fix: rename src config field to testFiles

- [feat: add globby to main e2ed dependencies (for searching test files)](https://github.com/joomcode/e2ed/commit/6472cf4dbac1aa612526ce444d790b62d6e24cd6) ([uid11](https://github.com/uid11))
- [chore: update devDependencies, update testcafe-without-typecheck](https://github.com/joomcode/e2ed/commit/163169bd64123b2d42193fcbab404f69f976fd12) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@types/node, @typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/f40b579896e0d11b8fc0302f975ee474ca24323d) ([uid11](https://github.com/uid11))
- [fix: restrict 'export \*' and function declarations in eslint rules](https://github.com/joomcode/e2ed/commit/cc256ec3039ef3e49b6227d6cb5e5893b204f82e) ([uid11](https://github.com/uid11))
- [fix: uncomment waitForRequest/waitForResponse timeout tests](https://github.com/joomcode/e2ed/commit/78c4f1e4f541053989a5bd6b8dd37e9f03bd8a54) ([uid11](https://github.com/uid11))
- [chore: update @types/node to 18.8.5](https://github.com/joomcode/e2ed/commit/6f0161cc4ac3cb7c3917ba2377facf5af9d278ce) ([uid11](https://github.com/uid11))
- [fix: add assert actions assertDistanceBetweenSelectorsGte/Lte](https://github.com/joomcode/e2ed/commit/216421b35853689cadcef7b012a1052692317127) ([uid11](https://github.com/uid11))

  fix: use correct absolute paths in runDocker shell script

## [v0.12.6](https://github.com/joomcode/e2ed/tree/v0.12.6) (2022-10-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.5...v0.12.6)

- [chore: update devDependencies (@types/node, eslint, etc)](https://github.com/joomcode/e2ed/commit/ecd6d068b38f7ae98837b0295fe620aeb6fcd3b2) ([uid11](https://github.com/uid11))
- [Merge pull request #9 from joomcode/WEB-6125_parentSelector](https://github.com/joomcode/e2ed/commit/ea9d64132af856dbb0ea9a61639a60c993e26e8e) ([uid11](https://github.com/uid11))

  feat: add locatorIdInParentSelector

- [fix: remove waitForEvents hook when waits rejected by timeout](https://github.com/joomcode/e2ed/commit/c59d95ed1325b903a24943ee79dc63f5c39165dc) ([uid11](https://github.com/uid11))

  fix: add utility type AsyncVoid (void | Promise<void>)

  fix: temporary skip test of waitForResponse (need research)

- [Merge remote-tracking branch 'origin/main' into WEB-6125_parentSelector](https://github.com/joomcode/e2ed/commit/550476ca8452d4e12906ec76016410dbee3667fe) ([naorunaoru](https://github.com/naorunaoru))
- [feat: add locatorIdInParentSelector](https://github.com/joomcode/e2ed/commit/4d42f88aaefcb78efa0884dfb0a138281f9b4628) ([naorunaoru](https://github.com/naorunaoru))
- [chore: update devDependencies (@types/node, etc)](https://github.com/joomcode/e2ed/commit/e40085fed8641b6126bdd46f406b83d12ec85773) ([uid11](https://github.com/uid11))
- [fix: support TS 4.4](https://github.com/joomcode/e2ed/commit/f6475ac2881c52e93aa77989c0d251f5624b49f8) ([uid11](https://github.com/uid11))

## [v0.12.5](https://github.com/joomcode/e2ed/tree/v0.12.5) (2022-09-30)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.4...v0.12.5)

- [chore: update TestCafe to 2.0.1](https://github.com/joomcode/e2ed/commit/a5c3f509c2f70b5d7511ff148c99bcf201fc902e) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (typescript, @typescript-eslint/...)](https://github.com/joomcode/e2ed/commit/0a7ed27a1c36fb82a9ba1f4ceacd33c14ddbe4ce) ([uid11](https://github.com/uid11))
- [fix: use cssSelector in locator selectors](https://github.com/joomcode/e2ed/commit/e83f0eba1728276c8197393fb0d9cabb477a5a95) ([uid11](https://github.com/uid11))

  fix: remove testIdSelector

  fix: unused modules error in e2ed/context/user

- [feat: add concurrency to report retry object (and to lite report retry)](https://github.com/joomcode/e2ed/commit/e8935efdb472a6c56cee0180022db96b5a55d0f5) ([uid11](https://github.com/uid11))

  fix: use direct reexports in e2ed init example

  fix: rename ClientFunction to createClientFunction

  fix: export getRunLabelObject util for parsing test runLabel

## [v0.12.4](https://github.com/joomcode/e2ed/tree/v0.12.4) (2022-09-25)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.3...v0.12.4)

- [chore: update devDependencies (@types/node and eslint)](https://github.com/joomcode/e2ed/commit/32279190172b1bb00fac07b1c97bcabdcff2209e) ([uid11](https://github.com/uid11))
- [fix: correct update waitForEventsState (before async actions)](https://github.com/joomcode/e2ed/commit/7545c86b88bdb709694b97f3c747bab8d912badd) ([uid11](https://github.com/uid11))
- [fix: commit author name in CHANGELOG.md](https://github.com/joomcode/e2ed/commit/19747b68eb1848ce493892826217c427a382554e) ([uid11](https://github.com/uid11))

## [v0.12.3](https://github.com/joomcode/e2ed/tree/v0.12.3) (2022-09-22)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.2...v0.12.3)

- [feat: process all waitForRequest/waitForResponse event in parallel](https://github.com/joomcode/e2ed/commit/89518cc3b11bbf37a87d1a2d0878e4ecd76e102a) ([uid11](https://github.com/uid11))
- [feat: add locatorProperty... selectors](https://github.com/joomcode/e2ed/commit/995f8630e263279d821324680ad567ee68138684) ([uid11](https://github.com/uid11))
- [feat: use explicit exports instead of stars exports](https://github.com/joomcode/e2ed/commit/3ffdfb70a61371506d17d5a8fb89ba26f0732584) ([uid11](https://github.com/uid11))

  fix: remove unused pageLoaded flag from context

  fix: move mockApiRoute, waitForRequest/waitForResponse to actions

- [Merge pull request #6 from joomcode/assertDistanceBetweenElements](https://github.com/joomcode/e2ed/commit/5a4c1382a850f842d002fac59ea96275204e3327) ([uid11](https://github.com/uid11))

  feat: add assertDistanceBetweenElements util

- [Merge branch 'main' into assertDistanceBetweenElements](https://github.com/joomcode/e2ed/commit/31db4d4cac9dcf437a28284e7b724ace6aa1528f) ([uid11](https://github.com/uid11))
- [fix: error with empty responseBody in waitForResponse function](https://github.com/joomcode/e2ed/commit/cdb6910691f667bb841560baea2b27d82f9635e6) ([uid11](https://github.com/uid11))

  test: more tests with bodies in waitForRequest/waitForResponse

- [chore: update devDependencies (@types/node, typescript, eslint, etc)](https://github.com/joomcode/e2ed/commit/f7aeeff999320177611e052ef01255d24551c62b) ([uid11](https://github.com/uid11))
- [Merge pull request #5 from joomcode/add-getLocatorProperty](https://github.com/joomcode/e2ed/commit/6967ac374c6c43ea9963c6518c371637615db0ab) ([uid11](https://github.com/uid11))

  feat: add getLocatorProperty util

- [feat: add getLocatorProperty util](https://github.com/joomcode/e2ed/commit/ab7f8e0ea9479a36d22f6c956dce39ed116b161e) ([w84v2rhsq4](https://github.com/w84v2rhsq4))
- [feat: add timeouts for waitForRequest/waitForResponse](https://github.com/joomcode/e2ed/commit/594d85d367cd6fc0eb8c3cb24506b4b51c596f44) ([uid11](https://github.com/uid11))
- [feat: add waitForRequest/waitForResponse functions](https://github.com/joomcode/e2ed/commit/1fe5b9ed5fbd3d7c1f8768e762c4aba4e880b545) ([uid11](https://github.com/uid11))

  fix: add CODEOWNERS

- [Merge pull request #8 from joomcode/add-history-actions](https://github.com/joomcode/e2ed/commit/300dbf79b848f4742f140e8afcfbee22f70e292d) ([naorunaoru](https://github.com/naorunaoru))

  feat: add historyGoBack historyGoForward actions

- [Merge pull request #7 from joomcode/add-getRandomIntegerInRange-util](https://github.com/joomcode/e2ed/commit/1dfdd8b61fab90d696c128d3886db1295b45720d) ([naorunaoru](https://github.com/naorunaoru))

  feat: add getRandomIntegerInRange

- [feat: add historyGoBack historyGoForward actions](https://github.com/joomcode/e2ed/commit/112a3e3d75ada6a5de007bbd967c3a54c34a1ab4) ([naorunaoru](https://github.com/naorunaoru))
- [feat: add getRandomIntegerInRange](https://github.com/joomcode/e2ed/commit/57f7a93e2ebc5fdded986dae4a62e9579cb0fd4e) ([naorunaoru](https://github.com/naorunaoru))
- [feat: add assertDistanceBetweenElements util](https://github.com/joomcode/e2ed/commit/628e860d6e4e1384babe4fb7f5e2400ce73c8114) ([w84v2rhsq4](https://github.com/w84v2rhsq4))
- [Merge pull request #4 from joomcode/add-numbersAreAprroximatelyEql-assert](https://github.com/joomcode/e2ed/commit/a97f3daaa190665fb4b242f5bb7674f788db97de) ([uid11](https://github.com/uid11))

  feat: add assertNumbersAreApproximatelyEqual

- [Merge branch 'main' into add-numbersAreAprroximatelyEql-assert](https://github.com/joomcode/e2ed/commit/82da91e73ca85ecb46a792f672a59867afda2032) ([w84v2rhsq4](https://github.com/w84v2rhsq4))
- [improve logs and rename file](https://github.com/joomcode/e2ed/commit/06e28bb4184549f8fdc3f14f2c968a677606612b) ([w84v2rhsq4](https://github.com/w84v2rhsq4))
- [refactor: add internal abstract class RequestHookWithEvents](https://github.com/joomcode/e2ed/commit/dc117bf9d592b2d101088dde6c3feb3745b0a6e9) ([uid11](https://github.com/uid11))
- [feat: add assertNumbersAreApproximatelyEqual](https://github.com/joomcode/e2ed/commit/31eff6ef81477764963bc2a935495e6fbaa07ea1) ([w84v2rhsq4](https://github.com/w84v2rhsq4))
- [feat: add methods (request/response)BodyIsInJsonFormat to API routes](https://github.com/joomcode/e2ed/commit/0b3a1e18687043b54efd43927159564cc09e4926) ([uid11](https://github.com/uid11))
- [fix: return name for CI GitHub Actions workflow](https://github.com/joomcode/e2ed/commit/53cb4c3d148c8ea85518337bd493afee7a778d5b) ([uid11](https://github.com/uid11))
- [fix: use build:docker script in CI (instead of test:docker)](https://github.com/joomcode/e2ed/commit/c01a3df2db14e4d583243013d2898e85ea7235db) ([uid11](https://github.com/uid11))
- [chore: add test-docker job to CI (via GitHub Actions)](https://github.com/joomcode/e2ed/commit/d7a13d45eab0d84a98b0d340e42ef466b533f3c8) ([uid11](https://github.com/uid11))
- [fix: do not use colon in GitHub Actions job name](https://github.com/joomcode/e2ed/commit/df86ee8c038292bcc562d87ef70a6ff4ee040389) ([uid11](https://github.com/uid11))
- [chore: add test:local to CI (via GitHub Actions)](https://github.com/joomcode/e2ed/commit/65e8c62364c2de4d962b222b5ab522e20d5e6364) ([uid11](https://github.com/uid11))
- [fix: typo in e2ed/utils/asserts module path](https://github.com/joomcode/e2ed/commit/62c41c6b0ccc6efc4fec670e4c148139b6d404fe) ([uid11](https://github.com/uid11))
- [fix: lint errors in GitHub Actions CI](https://github.com/joomcode/e2ed/commit/f33e436f1463526894b4fc41c3e0a40231c2c479) ([uid11](https://github.com/uid11))
- [feat: add basic CI via GitHub Actions](https://github.com/joomcode/e2ed/commit/2ea10e287d2fbb37dcab4b724c61ef6fdacfd460) ([uid11](https://github.com/uid11))

## [v0.12.2](https://github.com/joomcode/e2ed/tree/v0.12.2) (2022-09-06)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.1...v0.12.2)

- [chore: update @typescript-eslint/\* to 5.36.2](https://github.com/joomcode/e2ed/commit/d157e32fe78842819ae792eb1db5cdfa7864cc0b) ([uid11](https://github.com/uid11))
- [fix: create new API mock state for every test context](https://github.com/joomcode/e2ed/commit/c65ba2114098840398d3bfcec29fc0833ae3b9ca) ([uid11](https://github.com/uid11))
- [fix: use stable alpine image instead of edge image from TestCafe](https://github.com/joomcode/e2ed/commit/b043856526630688c7a574d7b4aca81a0d9e3592) ([uid11](https://github.com/uid11))

  fix: install icu-data-full in image for non-English locales

## [v0.12.1](https://github.com/joomcode/e2ed/tree/v0.12.1) (2022-09-05)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.12.0...v0.12.1)

- [fix: export promise utils from e2ed/utils](https://github.com/joomcode/e2ed/commit/f7f9cfd8bc26ae1c9411db6d5486d41d9b7a4d5e) ([uid11](https://github.com/uid11))

## [v0.12.0](https://github.com/joomcode/e2ed/tree/v0.12.0) (2022-09-05)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.27...v0.12.0)

- [chore: update @types/node to 18.7.15](https://github.com/joomcode/e2ed/commit/dbc4b25b5ff4ddae6e304386903f67f9d2776a92) ([uid11](https://github.com/uid11))
- [fix: use API mock state from test context (instead of global state)](https://github.com/joomcode/e2ed/commit/6763c4f64e3c8641d82bdb26e4cff1dd0739dc52) ([uid11](https://github.com/uid11))
- [feat: add e2ed/generators for genertion any new test (mock) data](https://github.com/joomcode/e2ed/commit/f595605d346784a4e8ccc11a3a6c678e7bfc0094) ([uid11](https://github.com/uid11))

  feat: add assert action assertUrlMatchRoute

  feat: add promise's util waitForAllProperties

## [v0.11.27](https://github.com/joomcode/e2ed/tree/v0.11.27) (2022-09-04)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.26...v0.11.27)

- [feat: add GitHub Pages with example of report html](https://github.com/joomcode/e2ed/commit/eed6929f28495b29d3aea54e3c8545c01d6616e4) ([uid11](https://github.com/uid11))
- [chore: update eslint-plugin-simple-import-sort to 8.0.0](https://github.com/joomcode/e2ed/commit/4b8e6e3db177bce270cc917ccad4123d8a9c153a) ([uid11](https://github.com/uid11))

## [v0.11.26](https://github.com/joomcode/e2ed/tree/v0.11.26) (2022-09-03)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.25...v0.11.26)

- [fix: update TestCafe docker image to 2.0.0](https://github.com/joomcode/e2ed/commit/43941e26f9398ee9a14009f0201e46398a79d805) ([uid11](https://github.com/uid11))
- [chore: update TestCafe to 2.0.0](https://github.com/joomcode/e2ed/commit/3789654a992a44228009de6eefae4212a05feb04) ([uid11](https://github.com/uid11))

## [v0.11.25](https://github.com/joomcode/e2ed/tree/v0.11.25) (2022-09-02)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.24...v0.11.25)

- [chore: update devDependencies (eslint, @types/node, @typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/170fb18a8f8bec4f39600b92ce12a895539150a5) ([uid11](https://github.com/uid11))
- [feat: add dockerImage field to e2ed config; remove E2ED_DOCKER_IMAGE](https://github.com/joomcode/e2ed/commit/bf76590f322b077392b77a8ecb4245d220a67c78) ([uid11](https://github.com/uid11))

  refactor: rename exit status to exit code

## [v0.11.24](https://github.com/joomcode/e2ed/tree/v0.11.24) (2022-08-26)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.23...v0.11.24)

- [chore: update TypeScript to 4.8.2; fix new type errors](https://github.com/joomcode/e2ed/commit/3a671ff9f88fa04ffca4886da224a03429bd4c6e) ([uid11](https://github.com/uid11))
- [feat: add OptionalIfValueIncludeDefault type function](https://github.com/joomcode/e2ed/commit/ed568be0f04510455d1a2af705c86cbb3a41e0ad) ([uid11](https://github.com/uid11))

  fix: add dynamic optionality for request function parameters

- [chore: update devDependencies (@types/node, @typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/a9df264255afa54bccbbdb0f0b19d3d3dc7e58a2) ([uid11](https://github.com/uid11))
- [chore: update @types/node to 18.7.11](https://github.com/joomcode/e2ed/commit/20838e8c4dc2b1bef8b40f798df46ccd15f16c85) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@types/node, @typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/c717146928bf6d2683303033b3116038b90ec7c6) ([uid11](https://github.com/uid11))
- [fix: wrong number of retries in OK/FAIL message after retries cycle](https://github.com/joomcode/e2ed/commit/75a01f829a00234e3a5c060ec9af15b028fd92e2) ([uid11](https://github.com/uid11))

## [v0.11.23](https://github.com/joomcode/e2ed/tree/v0.11.23) (2022-08-22)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.22...v0.11.23)

- [fix: pack timeout for local run and docker run](https://github.com/joomcode/e2ed/commit/53a4bd26af61f3b80be112ca7eff7506ad5b2364) ([uid11](https://github.com/uid11))
- [chore: update @types/node to 18.7.9](https://github.com/joomcode/e2ed/commit/1fb20af31a47ed9d9d37d3c7cef234ac5715cefb) ([uid11](https://github.com/uid11))
- [feat: add end e2ed reasons enum](https://github.com/joomcode/e2ed/commit/917701f686b09a135b051eb9c558942fbe2c4f53) ([uid11](https://github.com/uid11))

  refactor: runE2edDocker/runE2edLocal entrypoints

  feat: nodejs process end handlers (on SIGINT, SIGTERM)

- [chore: update @types/node to 18.7.8](https://github.com/joomcode/e2ed/commit/91e98a9bcb216b6b88fa721017b25cd43ff002cb) ([uid11](https://github.com/uid11))
- [feat: read/write start info from file (JS-context independent)](https://github.com/joomcode/e2ed/commit/afa7a947ef3b3450a5b5736bbfa25018eb5f533b) ([uid11](https://github.com/uid11))

  fix: move startTimeInMs to start info

  feat: remove unnecessary types of start/end e2ed events

- [fix: truncate long arrays in retries state logs](https://github.com/joomcode/e2ed/commit/dee72336dba00f9472c1c16e343399204ba48cef) ([uid11](https://github.com/uid11))
- [feat: add blank for packTimeout config field](https://github.com/joomcode/e2ed/commit/92ffce2f31e145cb34482b0539f930e8936a1685) ([uid11](https://github.com/uid11))

  fix: remove TestCafe JSON reporter

  fix: update testcafe-without-typecheck for correct awaiting TestCafe tests run

## [v0.11.22](https://github.com/joomcode/e2ed/tree/v0.11.22) (2022-08-17)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.21...v0.11.22)

- [fix: type of mockApiRoute result in internal test](https://github.com/joomcode/e2ed/commit/a06329b569954d38fc78161829136fb91f9eeb57) ([uid11](https://github.com/uid11))
- [chore: update @types/node to 18.7.6](https://github.com/joomcode/e2ed/commit/d8b1ce3691053b8a28674bb386d6042e1fa06b29) ([uid11](https://github.com/uid11))
- [feat: read test runs statuses from test runs events files](https://github.com/joomcode/e2ed/commit/1758af2bb6cf964fef5617ee6b416386f7f13ac5) ([uid11](https://github.com/uid11))

  chore: add eslint rule for forbidden imports

- [chore: update devDependencies (@types/node, @typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/af5c9ee37b42fa3d32ebf4071a1f533483a66a2b) ([uid11](https://github.com/uid11))
- [feat: on retry filter out passed tests (filter inversion)](https://github.com/joomcode/e2ed/commit/e06a3447a358a122f7ecbd2ac2c65276fab788bd) ([uid11](https://github.com/uid11))
- [chore: update eslint to 8.22.0](https://github.com/joomcode/e2ed/commit/c5181beb36cefae2b47f18d6cb25a3a3242ed7c5) ([uid11](https://github.com/uid11))

## [v0.11.21](https://github.com/joomcode/e2ed/tree/v0.11.21) (2022-08-14)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.20...v0.11.21)

- [fix: exit code from TestCafe subprocess (running one retry)](https://github.com/joomcode/e2ed/commit/c4c96fd9481e9895bee6befac1ee604fac3e7f9d) ([uid11](https://github.com/uid11))

  fix: read browsers list from config when run in docker

## [v0.11.20](https://github.com/joomcode/e2ed/tree/v0.11.20) (2022-08-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.19...v0.11.20)

- [chore: update @types/node to 18.7.3](https://github.com/joomcode/e2ed/commit/d9c563bb8d4145b468e9cfde495238304631b90b) ([uid11](https://github.com/uid11))
- [fix: reject TestCafe subprocess if some tests failed](https://github.com/joomcode/e2ed/commit/ec0850686ff62d9d9602b03519109bcfb2551c56) ([uid11](https://github.com/uid11))

## [v0.11.19](https://github.com/joomcode/e2ed/tree/v0.11.19) (2022-08-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.18...v0.11.19)

- [feat: print skip reason for skipped tests in HTML report (as metatag)](https://github.com/joomcode/e2ed/commit/97d8991451330abbe997e738505c3e8e46dda35c) ([uid11](https://github.com/uid11))
- [fix: remove unnecessary flag isSkipped from test run event (use status instead)](https://github.com/joomcode/e2ed/commit/4d82233f135dcd87bcfd5d445fa3c38c9e336ee9) ([uid11](https://github.com/uid11))

## [v0.11.18](https://github.com/joomcode/e2ed/tree/v0.11.18) (2022-08-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.17...v0.11.18)

- [feat: add parameter testIdleTimeout to config and test options](https://github.com/joomcode/e2ed/commit/455f111f0c389063a5fb8cafcb074ce74e552dcf) ([uid11](https://github.com/uid11))

## [v0.11.17](https://github.com/joomcode/e2ed/tree/v0.11.17) (2022-08-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.16...v0.11.17)

- [fix: reject current test run if previous run of this test already passed](https://github.com/joomcode/e2ed/commit/ef587c65f98f4ff4a9358c31d902203815e229a4) ([uid11](https://github.com/uid11))

  fix: change previous test run status to broken, if it was failed

  refactor: move all utils for working with filesystem to utils/fs directory

## [v0.11.16](https://github.com/joomcode/e2ed/tree/v0.11.16) (2022-08-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.15...v0.11.16)

- [fix: add main log message about test run error](https://github.com/joomcode/e2ed/commit/90dd9327a423a79aad2cceb2ee833cafd3e39da5) ([uid11](https://github.com/uid11))

  fix: clear test timeout when test promise completed

  fix: do not log about reject, if test run already completed

- [fix: add type MaybeWithIsTestRunBroken for reject error params](https://github.com/joomcode/e2ed/commit/d92d73c6ff76a1c6920ca6c9656c1ff351f6684e) ([uid11](https://github.com/uid11))

## [v0.11.15](https://github.com/joomcode/e2ed/tree/v0.11.15) (2022-08-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.14...v0.11.15)

- [feat: add calculated status to test run event](https://github.com/joomcode/e2ed/commit/be3ae2b6177d05a3a33c42c37721d99515825d16) ([uid11](https://github.com/uid11))

## [v0.11.14](https://github.com/joomcode/e2ed/tree/v0.11.14) (2022-08-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.13...v0.11.14)

- [chore: update @types/node to 18.7.2](https://github.com/joomcode/e2ed/commit/254f1a99efa8f7662cbf5573a0d5a7c1d621140e) ([uid11](https://github.com/uid11))
- [fix: read test run id and test run error from closures variables](https://github.com/joomcode/e2ed/commit/da99bb7d840f589a7d89572931162a9c68c55d40) ([uid11](https://github.com/uid11))

  refactor: add separate type for TestCafe selector

- [fix: use explicit readable values for enums (TestRunStatus, etc)](https://github.com/joomcode/e2ed/commit/447039f47b4e5002a701f3d749a01183b0abb01f) ([uid11](https://github.com/uid11))

## [v0.11.13](https://github.com/joomcode/e2ed/tree/v0.11.13) (2022-08-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.12...v0.11.13)

- [refactor: rename test run error variable to runError](https://github.com/joomcode/e2ed/commit/f6a3fb13e08e6fd5b737f2fd3359ce3c3bda25b0) ([uid11](https://github.com/uid11))

  fix: add checks that test context is unique for each test run

## [v0.11.12](https://github.com/joomcode/e2ed/tree/v0.11.12) (2022-08-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.11...v0.11.12)

- [fix: add more logs on after test hooks](https://github.com/joomcode/e2ed/commit/e2a11058d330389beb57ef1e4859808daf3618c0) ([uid11](https://github.com/uid11))

## [v0.11.11](https://github.com/joomcode/e2ed/tree/v0.11.11) (2022-08-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.10...v0.11.11)

- [fix: add more general logs about rejecting previous test runs](https://github.com/joomcode/e2ed/commit/9fba1d3ad5b377dbacec69aa4f4e27bd7bf932f0) ([uid11](https://github.com/uid11))

## [v0.11.10](https://github.com/joomcode/e2ed/tree/v0.11.10) (2022-08-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.9...v0.11.10)

- [chore: update @types/node to 18.7.1](https://github.com/joomcode/e2ed/commit/fe4c8bd1c6bb3b6749a03ee47f64c08ed662010b) ([uid11](https://github.com/uid11))
- [fix: force reject previous test run on starting new run of this test](https://github.com/joomcode/e2ed/commit/63aeb816b012e7d4a272a900c79d1a3d9975b802) ([uid11](https://github.com/uid11))

## [v0.11.9](https://github.com/joomcode/e2ed/tree/v0.11.9) (2022-08-10)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.8...v0.11.9)

- [fix: do not log step with error to test report](https://github.com/joomcode/e2ed/commit/a6ea096a2ab91992fd1692f791024d68828c4612) ([uid11](https://github.com/uid11))

  fix: read test error from context (actual for broken tests)

## [v0.11.8](https://github.com/joomcode/e2ed/tree/v0.11.8) (2022-08-10)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.7...v0.11.8)

- [fix: register start of test run before checking previous test run](https://github.com/joomcode/e2ed/commit/7a1ef5f36f7f85a9cc205eff78c8d304ff54875a) ([uid11](https://github.com/uid11))

## [v0.11.7](https://github.com/joomcode/e2ed/tree/v0.11.7) (2022-08-10)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.6...v0.11.7)

- [fix: add direct logs about all test errors](https://github.com/joomcode/e2ed/commit/9536257cfc9c32ce2439bdc469f680113b1ad3b5) ([uid11](https://github.com/uid11))

## [v0.11.6](https://github.com/joomcode/e2ed/tree/v0.11.6) (2022-08-10)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.5...v0.11.6)

- [fix: error with unseted runId in afterTest hook](https://github.com/joomcode/e2ed/commit/11f1f06a20797f4cb173e18fa4bea161ab6b85f0) ([uid11](https://github.com/uid11))

## [v0.11.5](https://github.com/joomcode/e2ed/tree/v0.11.5) (2022-08-09)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.4...v0.11.5)

- [fix: add empty e2ed/types/index.js file for eslint resolving](https://github.com/joomcode/e2ed/commit/070e45adf52954f45468887e0d0c6558f8880571) ([uid11](https://github.com/uid11))

## [v0.11.4](https://github.com/joomcode/e2ed/tree/v0.11.4) (2022-08-09)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.3...v0.11.4)

- [fix: test error property should be undefined, if there is no errors in test](https://github.com/joomcode/e2ed/commit/7e5700c2b02105325898c51e55601c92d6174c65) ([uid11](https://github.com/uid11))
- [fix: remove useless \*.js files from e2ed/types directory](https://github.com/joomcode/e2ed/commit/cc692e8d85ae95640749b84bb78e6c0724e465b1) ([uid11](https://github.com/uid11))
- [feat: directly read test error from test function call](https://github.com/joomcode/e2ed/commit/bf28ba80183ab55bd3a93e6e5a6547671db0faf0) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@types/node, @typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/f020bec4f475bac5a3ef947ad8c42b99230c75c1) ([uid11](https://github.com/uid11))
- [refactor: split it.ts into several files](https://github.com/joomcode/e2ed/commit/cf9083ba7c7b2cf46443697b5494cb0c3d3dfd4a) ([uid11](https://github.com/uid11))

  refactor: rename it to test; add aliases for it (task, test)

  fix: cut long stackFrames messages from logs (in valueToString)

## [v0.11.3](https://github.com/joomcode/e2ed/tree/v0.11.3) (2022-08-06)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.2...v0.11.3)

- [fix: calculate CSP hash for <script> and <style> from content](https://github.com/joomcode/e2ed/commit/0a128f47838fce9233cd54338a6aeb1fb14c0bde) ([uid11](https://github.com/uid11))

## [v0.11.2](https://github.com/joomcode/e2ed/tree/v0.11.2) (2022-08-05)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.1...v0.11.2)

- [chore: update TestCafe to 1.20.0](https://github.com/joomcode/e2ed/commit/768f3b5c1c08b6d6deb0de7dfb000e42aa2c5030) ([uid11](https://github.com/uid11))

  fix: TypeScript errors in new version

- [fix: error with test of unmockApiRoute function](https://github.com/joomcode/e2ed/commit/cec20065f71bb5d55c59502e087b1f5c18fed783) ([uid11](https://github.com/uid11))
- [Merge pull request #1 from joomcode/WEB-5540](https://github.com/joomcode/e2ed/commit/d05ba82c2ce80c71a78ebea20c981489d21b9ca0) ([uid11](https://github.com/uid11))

  fix: error with TestCafe context in mockApiRoute function

- [fix: error with TestCafe context in mockApiRoute function](https://github.com/joomcode/e2ed/commit/0a13def3380cc88168b771a36e23405689f3a0e5) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (eslint, etc)](https://github.com/joomcode/e2ed/commit/4055388812dbe1d457d7e7ceefcfc9ac8d963fd9) ([uid11](https://github.com/uid11))
- [feat: turn on strict rules from @typescript-eslint](https://github.com/joomcode/e2ed/commit/0b79797e7c627042adc851145846021b7396c9f8) ([uid11](https://github.com/uid11))
- [feat: turn on additional tsconfig strict rules](https://github.com/joomcode/e2ed/commit/ed53bc96151921a9a4612b058f60b4260a5aaa83) ([uid11](https://github.com/uid11))

  fix: TS errors

- [feat: rename doApiMock to mockApiRoute; add unmockApiRoute function](https://github.com/joomcode/e2ed/commit/f629161ccb080f89ba335fb71ff5d500d7d626bd) ([uid11](https://github.com/uid11))
- [fix: rename doApiMock to mockApi; add logs to mockApi function](https://github.com/joomcode/e2ed/commit/eb7770403bbe30825bf3ba152c3bcd732167c7a4) ([uid11](https://github.com/uid11))

## [v0.11.1](https://github.com/joomcode/e2ed/tree/v0.11.1) (2022-07-17)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.11.0...v0.11.1)

- [chore: update devDependencies (eslint, @types/node)](https://github.com/joomcode/e2ed/commit/bb213f30afa4fd6e5d41043e2f841730acf21244) ([uid11](https://github.com/uid11))
- [fix: use headers field instead of requestHeaders for http.request](https://github.com/joomcode/e2ed/commit/9e6b6455ce12e8fd8d6fee0aea87f3592bc0a766) ([uid11](https://github.com/uid11))

## [v0.11.0](https://github.com/joomcode/e2ed/tree/v0.11.0) (2022-07-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.18...v0.11.0)

- [feat: add action switchToIframe (native TestCafe action)](https://github.com/joomcode/e2ed/commit/3fbdfe6a6a403f9407efd8c0545e73213e0a13e2) ([uid11](https://github.com/uid11))
- [refactor: use Request/Response types from API routes in util/request](https://github.com/joomcode/e2ed/commit/1714f883f9e207a76cc625ef4fadd7607b04fa73) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/cea7345831768abe08748023d43819f6aa831138) ([uid11](https://github.com/uid11))
- [refactor: use Request and Response types from ApiRoute for doApiMock](https://github.com/joomcode/e2ed/commit/47222b02c133b9753e05b1ca104615d108f4f63a) ([uid11](https://github.com/uid11))
- [fix: rename PARAMS, REQUEST and RESPONSE key types](https://github.com/joomcode/e2ed/commit/64d01e991c15c246b2c762a86eae8552321dba91) ([uid11](https://github.com/uid11))
- [feat: add Request and Response types to API routes](https://github.com/joomcode/e2ed/commit/993f1506f3c803986298c630dcf0dab7adc1db5e) ([uid11](https://github.com/uid11))
- [fix: remove code from index files (except exports)](https://github.com/joomcode/e2ed/commit/756ff78688ddfc8ef506e3b6ba02426a343d217c) ([uid11](https://github.com/uid11))
- [feat: add checks for method, query and url for doApiMock](https://github.com/joomcode/e2ed/commit/a5636948b1e2bbcf5beae7e0ce1f8784a6aff33c) ([uid11](https://github.com/uid11))
- [feat: extends Request and Response types](https://github.com/joomcode/e2ed/commit/fee521c464676f5bdfc5fc4126f696d189bb668c) ([uid11](https://github.com/uid11))

  Also add method, query and url to doApiMock request

- [chore: update @types/node](https://github.com/joomcode/e2ed/commit/85a4b83f5bf38554bfd63b0993c79aa4131a9f6d) ([uid11](https://github.com/uid11))

## [v0.10.18](https://github.com/joomcode/e2ed/tree/v0.10.18) (2022-07-06)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.17...v0.10.18)

- [fix: add the ability to put additional dependencies in the image through npm i](https://github.com/joomcode/e2ed/commit/55b1d9ac358240bd3596e83d65ca96a3325431ea) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (eslint, @types/node, @typescript-eslint/\*, etc)](https://github.com/joomcode/e2ed/commit/6b3b11f3c74229e005796a56518afac22595cef7) ([uid11](https://github.com/uid11))

## [v0.10.17](https://github.com/joomcode/e2ed/tree/v0.10.17) (2022-06-29)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.16...v0.10.17)

- [chore: update devDependencies (@typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/06a74ee4a372258d63dd2a0f102fb6487bc5ce8b) ([uid11](https://github.com/uid11))
- [feat: add runtime tests for doApiMock function](https://github.com/joomcode/e2ed/commit/843f4fabfaa1dc0c3bf0c83b44c4f28e9affd64c) ([uid11](https://github.com/uid11))

  fix: comparing of request's method

  fix: doApiMock types

  refactor: Request and Response types

- [feat: add base version of doApiMock](https://github.com/joomcode/e2ed/commit/06213d6955b4d8911a08d4f9b30c21d0311711ec) ([uid11](https://github.com/uid11))

  refactor: use request and response instead of input and output

  refactor: move userland types checks inside of e2ed

  fix: remove E2ED_API_ORIGIN environment variable

## [v0.10.16](https://github.com/joomcode/e2ed/tree/v0.10.16) (2022-06-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.15...v0.10.16)

- [fix: invert check messages in assert functions](https://github.com/joomcode/e2ed/commit/56d3e995343aceea508c8966fe0106cc0f646e12) ([uid11](https://github.com/uid11))

## [v0.10.15](https://github.com/joomcode/e2ed/tree/v0.10.15) (2022-06-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.14...v0.10.15)

- [fix: userland types checks for project with option skipLibCheck = true](https://github.com/joomcode/e2ed/commit/f03eef3bc4cc19fe22bcd3a37b3082f071ad40ee) ([uid11](https://github.com/uid11))

## [v0.10.14](https://github.com/joomcode/e2ed/tree/v0.10.14) (2022-06-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.13...v0.10.14)

- [chore: update devDependencies (typescript, eslint, prettier, etc)](https://github.com/joomcode/e2ed/commit/7ac8454762e3dfac51ef6f85875d9daf0938c650) ([uid11](https://github.com/uid11))
- [feat: move external types checks inside the e2ed package](https://github.com/joomcode/e2ed/commit/cb07fb441c00ff46e4a1c692a6f8c790b4e79c6e) ([uid11](https://github.com/uid11))
- [feat: add mandatory message to assert functions; use const enums](https://github.com/joomcode/e2ed/commit/280b3ea89c03a7bd98bb1c8eb3f41b085f6625e5) ([uid11](https://github.com/uid11))

  We switch to const enums again by turning on the preserveConstEnums tsconfig-option
  (and also turns on the useDefineForClassFields option).

## [v0.10.13](https://github.com/joomcode/e2ed/tree/v0.10.13) (2022-06-04)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.12...v0.10.13)

- [fix: do not take screenshots during log event](https://github.com/joomcode/e2ed/commit/b908b4ef2eb9c92ffd89c2621661dddd79c02aab) ([uid11](https://github.com/uid11))

## [v0.10.12](https://github.com/joomcode/e2ed/tree/v0.10.12) (2022-06-04)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.11...v0.10.12)

- [chore: update TestCafe to 1.19.0](https://github.com/joomcode/e2ed/commit/dbb7445205f9c352870238a74a4c993800020db9) ([uid11](https://github.com/uid11))

## [v0.10.11](https://github.com/joomcode/e2ed/tree/v0.10.11) (2022-06-04)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.10...v0.10.11)

- [chore: restore TestCafe@1.18.6](https://github.com/joomcode/e2ed/commit/7ebaae60e95d2ae1ffdcd51551a97881ead821fa) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (eslint, typescript, @types/node)](https://github.com/joomcode/e2ed/commit/4fd9ac377654536cbe39e527bd5dcc9f5cec2ac4) ([uid11](https://github.com/uid11))
- [fix: remove environment variable E2ED_NAVIGATE_STABILIZATION_INTERVAL](https://github.com/joomcode/e2ed/commit/5742571cdb9f1d8279ab9ceaaa8ebdb016b252c2) ([uid11](https://github.com/uid11))
- [fix: support TS 4.4](https://github.com/joomcode/e2ed/commit/8bcc87af740ea03659c7420d0e1358e75ee27a70) ([uid11](https://github.com/uid11))

## [v0.10.10](https://github.com/joomcode/e2ed/tree/v0.10.10) (2022-05-31)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.9...v0.10.10)

- [chore: update TestCafe to 1.19.0 (i.e. testcafe-without-typecheck)](https://github.com/joomcode/e2ed/commit/78e42b65b07aae9d8f236c3f0b999e60edd4f270) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@typescript-eslint/\*, etc)](https://github.com/joomcode/e2ed/commit/80e40977cac93b9e6db23d16a0c89f1ba4e8fba0) ([uid11](https://github.com/uid11))
- [feat: read e2ed startTime from e2ed/configurator](https://github.com/joomcode/e2ed/commit/988efa8b1fc8c56aefa9c06391fe418df1ce2500) ([uid11](https://github.com/uid11))
- [feat: support second argument in Error constructor (cause field)](https://github.com/joomcode/e2ed/commit/28865efc2734dd58c5b325d7ee2123b15bb8ba21) ([uid11](https://github.com/uid11))

## [v0.10.9](https://github.com/joomcode/e2ed/tree/v0.10.9) (2022-05-26)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.8...v0.10.9)

- [feat: add createTestId utility for creating locators](https://github.com/joomcode/e2ed/commit/70ab9b95ca7567f85e82222a47eb6915a6a2721c) ([uid11](https://github.com/uid11))

## [v0.10.8](https://github.com/joomcode/e2ed/tree/v0.10.8) (2022-05-25)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.7...v0.10.8)

- [feat: add parameters pageStabilizationInterval to config and pages](https://github.com/joomcode/e2ed/commit/831453808644a2b8b3289ef4a6c141b31b33a548) ([uid11](https://github.com/uid11))

  This setting overrides the E2ED_NAVIGATE_STABILIZATION_INTERVAL environment variable.
  In addition, this setting can be overridden on a specific page.

## [v0.10.7](https://github.com/joomcode/e2ed/tree/v0.10.7) (2022-05-24)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.6...v0.10.7)

- [chore: update TypeScript to 4.7.2](https://github.com/joomcode/e2ed/commit/d26960f23948d37b1a7ebd9e4622c12652597249) ([uid11](https://github.com/uid11))

  Fixed two bugs that occurred with computed class properties not initialized in the constructor.

- [feat: write commit body to CHANGELOG.md](https://github.com/joomcode/e2ed/commit/493fafad74165856447726c09379a6f51891d380) ([uid11](https://github.com/uid11))

  The commit body (if any) is displayed in the CHANGELOG.md under the link to commit.

- [feat: add field maxRetriesCountInDocker to userland config](https://github.com/joomcode/e2ed/commit/a1493a4195f6dff771aeeffd84925482314aa48f) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (@typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/d31dad9a1d1e19e2a89c1e4c5b8b11203397a974) ([uid11](https://github.com/uid11))
- [feat: add testTimeot parameter to test options](https://github.com/joomcode/e2ed/commit/d570653117ef5cd687616ef67c4cb2783bfc8ed6) ([uid11](https://github.com/uid11))
- [fix: sanitize JSON string for report (use character entity reference instead of < and >)](https://github.com/joomcode/e2ed/commit/8865f065d98c98e07e04d509250c6722db356246) ([uid11](https://github.com/uid11))
- [feat: export all stuff for config from separate module](https://github.com/joomcode/e2ed/commit/3222f43059885c582ad2bc2a4380e8d967e2fbd9) ([uid11](https://github.com/uid11))
- [chore: update devDependencies (eslint, @types/node)](https://github.com/joomcode/e2ed/commit/e927b00bb014a8a1d399756b8e66c998d13bd64a) ([uid11](https://github.com/uid11))
- [fix: export enum instead of const enum (for projects with isolatedModules)](https://github.com/joomcode/e2ed/commit/cd1a56e9ac49fa6cbc73696a7a57414e4a6a156e) ([uid11](https://github.com/uid11))

## [v0.10.6](https://github.com/joomcode/e2ed/tree/v0.10.6) (2022-05-19)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.5...v0.10.6)

- [docs: fix repository links in CHANGELOG.md (joomcode instead of uid11)](https://github.com/joomcode/e2ed/commit/2a9a8bccd894797503a8768b3ca06f93cc40f935) ([uid11](https://github.com/uid11))

## [v0.10.5](https://github.com/joomcode/e2ed/tree/v0.10.5) (2022-05-19)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.4...v0.10.5)

- [feat: add commits author name to CHANGELOG.md](https://github.com/joomcode/e2ed/commit/1a1ddeb6b0be414c270fc0acd5ecd3b11c564381) ([uid11](https://github.com/uid11))
- [chore: replace repository to joomcode](https://github.com/joomcode/e2ed/commit/6d1ef97293f6c8b5a45bb262b0c181b8b6a51f77) ([uid11](https://github.com/uid11))
- [docs: add pull request template](https://github.com/joomcode/e2ed/commit/dba38b05517ddd977dd179c4c80a1d53f9c1c906) ([uid11](https://github.com/uid11))
- [docs: add issue templates](https://github.com/joomcode/e2ed/commit/d151fa37fee418772f402f358cb35e23cf2131c9) ([uid11](https://github.com/uid11))

## [v0.10.4](https://github.com/joomcode/e2ed/tree/v0.10.4) (2022-05-18)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.3...v0.10.4)

- [chore: update devDependencies (@typescript-eslint/\*, etc)](https://github.com/joomcode/e2ed/commit/d59decc4fe8363e5a29dc332bfe2336a64c6c3ce)
- [docs: add CONTRIBUTING.md to the project](https://github.com/joomcode/e2ed/commit/78d284e02506976587806e389d15dc37d218689f)
- [chore: add Contributor Covenant badge to README.md](https://github.com/joomcode/e2ed/commit/e350b77c8c0554e88ca3d66a020c633c8759367d)
- [chore: add Contributor Covenant CODE_OF_CONDUCT.md](https://github.com/joomcode/e2ed/commit/68430a8d570a66c3f9705e01ef1a12a0a89463aa)
- [chore: update @types/node to 17.0.33](https://github.com/joomcode/e2ed/commit/44f488a63fb07cbb57c8a356a38f16da1d8b7f14)
- [docs: clarify the package description (that the package is a testing framework)](https://github.com/joomcode/e2ed/commit/ef04893bc2728def2f0d77eda8fa504963e84e1d)
- [feat: add check that there is exactly one test in each test file](https://github.com/joomcode/e2ed/commit/8430ad18b18b7837e55b608dd2a7cc2296876de4)

## [v0.10.3](https://github.com/joomcode/e2ed/tree/v0.10.3) (2022-05-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.2...v0.10.3)

- [fix: internal type tests should not run in runtime](https://github.com/joomcode/e2ed/commit/6398032682a6783daaf593c253199fd8d521dd09)
- [chore: update @types/node to 17.0.32](https://github.com/joomcode/e2ed/commit/1ee3cba41489f8f92db40b428345c064bd4b683f)
- [fix: navigateToPage/assertPage arguments types for pageParams=undefined](https://github.com/joomcode/e2ed/commit/9c81454ee745b8f568aeaa8d761c2d6de5856c7e)
- [chore: update devDependencies (@typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/8762a09c861cfb83fcf738f640bc6543fff4fcf6)
- [feat: clarify route types and add full tests for it](https://github.com/joomcode/e2ed/commit/7f90fb5fc395338f1277acf96f7ccabafc19b0dc)
- [chore: update husky to 8.0.1](https://github.com/joomcode/e2ed/commit/a65f67c5324535a08acc12e2e12adc844540821b)
- [feat: add one more example of entity and route](https://github.com/joomcode/e2ed/commit/374650d87facbf3db7c69e86481e59291687d6f3)
- [feat: add test of ESM exports (function createTestCafe from e2ed/testcafe)](https://github.com/joomcode/e2ed/commit/50ec9192d4f95581038478787c5e9f8fef8b025b)

## [v0.10.2](https://github.com/joomcode/e2ed/tree/v0.10.2) (2022-05-08)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.1...v0.10.2)

- [feat: add e2ed/testcafe export with supporting both commonjs and esm](https://github.com/joomcode/e2ed/commit/2bc670136f4781ba4992fc72675ad2221003fc37)
- [chore: update eslint to 8.15.0](https://github.com/joomcode/e2ed/commit/dce832da2ca449094262bee469852f55f4109b2c)
- [fix: rename utility type PageClass to PageClassType](https://github.com/joomcode/e2ed/commit/6e106afe8dfba0b8af3072d028250d3471338129)

## [v0.10.1](https://github.com/joomcode/e2ed/tree/v0.10.1) (2022-05-06)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.10.0...v0.10.1)

- [fix: remove Awaited utility type for supporting TypeScript 4.4](https://github.com/joomcode/e2ed/commit/bc6666bb64787e770f7e06e5ed0b1b1b0c749938)

## [v0.10.0](https://github.com/joomcode/e2ed/tree/v0.10.0) (2022-05-06)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.17...v0.10.0)

- [feat: global refactoring of pageObjects, routes and actions](https://github.com/joomcode/e2ed/commit/de01d0520478ecef0d721f2921d0318c838d40bf)
- [chore: update devDependencies (@types/node, etc)](https://github.com/joomcode/e2ed/commit/0194e90c55a8fd1bf2c011d49ff1d159dc6ac9d0)

## [v0.9.17](https://github.com/joomcode/e2ed/tree/v0.9.17) (2022-04-28)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.16...v0.9.17)

- [chore: update devDependencies (typescript and @types/node)](https://github.com/joomcode/e2ed/commit/bc205f854e01ebb7efacde50eaa0ba9c8eb88ae4)
- [fix: run AFTER_TESTS script even when tests fails](https://github.com/joomcode/e2ed/commit/c5d7473afe3f889358e46d90f23f503eb55405fb)
- [chore: update devDependencies (@typescript-eslint/..., etc)](https://github.com/joomcode/e2ed/commit/1aa15b02fd0b7dde4bceff5f72df5a7ce238f416)
- [feat: more detailed options for launching an e2ed container](https://github.com/joomcode/e2ed/commit/af28c2a4e8b4850f20af3f9cba0e31c7b8938c62)

## [v0.9.16](https://github.com/joomcode/e2ed/tree/v0.9.16) (2022-04-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.15...v0.9.16)

- [fix: runEnvironment for TestCafe subprocesses (read from environment variable)](https://github.com/joomcode/e2ed/commit/a85421992fd0909c5d3d3cdec1f67c2dba7f9ac8)

## [v0.9.15](https://github.com/joomcode/e2ed/tree/v0.9.15) (2022-04-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.14...v0.9.15)

- [feat: use runEnvironment constant instead of environment variable (in config)](https://github.com/joomcode/e2ed/commit/082e935f54fe3fe1848c0c1d9832884c039ccffd)
- [chore: update eslint to 8.14.0](https://github.com/joomcode/e2ed/commit/2059dadbbd323aeae60de7580d6be674bc654bb4)
- [refactor: rename main bin files to uniform names](https://github.com/joomcode/e2ed/commit/153b53a44afadad5bbd56f72ec9a4eb4734b10c3)

## [v0.9.14](https://github.com/joomcode/e2ed/tree/v0.9.14) (2022-04-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.13...v0.9.14)

- [docs: add description for testLogsFileName config field in README.md](https://github.com/joomcode/e2ed/commit/6a489abb49a6e5bcee897ad5c97e82963433bc1b)

## [v0.9.13](https://github.com/joomcode/e2ed/tree/v0.9.13) (2022-04-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.12...v0.9.13)

- [fix: turn off colors inspect option for log messages](https://github.com/joomcode/e2ed/commit/485d010550104227a91a0a6b8aa56aac5c0045fa)
- [fix: use separate tmp directory for compiling e2ed/config.ts](https://github.com/joomcode/e2ed/commit/2572b6fe587810038de39ccf8fb31e8c6d7f6ed0)
- [feat: add field testLogsFileName to e2ed config](https://github.com/joomcode/e2ed/commit/14c2ac79add2cd0a6e2da56fc3ec30ad7ac6aa2c)

## [v0.9.12](https://github.com/joomcode/e2ed/tree/v0.9.12) (2022-04-18)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.11...v0.9.12)

- [chore: update devDependencies (@typescript-eslint/..., @types/node)](https://github.com/joomcode/e2ed/commit/1f73bf5e57560e8c8f4344b4c78bc5d9f4846fae)
- [feat: move default config fields directly to e2ed/config.ts](https://github.com/joomcode/e2ed/commit/b04afd026c3fa1d76a596d2576f0bbe57a717790)

## [v0.9.11](https://github.com/joomcode/e2ed/tree/v0.9.11) (2022-04-18)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.10...v0.9.11)

- [chore: update testcafe-without-typecheck to 1.18.6-rc.1](https://github.com/joomcode/e2ed/commit/a8523ef58d28d181e86259936d0d0555cb8b2aac)
- [feat: add reportFileName/liteReportFileName config fields insted of E2ED_REPORT_NAME](https://github.com/joomcode/e2ed/commit/0a2b33c45dfead776d50c6dd7e7051960515397f)
- [feat: remove E2ED_HIDE_LOGS environment variable](https://github.com/joomcode/e2ed/commit/1772c575c7d4a7cf20bb913b14d7ec9cffcc5528)

## [v0.9.10](https://github.com/joomcode/e2ed/tree/v0.9.10) (2022-04-14)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.9...v0.9.10)

- [chore: update @types/node to 17.0.24](https://github.com/joomcode/e2ed/commit/bf3d9e635257dfa53f1bfe4859eeef0d74e2c58f)
- [fix: TypeScript error on compiling e2ed/config.ts (add @types/node)](https://github.com/joomcode/e2ed/commit/df9e8aa4e587c01ec72c5d52981439b36da7be66)
- [fix: skip headers with undefined value in request function](https://github.com/joomcode/e2ed/commit/08874f808dc8c79850e8536fa11b2d15f26dadbf)

## [v0.9.9](https://github.com/joomcode/e2ed/tree/v0.9.9) (2022-04-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.8...v0.9.9)

- [chore: temporary remove npm audit check (because of package "async")](https://github.com/joomcode/e2ed/commit/a9cefba645f117b1fca196b2026b034673f42e8e)
- [fix: path to report.json for run with retries](https://github.com/joomcode/e2ed/commit/21fe0d3abb428c506135f92c0f0e8b5191db6e4d)

## [v0.9.8](https://github.com/joomcode/e2ed/tree/v0.9.8) (2022-04-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.7...v0.9.8)

- [chore: update devDependencies (@typescript-eslint/...)](https://github.com/joomcode/e2ed/commit/91bd275365407f42ffff1b31c521ef36ba3569f2)
- [refactor: cut runWithRetries into several functions](https://github.com/joomcode/e2ed/commit/1f65fc1e97d006c8fd6ae6cd6a7b5d2328882ba5)

## [v0.9.7](https://github.com/joomcode/e2ed/tree/v0.9.7) (2022-04-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.6...v0.9.7)

- [fix: reexport createTestCafe from testcafe-without-typecheck](https://github.com/joomcode/e2ed/commit/4397a4c010d98fb86ddcc2d60bae34a1f3f66972)
- [chore: update eslint to 8.13.0](https://github.com/joomcode/e2ed/commit/f593f6bb9bafef36cf1b3b4c7a9c95b8ef78ecf3)
- [chore: use node: imports instead of bare node imports](https://github.com/joomcode/e2ed/commit/92b949a33aacd9d649b2a322fe1bfa3a90702f3f)
- [chore: update devDependencies (@typescript-eslint/\*, ...)](https://github.com/joomcode/e2ed/commit/a859e2a44872ab12bce05a6d968de3e2c0e18f3d)
- [fix: turn on unofficial strict mode in shell scripts](https://github.com/joomcode/e2ed/commit/0e9cf810e2e2756698e192a9e1825de7b9f4eb22)

## [v0.9.6](https://github.com/joomcode/e2ed/tree/v0.9.6) (2022-04-03)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.5...v0.9.6)

- [chore: update TestCafe to 1.18.5](https://github.com/joomcode/e2ed/commit/4735e1b096086d72baf84d3f9a9a2fcf028bedbb)
- [chore: update devDependencies (eslint, prettier, typescript...)](https://github.com/joomcode/e2ed/commit/3e7c635b623ab4ac1d4693af9b31d8566dff8a38)

## [v0.9.5](https://github.com/joomcode/e2ed/tree/v0.9.5) (2022-03-24)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.4...v0.9.5)

- [fix: typo in check-all command (npm audio instead of npm audit)](https://github.com/joomcode/e2ed/commit/355ad2f5a47303ae84b46dc698605827621d881c)
- [chore: update devDependencies; fix audit issues (by npm audit)](https://github.com/joomcode/e2ed/commit/4b969d8980c01d29ff3c50b00e6d48b45de58c08)

## [v0.9.4](https://github.com/joomcode/e2ed/tree/v0.9.4) (2022-03-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.3...v0.9.4)

- [fix: explicitly export failed test run statuses](https://github.com/joomcode/e2ed/commit/e4ef1c51ea04aa98ac5942692058d7f58c6288c0)

## [v0.9.3](https://github.com/joomcode/e2ed/tree/v0.9.3) (2022-03-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.2...v0.9.3)

- [feat: add explicit exit status for local run and run in docker](https://github.com/joomcode/e2ed/commit/9fc013569a36638c915076372ffd11d410671744)

## [v0.9.2](https://github.com/joomcode/e2ed/tree/v0.9.2) (2022-03-22)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.1...v0.9.2)

- [feat: support skipping of all tests](https://github.com/joomcode/e2ed/commit/2db1ec06c54f5b0f448724b83ca91de5c4d8a99b)

## [v0.9.1](https://github.com/joomcode/e2ed/tree/v0.9.1) (2022-03-22)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.9.0...v0.9.1)

- [feat: support skipped tests](https://github.com/joomcode/e2ed/commit/f565c8f7e5406da1222cc419d1ab0c7bfa2049ba)
- [feat: add local e2ed/overrideConfig.ts for overriding userland config](https://github.com/joomcode/e2ed/commit/e49e6b997ffecab28d598c5187dd5055dc5aeb05)
- [chore: update devDependencies (@typescript-eslint/...); temporary remove npm audit](https://github.com/joomcode/e2ed/commit/7efdf2be6bea55d2b514da3c691caa3d55d364c5)
- [feat: save startInfo in report as object; read concurrency from config](https://github.com/joomcode/e2ed/commit/b5a8cd5fbbef061101c1375472eb32ab4989b066)

## [v0.9.0](https://github.com/joomcode/e2ed/tree/v0.9.0) (2022-03-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.26...v0.9.0)

- [feat: use userland e2ed/config.ts instead of e2ed/config.json](https://github.com/joomcode/e2ed/commit/e642776bb7b0eb3e5b2429c18014590587dd9a6d)
- [feat: separate userlandConfig; use getFullConfig instead of direct import](https://github.com/joomcode/e2ed/commit/a897e2dae56bb431b0459d9d22aba06a88a441b3)
- [feat: add compiling of userland config.ts](https://github.com/joomcode/e2ed/commit/010d86300d58866338f2d445e9b0556278361569)
- [chore: update prettier to 2.6.0](https://github.com/joomcode/e2ed/commit/2ba157cd90bef4ed0ce3f0c534690b3d3d2199f6)

## [v0.8.26](https://github.com/joomcode/e2ed/tree/v0.8.26) (2022-03-15)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.25...v0.8.26)

- [chore: update devDependencies (@typescript-eslint/...)](https://github.com/joomcode/e2ed/commit/7c3173fa66169e804b15231be731d935e97ecfad)
- [feat: add LogEventType.Assert for user assertions](https://github.com/joomcode/e2ed/commit/4054b6821a30d15ed5ee9936f9e5856441c12014)

## [v0.8.25](https://github.com/joomcode/e2ed/tree/v0.8.25) (2022-03-14)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.24...v0.8.25)

- [feat: increase the maximum values of environment variables](https://github.com/joomcode/e2ed/commit/024c84a2f42af4949b5d8ee670967a65fc6f0688)

## [v0.8.24](https://github.com/joomcode/e2ed/tree/v0.8.24) (2022-03-14)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.23...v0.8.24)

- [chore: update eslint to 8.11.0](https://github.com/joomcode/e2ed/commit/b47a446bbe268abfe77cf422bdf840139169d9b2)
- [feat: if all tests fail, reduce concurrency by half](https://github.com/joomcode/e2ed/commit/2f544dee762314bce27079b33a1e9139bbfb9ef5)

## [v0.8.23](https://github.com/joomcode/e2ed/tree/v0.8.23) (2022-03-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.22...v0.8.23)

- [fix: use CLI parameter "browsers" from config for local run](https://github.com/joomcode/e2ed/commit/63489381a3084d1ee913a165b1d07aa90548370c)

## [v0.8.22](https://github.com/joomcode/e2ed/tree/v0.8.22) (2022-03-10)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.21...v0.8.22)

- [chore: update devDependencies (@typescript-eslint/...)](https://github.com/joomcode/e2ed/commit/5a5c0a50950293160488280d728ea8b71cc80f05)
- [feat: add LogEventStatus; watch scroll in waitForInterfaceStabilization](https://github.com/joomcode/e2ed/commit/3be0f1740e1bc7956e23dcec2ebde96c92410e5e)

## [v0.8.21](https://github.com/joomcode/e2ed/tree/v0.8.21) (2022-03-03)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.20...v0.8.21)

- [chore: update devDependencies (typescript, eslint, etc)](https://github.com/joomcode/e2ed/commit/a450ffc95b9ccc31386fefd0d5c61773fd38556f)

## [v0.8.20](https://github.com/joomcode/e2ed/tree/v0.8.20) (2022-02-22)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.19...v0.8.20)

- [chore: update testcafe-without-typecheck to 1.18.4-rc.1](https://github.com/joomcode/e2ed/commit/a7a295ad94d37bce7915cfa7e17b99e00d8932c9)

## [v0.8.19](https://github.com/joomcode/e2ed/tree/v0.8.19) (2022-02-22)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.18...v0.8.19)

- [chore: update devDependencies (@types/node, etc)](https://github.com/joomcode/e2ed/commit/d24b597863b3f9f1fb2599e0db0efc90fb1dc964)
- [feat: extract broken test runs in lite report to separate field](https://github.com/joomcode/e2ed/commit/49789762137e4f66eac0ac79347a45e7cf2aca80)

## [v0.8.18](https://github.com/joomcode/e2ed/tree/v0.8.18) (2022-02-19)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.17...v0.8.18)

- [chore: update devDependencies (eslint-config-prettier)](https://github.com/joomcode/e2ed/commit/e906aa7ad9b355503ad0009ca6057c3b81379f0a)
- [fix: exit with correct status when run in docker](https://github.com/joomcode/e2ed/commit/b6a2a9e9fb81f6fa32510ceb5ba6f3f49cba8550)

## [v0.8.17](https://github.com/joomcode/e2ed/tree/v0.8.17) (2022-02-17)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.16...v0.8.17)

- [feat: add setNativeDialogHandler action; add internal TestClientGlobal type](https://github.com/joomcode/e2ed/commit/dfb4ef2bf1ac0dc1a08dbc849e465d8df08a66ca)

## [v0.8.16](https://github.com/joomcode/e2ed/tree/v0.8.16) (2022-02-16)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.15...v0.8.16)

- [fix: use correct test run status for TestRunDetails; add interval arg to reloadPage action](https://github.com/joomcode/e2ed/commit/656aad836f955a30353f4e343feceb794d960617)

## [v0.8.15](https://github.com/joomcode/e2ed/tree/v0.8.15) (2022-02-14)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.14...v0.8.15)

- [chore: update development dependencies (eslint, etc)](https://github.com/joomcode/e2ed/commit/5db0ee18229d2ce10d1d17eea01142c33febf334)

## [v0.8.14](https://github.com/joomcode/e2ed/tree/v0.8.14) (2022-02-07)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.13...v0.8.14)

- [feat: support query as string in request function](https://github.com/joomcode/e2ed/commit/5f48dbea81ee909720df13e5667e5a74d49ea80c)

## [v0.8.13](https://github.com/joomcode/e2ed/tree/v0.8.13) (2022-02-07)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.12...v0.8.13)

- [feat: write lite JSON report after running all retries](https://github.com/joomcode/e2ed/commit/7ae71192266eba82749546a30c3f5eb41ad3e084)
- [feat: add retries list to report data (for lite report)](https://github.com/joomcode/e2ed/commit/b87276be9b29bf724381f9cb62bbc8eb045746c2)
- [chore: update @types/nodes](https://github.com/joomcode/e2ed/commit/0aa1f196a158397a0885c56831a16daa5cfc4bf5)
- [feat: add word Route to route files; remove unused getRunHashUnificator](https://github.com/joomcode/e2ed/commit/8b368edc375edf8174f207809fc58a4087135e12)

## [v0.8.12](https://github.com/joomcode/e2ed/tree/v0.8.12) (2022-02-03)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.11...v0.8.12)

- [feat: rename routes (add Route to the end of route names)](https://github.com/joomcode/e2ed/commit/ecea29d74f488d96468bc9ee86c1948b225f2325)

## [v0.8.11](https://github.com/joomcode/e2ed/tree/v0.8.11) (2022-02-02)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.10...v0.8.11)

- [fix: use debug port in docker only when E2ED_DEBUG is set](https://github.com/joomcode/e2ed/commit/5060b5db94a3f3aba37ffc395b0c0734d2780974)

## [v0.8.10](https://github.com/joomcode/e2ed/tree/v0.8.10) (2022-02-02)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.9...v0.8.10)

- [feat: support 'before tests' and 'after tests' scripts](https://github.com/joomcode/e2ed/commit/efdaaf91b4807cb14840e8117bed3800bce3eea6)

## [v0.8.9](https://github.com/joomcode/e2ed/tree/v0.8.9) (2022-02-01)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.8...v0.8.9)

- [chore: update testcafe-without-typecheck to 1.18.3-rc.1](https://github.com/joomcode/e2ed/commit/47ffdc832a7c76fac0d3d3cd11d855680742f812)
- [chore: update devDependencies (eslint, etc)](https://github.com/joomcode/e2ed/commit/eb98b5a5fed273b935dbce2787cf5b2dced15a5e)
- [fix: use file size instead of ctime for report.json](https://github.com/joomcode/e2ed/commit/6ac31ed175bcf000c447cfc9c5134604bbc7b153)

## [v0.8.8](https://github.com/joomcode/e2ed/tree/v0.8.8) (2022-01-25)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.7...v0.8.8)

- [fix: fake use of getCspHash](https://github.com/joomcode/e2ed/commit/4c5b7f7fe53c47ec5284a01bb1f78d89b87c6c08)
- [chore: update TestCafe to 1.18.2](https://github.com/joomcode/e2ed/commit/05d44ffa81390ad33bb5177ebb255bf36c75e0df)
- [chore: update @types/node to 17.0.12](https://github.com/joomcode/e2ed/commit/6c0cb79cec56d4aaab038d92c5d9c39c540f9a39)
- [feat: supports direct imports from components, apiRoutes and pageRoutes](https://github.com/joomcode/e2ed/commit/327ad80318b4c975c1a7fd8fee6540bc01a38eba)

## [v0.8.7](https://github.com/joomcode/e2ed/tree/v0.8.7) (2022-01-24)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.6...v0.8.7)

- [chore: update devDependencies and temporary remove npm audit](https://github.com/joomcode/e2ed/commit/cce33992fc5e74acd58c10574e12a6881c2772a2)
- [fix: tests should start without reports/report.json files](https://github.com/joomcode/e2ed/commit/321540df279f4c9fab331b753743172b988c4f6a)
- [chore: update devDependencies](https://github.com/joomcode/e2ed/commit/cea9e21ffb034960c57de01acffdb8ff1c051eb4)
- [feat: add package "exports" field; add argument to getLogContext](https://github.com/joomcode/e2ed/commit/0b69be966bae1f10f11169aeb17b2c1ebd66d821)

## [v0.8.6](https://github.com/joomcode/e2ed/tree/v0.8.6) (2022-01-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.5...v0.8.6)

- [feat: use streams for writing files (HTML report and others)](https://github.com/joomcode/e2ed/commit/f3ef395c75a87116b75cbc17dd277990dd51f9ba)
- [feat: remove field "scripts" from published package.json](https://github.com/joomcode/e2ed/commit/03725b2d6682ce56f569c69515feb84dbed499f4)

## [v0.8.5](https://github.com/joomcode/e2ed/tree/v0.8.5) (2022-01-10)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.4...v0.8.5)

- [chore: update @typescript-eslint/\*](https://github.com/joomcode/e2ed/commit/aed239d6242215ddb5771e8cdb293d6eb3da1ac5)
- [feat: remove shebang from TS bin files; print duration of report saving](https://github.com/joomcode/e2ed/commit/0ff011f06513219951c32fa2ef859190e1f47466)

## [v0.8.4](https://github.com/joomcode/e2ed/tree/v0.8.4) (2022-01-10)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.3...v0.8.4)

- [refactor: move base client functions from global to script context](https://github.com/joomcode/e2ed/commit/3256039412d4c53edcab61097e4b7f22ccf6868e)
- [chore: update devDependencies (eslint, etc)](https://github.com/joomcode/e2ed/commit/bab2459c7ce8d85d88029e4f4802a684b7eefb1f)
- [feat: use RunLabel as mandatory field in TestRun](https://github.com/joomcode/e2ed/commit/4524d1732519b7c2a3baaa186deb1d5038ce24f8)

## [v0.8.3](https://github.com/joomcode/e2ed/tree/v0.8.3) (2021-12-28)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.2...v0.8.3)

- [fix: remove extra space between DOM text nodes (in report)](https://github.com/joomcode/e2ed/commit/dabff90dde1bf984e5b27cfec42c337162927533)

## [v0.8.2](https://github.com/joomcode/e2ed/tree/v0.8.2) (2021-12-28)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.1...v0.8.2)

- [chore: update devDependencies (@typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/57e00a5b4815d2ade2e47bf98a15a6e6672a88bc)

## [v0.8.1](https://github.com/joomcode/e2ed/tree/v0.8.1) (2021-12-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.8.0...v0.8.1)

- [fix: typo in html template](https://github.com/joomcode/e2ed/commit/5f47150edb1fbf9b01e2b3d78e40e27a4b757667)

## [v0.8.0](https://github.com/joomcode/e2ed/tree/v0.8.0) (2021-12-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.41...v0.8.0)

- [feat: render TestRun errors, as simple messages](https://github.com/joomcode/e2ed/commit/4b229e2d9207e481dd078bc40712299f8c16e0a0)

## [v0.7.41](https://github.com/joomcode/e2ed/tree/v0.7.41) (2021-12-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.40...v0.7.41)

- [feat: render TestRun steps](https://github.com/joomcode/e2ed/commit/e62043b0a02e35a9ff1382392c3c75ab0d45dca0)

## [v0.7.40](https://github.com/joomcode/e2ed/tree/v0.7.40) (2021-12-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.39...v0.7.40)

- [feat: render TestRun description (meta, date and duration)](https://github.com/joomcode/e2ed/commit/ac0a3f915eb2d44b6181fa604de1323e88ce4b28)

## [v0.7.39](https://github.com/joomcode/e2ed/tree/v0.7.39) (2021-12-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.38...v0.7.39)

- [feat: render header of test run details](https://github.com/joomcode/e2ed/commit/31bfcbf97db5dddac77759e24eaf6a8168cb8ecf)

## [v0.7.38](https://github.com/joomcode/e2ed/tree/v0.7.38) (2021-12-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.37...v0.7.38)

- [refactor: rename the list of test runs in retries](https://github.com/joomcode/e2ed/commit/4073dfaabc2fbf9eb51bd657bbddbc82e9dbbe6b)

## [v0.7.37](https://github.com/joomcode/e2ed/tree/v0.7.37) (2021-12-27)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.36...v0.7.37)

- [feat: render timings of retry; render logo from file; refactor some styles](https://github.com/joomcode/e2ed/commit/ebded95cbe89d7f4e09a2d9dc3064d228bfe17b0)

## [v0.7.36](https://github.com/joomcode/e2ed/tree/v0.7.36) (2021-12-26)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.35...v0.7.36)

- [chore: update @types/node to 17.0.5](https://github.com/joomcode/e2ed/commit/2df1cb5759ecfddc7ac89e8e8d749ffc8fc73b01)
- [feat: add simple-import-sort/imports ESLint rule and some import/\* rules](https://github.com/joomcode/e2ed/commit/fd81e0850106c934147f86df6d2fc5eb43fab5fc)

## [v0.7.35](https://github.com/joomcode/e2ed/tree/v0.7.35) (2021-12-26)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.34...v0.7.35)

- [refactor: divide request.ts into several parts; turn on simple-import-sort/exports rule](https://github.com/joomcode/e2ed/commit/78bc26b5f2911127d18c55114af1c3b832c90ea0)

## [v0.7.34](https://github.com/joomcode/e2ed/tree/v0.7.34) (2021-12-25)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.33...v0.7.34)

- [refactor: split pixelmatch.ts into different files; add sort-keys eslint rule](https://github.com/joomcode/e2ed/commit/784b671883140c30d5cc89476d9aa215a0284678)

## [v0.7.33](https://github.com/joomcode/e2ed/tree/v0.7.33) (2021-12-25)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.32...v0.7.33)

- [fix: check:all command runs linting and tests sequentially](https://github.com/joomcode/e2ed/commit/b71badce20d7c13c4cff014eceb618cfe27a4993)
- [fix: typo in checkTestCafeVersion script](https://github.com/joomcode/e2ed/commit/df30d2f8001b2c97dfdce3eb78c2933768c78a4f)
- [fix: update TestCafe in docker to 1.18.1; add checkTestCafeVersion script](https://github.com/joomcode/e2ed/commit/7792b47d91eac7d01d7f6d26cd1c9d3eef4e2cdb)

## [v0.7.32](https://github.com/joomcode/e2ed/tree/v0.7.32) (2021-12-25)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.31...v0.7.32)

- [chore: update testcafe-without-typecheck to 1.18.1-rc.1](https://github.com/joomcode/e2ed/commit/35cf198f47c048bab88daeb659e5e49074254216)
- [feat: sanitize all rendering strings (simple XSS protection)](https://github.com/joomcode/e2ed/commit/69d1b56872cab8cffae20abc60ea517180fadbc8)

## [v0.7.31](https://github.com/joomcode/e2ed/tree/v0.7.31) (2021-12-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.30...v0.7.31)

- [chore: update devDependencies (@types/node to 17.0.4)](https://github.com/joomcode/e2ed/commit/477cc4dc6556dc04db4308a590d42178580581b3)
- [feat: add listener for click on choose retry button](https://github.com/joomcode/e2ed/commit/d1edc5cc798e6028b6c2d186a5791cc8cf237441)

## [v0.7.30](https://github.com/joomcode/e2ed/tree/v0.7.30) (2021-12-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.29...v0.7.30)

- [fix: do not skip commits with version numbers in CHANGELOG.md](https://github.com/joomcode/e2ed/commit/b109af2c55933160a9961e94a4bc8cb89b8453a4)

## [v0.7.29](https://github.com/joomcode/e2ed/tree/v0.7.29) (2021-12-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.28...v0.7.29)

- [chore: update devDependencies (@types/node, @typescript-eslint/\*)](https://github.com/joomcode/e2ed/commit/2cdfd8602f0aa66f96734cd714c441e6ef32bc51)
- [feat: add assertion that tests names are unique in one retry](https://github.com/joomcode/e2ed/commit/124d613e79c46cc858fd7e989e40bf6a71912d6a)

## [v0.7.28](https://github.com/joomcode/e2ed/tree/v0.7.28) (2021-12-22)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.27...v0.7.28)

- [feat: force end TestRunEvent (again!) if TestCafe do not call "after" hook](https://github.com/joomcode/e2ed/commit/a9fec76dc6522345cdc5cfa40001ec6fb3f67bb2)
- [feat: add unificateRunHashes function for getting unique run hashes](https://github.com/joomcode/e2ed/commit/50997378d1a97fc9473c97def4ee07ee6e1b836d)

## [v0.7.27](https://github.com/joomcode/e2ed/tree/v0.7.27) (2021-12-21)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.26...v0.7.27)

- [fix: reject test promise when test is out of time instead of force end TestRunEvent](https://github.com/joomcode/e2ed/commit/7f386ebe5dd2be100bfc0b52880de12a6b4cec61)

## [v0.7.26](https://github.com/joomcode/e2ed/tree/v0.7.26) (2021-12-21)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.25...v0.7.26)

- [feat: add log in clear TestRun event](https://github.com/joomcode/e2ed/commit/c7f95ba0292e79794a967c82654c56df94e07b85)

## [v0.7.25](https://github.com/joomcode/e2ed/tree/v0.7.25) (2021-12-21)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.24...v0.7.25)

- [fix: remove long logEvents arrays from logs](https://github.com/joomcode/e2ed/commit/0dc5054092aa8a3daac49f3b84832fa2ea9ee5ab)

## [v0.7.24](https://github.com/joomcode/e2ed/tree/v0.7.24) (2021-12-21)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.23...v0.7.24)

- [feat: add property testRunExecutionTimeout to config; fix internally retried runs](https://github.com/joomcode/e2ed/commit/9553b6ebeae4047adfc2c8dc8a99fe641c4fe7f0)

## [v0.7.23](https://github.com/joomcode/e2ed/tree/v0.7.23) (2021-12-21)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.22...v0.7.23)

- [fix: force end for previous test run (instead of wrong ending of current run)](https://github.com/joomcode/e2ed/commit/4a55eba9222dbe6cd37803dd1c603d7ae51a66b6)

## [v0.7.22](https://github.com/joomcode/e2ed/tree/v0.7.22) (2021-12-21)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.21...v0.7.22)

- [fix: add general logs for forcing end of TestRun event](https://github.com/joomcode/e2ed/commit/299359645c357cb5bf8ee01e4b03a3fbba74b258)

## [v0.7.21](https://github.com/joomcode/e2ed/tree/v0.7.21) (2021-12-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.20...v0.7.21)

- [fix: remove dependency on hooks from E2EDError constructor](https://github.com/joomcode/e2ed/commit/86e810df79dee3b57426238e29f677dc265fc7e2)

## [v0.7.20](https://github.com/joomcode/e2ed/tree/v0.7.20) (2021-12-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.19...v0.7.20)

- [feat: force end TestRuns which are internally retrying by TestCafe](https://github.com/joomcode/e2ed/commit/ae5a9d26b000f8bd8290e781a0ee5d8e660c10a9)

## [v0.7.19](https://github.com/joomcode/e2ed/tree/v0.7.19) (2021-12-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.18...v0.7.19)

- [feat: add original errors object to TestRunEvent](https://github.com/joomcode/e2ed/commit/5891429bf55a59feafa0e138bd2aa595d386f080)
- [feat: add ended flag to TestRunEvent; add bin-v8-flags-filter to peer dependencies](https://github.com/joomcode/e2ed/commit/b92462b3ccbb902b0ce3bae3edc1478a3585aa96)

## [v0.7.18](https://github.com/joomcode/e2ed/tree/v0.7.18) (2021-12-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.17...v0.7.18)

- [feat: add checks that e2ed/hooks has specified module interface](https://github.com/joomcode/e2ed/commit/9f6eeb24896047f9a185bda5a5d5f55d1eb1d6c6)
- [fix: remove unnecessary empty test file from builded package](https://github.com/joomcode/e2ed/commit/04e63b00f55be643d2e1efbe0f6a84ccd703d48f)

## [v0.7.17](https://github.com/joomcode/e2ed/tree/v0.7.17) (2021-12-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.16...v0.7.17)

- [fix: rename hooks as normal get-functions](https://github.com/joomcode/e2ed/commit/9fafdfa54134ca557471a9fd9b7efc4946c18c92)

## [v0.7.16](https://github.com/joomcode/e2ed/tree/v0.7.16) (2021-12-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.15...v0.7.16)

- [fix: check unvisited test files only in docker; fix local register EndE2edRunEvent](https://github.com/joomcode/e2ed/commit/8d65c24a4a1fb8769bd7d23027278b76f258b341)

## [v0.7.15](https://github.com/joomcode/e2ed/tree/v0.7.15) (2021-12-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.14...v0.7.15)

- [feat: check that all tests files was visited during tests run](https://github.com/joomcode/e2ed/commit/a982b50bf9f73f61bae5db7b053c5dd546b15b89)
- [refactor: directories utils/events and utils/report](https://github.com/joomcode/e2ed/commit/9ec9852c3b999a7f32d734cc47188a0e2c20557f)

## [v0.7.14](https://github.com/joomcode/e2ed/tree/v0.7.14) (2021-12-18)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.13...v0.7.14)

- [feat: refactoring event names (finish -> end, etc.)](https://github.com/joomcode/e2ed/commit/48ceeca4b47efec031881ae9c044c59940617b29)

## [v0.7.13](https://github.com/joomcode/e2ed/tree/v0.7.13) (2021-12-18)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.12...v0.7.13)

- [fix: local run with E2ED_DEBUG; remove unnecessary script bin/e2ed.sh](https://github.com/joomcode/e2ed/commit/af08d24afc62c7672f0c6e7128a7352cc7499b0a)

## [v0.7.12](https://github.com/joomcode/e2ed/tree/v0.7.12) (2021-12-18)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.11...v0.7.12)

- [chore: update eslint to latest version](https://github.com/joomcode/e2ed/commit/9ff0e7257d06eb02df2a7276dca44fbbf04fef46)
- [feat: support environment variable E2ED_REPORT_NAME (for HTML report)](https://github.com/joomcode/e2ed/commit/c42730836892cd37fce9c33ed64432f2907143b9)

## [v0.7.11](https://github.com/joomcode/e2ed/tree/v0.7.11) (2021-12-17)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.10...v0.7.11)

- [feat: use own runId for internally retried test runs; mark such retries as broken](https://github.com/joomcode/e2ed/commit/cdc653f0861cee43f7911115edb55f734e6e5ad8)

## [v0.7.10](https://github.com/joomcode/e2ed/tree/v0.7.10) (2021-12-17)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.9...v0.7.10)

- [fix: select first non-empty retry](https://github.com/joomcode/e2ed/commit/e08097f44139e925918b42c9cd073e784b319dd5)
- [fix: remove empty unnecessary hidden test runs lists](https://github.com/joomcode/e2ed/commit/9883a3dc9ba0f04aeae313c49490a9086e1bc2d4)

## [v0.7.9](https://github.com/joomcode/e2ed/tree/v0.7.9) (2021-12-17)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.8...v0.7.9)

- [feat: render empty test runs lists for empty retries](https://github.com/joomcode/e2ed/commit/8e4f2573d8c83b0ba53ecdee225b5982a5b460d1)

## [v0.7.8](https://github.com/joomcode/e2ed/tree/v0.7.8) (2021-12-16)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.7...v0.7.8)

- [feat: add e2edAddOnClickOnClass client utility function](https://github.com/joomcode/e2ed/commit/de355a1eafd58fedcb71a99e8fa669230201ff11)
- [feat: move client page scripts to separate directory](https://github.com/joomcode/e2ed/commit/c95411dc09561dcad4be4173d92c34cc580014e1)
- [feat: get initial page script that runs before DOMContentLoaded](https://github.com/joomcode/e2ed/commit/05141b64268356dcc4bd26bd6cdfe82836fad26c)
- [feat: show disabled retries buttons: fix e2ed local run script](https://github.com/joomcode/e2ed/commit/c9022c9f8fc98132ecd57f1546de9b3d5c4c9fb5)

## [v0.7.7](https://github.com/joomcode/e2ed/tree/v0.7.7) (2021-12-16)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.6...v0.7.7)

- [fix: TestCafe can retry failed tests in some cases](https://github.com/joomcode/e2ed/commit/6aed9485c967cdb666b186a976cd45a7880390cc)

## [v0.7.6](https://github.com/joomcode/e2ed/tree/v0.7.6) (2021-12-16)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.5...v0.7.6)

- [fix: debug scripts (error with supporting E2ED_DEBUG)](https://github.com/joomcode/e2ed/commit/072dbcb0b4572a6acaf35aaa4b675f070f3df276)

## [v0.7.5](https://github.com/joomcode/e2ed/tree/v0.7.5) (2021-12-16)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.4...v0.7.5)

- [fix: add missing bin script to package](https://github.com/joomcode/e2ed/commit/fcf99451c78530b8008cd09a6026b140e323be09)

## [v0.7.4](https://github.com/joomcode/e2ed/tree/v0.7.4) (2021-12-16)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.3...v0.7.4)

- [fix: npm bin script error (bin should be path to executed scripts)](https://github.com/joomcode/e2ed/commit/5b78b3c7f685423f0b9bf6a82f905bbb233c1b1e)

## [v0.7.3](https://github.com/joomcode/e2ed/tree/v0.7.3) (2021-12-16)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.2...v0.7.3)

- [fix: log reports errors; fix require hooks bug; add E2ED_DEBUG](https://github.com/joomcode/e2ed/commit/7423bf88511e025f7778d520ba57b93ee7573798)
- [chore: update @types/node; log about duplicate test run hashes](https://github.com/joomcode/e2ed/commit/93c26a373fee43bcf94786a99de9662e32ce6b83)

## [v0.7.2](https://github.com/joomcode/e2ed/tree/v0.7.2) (2021-12-15)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.1...v0.7.2)

- [fix: error with reading tests result from filesystem; use separate runId and runHash](https://github.com/joomcode/e2ed/commit/1e7284680a0cdb15d9c0fc13d87bfbee1baa152c)

## [v0.7.1](https://github.com/joomcode/e2ed/tree/v0.7.1) (2021-12-15)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.7.0...v0.7.1)

- [feat: add mainParams hook for printing main test params in tests list](https://github.com/joomcode/e2ed/commit/c2680c27197544db08afa9dfa388c07800db5adb)

## [v0.7.0](https://github.com/joomcode/e2ed/tree/v0.7.0) (2021-12-15)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.6.8...v0.7.0)

- [feat: add generation and saving HTML report](https://github.com/joomcode/e2ed/commit/e803cc498bb1f9456d53416925459d228e258112)
- [feat: convert report data to test runs lists (by retries)](https://github.com/joomcode/e2ed/commit/096d50d4fee5e49090fe6dfc950d80889fc54b68)
- [chore: update development dependencies (typescript, @types/node...)](https://github.com/joomcode/e2ed/commit/17bf1601ffa4d7b75ac6c09bc9b99de8f5fcfb44)
- [feat: add runId hooks for getting unique test run id](https://github.com/joomcode/e2ed/commit/bc3e9afea2f4b4c22a97364dfc9ec3fad6f70991)

## [v0.6.8](https://github.com/joomcode/e2ed/tree/v0.6.8) (2021-12-14)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.6.7...v0.6.8)

- [feat: add scrollIntoView action](https://github.com/joomcode/e2ed/commit/6908112ac18e65d2988c91b0d368e4a59529663b)
- [feat: collect data from event files for report](https://github.com/joomcode/e2ed/commit/bbbb212034f9515297c31c25beeb270a7d81e932)

## [v0.6.7](https://github.com/joomcode/e2ed/tree/v0.6.7) (2021-12-14)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.6.6...v0.6.7)

- [fix: prettify CHANGELOG.md in release process](https://github.com/joomcode/e2ed/commit/1f66fd76d7b6ff5e7c6650346f9f7ded794a9cad)
- [feat: convert LogEventType from union to const enum](https://github.com/joomcode/e2ed/commit/b37496efc17eb6e12776b70f5c5866b5dfa8bfe1)
- [feat: add collecting and saving completed test run objects](https://github.com/joomcode/e2ed/commit/566cdb0d5262f1b7b5457404c1eb11d190796bee)
- [feat: add RunE2edEvent and FinishE2edEvent (for report)](https://github.com/joomcode/e2ed/commit/29a1eec72d29bd6c379fde107cdb4708b6a5602c)
- [feat: add FinishTest event](https://github.com/joomcode/e2ed/commit/d929da53319dec29a686fa31ea6581d2cb819df7)
- [feat: add logo; add createDirectory and removeDirectory utils](https://github.com/joomcode/e2ed/commit/40f4b04b491b095546135d2421e95c51d0c7b059)

## [v0.6.6](https://github.com/joomcode/e2ed/tree/v0.6.6) (2021-12-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.6.5...v0.6.6)

- [feat: add cloneWithoutUndefinedProperties utility function](https://github.com/joomcode/e2ed/commit/22b3d5166ea7c4f3409aeacceb4573b2cf62488f)

## [v0.6.5](https://github.com/joomcode/e2ed/tree/v0.6.5) (2021-12-12)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.6.4...v0.6.5)

- [feat: add DeepMutable and DeepRequired types; fix log event type typo](https://github.com/joomcode/e2ed/commit/21c6342a8b6d3ab3ea993890c88d345ab88126f9)

## [v0.6.4](https://github.com/joomcode/e2ed/tree/v0.6.4) (2021-12-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.6.3...v0.6.4)

- [feat: add DeepPartial<T> utility type](https://github.com/joomcode/e2ed/commit/e61ba858d4818c17650a748a9a32860f3ffc84db)

## [v0.6.3](https://github.com/joomcode/e2ed/tree/v0.6.3) (2021-12-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.6.2...v0.6.3)

- [feat: add general UtcTimeInMs type](https://github.com/joomcode/e2ed/commit/65973e719735fd98bc6c6fdb42347141b3b76c82)

## [v0.6.2](https://github.com/joomcode/e2ed/tree/v0.6.2) (2021-12-11)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.6.1...v0.6.2)

- [feat: add support for entities (from Domain-driven design)](https://github.com/joomcode/e2ed/commit/e3dabb9fb1724a5c34d3e6609f6f2cdd78d548db)
- [fix: use runParallel.sh for saving jobs exit code](https://github.com/joomcode/e2ed/commit/49fd2487017fcd6bab9720e30956b1938f42d2cc)
- [feat: add exactOptionalPropertyTypes options; update @types/node](https://github.com/joomcode/e2ed/commit/a916f67128a2c8fb345f448e58344aadad45675e)

## [v0.6.1](https://github.com/joomcode/e2ed/tree/v0.6.1) (2021-12-07)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.6.0...v0.6.1)

- [chore: update devDependencies (@typescript-eslint/\*, eslint, prettier)](https://github.com/joomcode/e2ed/commit/a7e60f50521b698cf754ce4a89d8f14218a1e12f)
- [feat: add pageParams and routeParams getters to pages; getParams -> getParamsFromUrl](https://github.com/joomcode/e2ed/commit/a679164d15f96f9140dfd94bb3f1d4c114d300a7)
- [feat: add Url brand type; add recursive DeepReadonly type](https://github.com/joomcode/e2ed/commit/a4f2254d4e9fda23ac5a29c545066fad6bad27f1)

## [v0.6.0](https://github.com/joomcode/e2ed/tree/v0.6.0) (2021-11-25)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.5.9...v0.6.0)

- [feat: add negative test for expect (expect should throw an error)](https://github.com/joomcode/e2ed/commit/24cf2d1150e32ab6ac72193047e7760e4ced88ac)
- [fix: add extends module for internal extending TestCafe types](https://github.com/joomcode/e2ed/commit/45c0c6d6f0d2d8da3edf2cae22253986fb828db6)
- [Merge pull request #1 from nazarov-mi/fix-expect-util](https://github.com/joomcode/e2ed/commit/5a3206a32455ae812bdac0c719641e44d7f0d813)
- [feat: add filePath to RunTestEvent; add TypeScript to peerDependencies](https://github.com/joomcode/e2ed/commit/d15bb3c4d3006b56eaf85ba96a7e5b1b5dd35409)
- [feat: add getStackTrace util (V8 callsite)](https://github.com/joomcode/e2ed/commit/b9796936a90d88a3ba7754703147efad72c8341a)
- [fix: move runLabel from LogEvent to RunTestEvent; restore testExecutionTimeout param](https://github.com/joomcode/e2ed/commit/6127bff6122252ca8e2a7f3afa78353d8a22db39)
- [fix(utils/Expect): fixes after review](https://github.com/joomcode/e2ed/commit/daa9acf78f2447af3d8c575b53799ab764c2f39c)
- [fix(utils/Expect): handle rejection to prevent endless tests](https://github.com/joomcode/e2ed/commit/70bad345213d99a203d5231b1ab367e53c954890)

## [v0.5.9](https://github.com/joomcode/e2ed/tree/v0.5.9) (2021-11-23)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.5.8...v0.5.9)

- [fix: error with resolving TypeScript from TestCafe; remove hooks circle dependencies](https://github.com/joomcode/e2ed/commit/7afeec06b8cbe3039c6bb8095a7db4a1b2c9e1c3)
- [feat: add assert that all tests have unique names](https://github.com/joomcode/e2ed/commit/124a0ffab8f6546a0bd62d577ed79133dd12ffc2)

## [v0.5.8](https://github.com/joomcode/e2ed/tree/v0.5.8) (2021-11-21)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.5.7...v0.5.8)

- [feat: turn on eslint curly rule for all statements](https://github.com/joomcode/e2ed/commit/cc7cbf741a36b8cab7c87315ebd2128a9ea58b22)
- [feat: add pixelmatch util (for comparing snapshots)](https://github.com/joomcode/e2ed/commit/55eccb04740f9539d58d1f28d03b9d96dbae23f4)

## [v0.5.7](https://github.com/joomcode/e2ed/tree/v0.5.7) (2021-11-21)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.5.6...v0.5.7)

- [feat: use testcafe-without-typecheck with up to date pngjs](https://github.com/joomcode/e2ed/commit/e41f9c2b6891c0b1ea8f75bd803b02a5f63c001b)
- [feat: add pngjs to dependencies; fix fail tests representation](https://github.com/joomcode/e2ed/commit/3c76281510106e61dbd061291cd0449b96cba8cd)

## [v0.5.6](https://github.com/joomcode/e2ed/tree/v0.5.6) (2021-11-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.5.5...v0.5.6)

- [fix: remove buggy runExecutionTimeout and testExecutionTimeout properties](https://github.com/joomcode/e2ed/commit/42f757c30fc2f8c79b65bc92b2390bcd29268946)

## [v0.5.5](https://github.com/joomcode/e2ed/tree/v0.5.5) (2021-11-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.5.4...v0.5.5)

- [feat: take log screenshot only for loaded pages and important actions](https://github.com/joomcode/e2ed/commit/8d0faf27a5812cf25a2e2aa77fff8a36cb8d3f26)

## [v0.5.4](https://github.com/joomcode/e2ed/tree/v0.5.4) (2021-11-20)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.5.3...v0.5.4)

- [feat: add internal pageLoaded flag to context; add default value to useContext](https://github.com/joomcode/e2ed/commit/8f560a843af79da376e7a1bd1cd8e563dfa3ffdf)

## [v0.5.3](https://github.com/joomcode/e2ed/tree/v0.5.3) (2021-11-19)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.5.2...v0.5.3)

- [feat: add description to client functions (for logging)](https://github.com/joomcode/e2ed/commit/29fb8e7acc92f6224a93074622a0a0ade44e450b)

## [v0.5.2](https://github.com/joomcode/e2ed/tree/v0.5.2) (2021-11-19)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.5.1...v0.5.2)

- [feat: update TypeScript and @typescript-eslint/\*](https://github.com/joomcode/e2ed/commit/ac7e6a3a291f70abd07ae45dbcd576ecf55fa88b)

## [v0.5.1](https://github.com/joomcode/e2ed/tree/v0.5.1) (2021-11-19)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.5.0...v0.5.1)

- [feat: save screenshot on each log call; register test run and log call](https://github.com/joomcode/e2ed/commit/ea811b7eb488a4617782d289017d7472529cab14)

## [v0.5.0](https://github.com/joomcode/e2ed/tree/v0.5.0) (2021-11-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.4.11...v0.5.0)

- [feat: use async log function](https://github.com/joomcode/e2ed/commit/905348244c7c8ba79852031822371406620b78db)
- [feat: add .gitignore to e2ed init directory](https://github.com/joomcode/e2ed/commit/ebed89cac837fed42d9498e1bf0cac5ac2c3e246)

## [v0.4.11](https://github.com/joomcode/e2ed/tree/v0.4.11) (2021-11-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.4.10...v0.4.11)

- [fix: getVersion script](https://github.com/joomcode/e2ed/commit/8d2c00478d670a1effbed1e854ab43967eaafc61)

## [v0.4.10](https://github.com/joomcode/e2ed/tree/v0.4.10) (2021-11-13)

[Full Changelog](https://github.com/joomcode/e2ed/compare/v0.4.8...v0.4.10)

- [fix: changelog script](https://github.com/joomcode/e2ed/commit/1be9719ddfda2b0fecd1390e179fefd448d7a081)
- [feat: add autoupdated CHANGELOG.md](https://github.com/joomcode/e2ed/commit/3517de1c2def12cd0b2beebe4e25a27cf060a62b)

## [v0.4.8](https://github.com/joomcode/e2ed/tree/v0.4.8) (2021-11-12)

- Initial
