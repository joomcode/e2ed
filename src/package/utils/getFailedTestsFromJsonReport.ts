import {config} from '../testcaferc';

import {generalLog} from './generalLog';

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

/**
 * Fail tests with all tests count.
 * @internal
 */
export type FailTests = Readonly<{
  allTestsCount: number;
  tests: FailTest[];
}>;

/**
 * JSON report shape.
 */
type Report = Readonly<{fixtures: Fixture[]; total: number}>;

/**
 * Get failed tests from json report.
 * @internal
 */
export const getFailedTestsFromJsonReport = (): FailTests | undefined => {
  const absoluteJsonReportPath = require.resolve(jsonReportPath);

  delete require.cache[absoluteJsonReportPath];

  let report: Report | undefined;

  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
    report = require(jsonReportPath) as Report;
  } catch (error: unknown) {
    generalLog(`Caught an error while reading the JSON report: ${String(error)} `);

    return undefined;
  }

  const {fixtures, total} = report;
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
