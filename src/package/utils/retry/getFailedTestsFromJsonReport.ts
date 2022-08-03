import {join} from 'node:path';

import {generalLog} from '../generalLog';
import {getFullConfig} from '../getFullConfig';

import type {FailTests} from './types';

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
 * JSON report shape.
 */
type Report = Readonly<{fixtures: Fixture[]; total: number}>;

/**
 * Get failed tests from json report.
 * @internal
 */
export const getFailedTestsFromJsonReport = (): FailTests | undefined => {
  const {reporter} = getFullConfig();
  const jsonReportPathFromRoot = reporter.find(({name}) => name === 'json')?.output ?? '';
  const jsonReportPath = join('..', '..', '..', '..', jsonReportPathFromRoot);

  const absoluteJsonReportPath = require.resolve(jsonReportPath);

  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete require.cache[absoluteJsonReportPath];

  let report: Report | undefined;

  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
    report = require(jsonReportPath) as Report;
  } catch (error) {
    generalLog(`Caught an error while reading the JSON report: ${String(error)} `);

    return undefined;
  }

  const {fixtures, total} = report;
  const failedTests = [];

  for (const {name: fixtureName, path: fixturePath, tests} of fixtures) {
    for (const {name: testName, errs: errors} of tests) {
      if (errors.length !== 0) {
        failedTests.push({fixtureName, fixturePath, testName});
      }
    }
  }

  return {allTestsCount: total, tests: failedTests};
};
