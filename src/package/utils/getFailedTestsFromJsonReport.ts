import config from '../testcaferc.json';

const jsonReportPathFromRoot = config.reporter.find(({name}) => name === 'json')?.output || '';
const jsonReportPath = `../../../${jsonReportPathFromRoot}`;

type Test = Readonly<{
  name: string;
  errs: unknown[];
}>;

type Fixture = Readonly<{
  name: string;
  path: string;
  tests: Test[];
}>;

/**
 * Fail test params.
 * @internal
 */
export type FailTest = Readonly<{
  fixtureName: string;
  fixturePath: string;
  testName: string;
}>;

type FailTests = Readonly<{
  allTestsCount: number;
  tests: FailTest[];
}>;

/**
 * Get failed tests from json report.
 * @internal
 */
export const getFailedTestsFromJsonReport = (): FailTests => {
  const absoluteJsonReportPath = require.resolve(jsonReportPath);

  delete require.cache[absoluteJsonReportPath];

  // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
  const {fixtures, total} = require(jsonReportPath) as {fixtures: Fixture[]; total: number};
  const failedTests = [];

  for (const {name: fixtureName, path: fixturePath, tests} of fixtures) {
    for (const {name: testName, errs: errors} of tests) {
      if (errors.length !== 0) {
        failedTests.push({testName, fixtureName, fixturePath});
      }
    }
  }

  return {tests: failedTests, allTestsCount: total};
};
