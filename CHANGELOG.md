# Changelog

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
