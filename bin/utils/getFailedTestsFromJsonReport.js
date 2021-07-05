import {createRequire} from 'module';

const require = createRequire(import.meta.url);

const {reporter} = require('../../../.testcaferc.json');

const jsonReportPathFromRoot = reporter.find(({name}) => name === 'json').output;
const jsonReportPath = `../../../${jsonReportPathFromRoot}`;

export const getFailedTestsFromJsonReport = () => {
  const absoluteJsonReportPath = require.resolve(jsonReportPath);

  delete require.cache[absoluteJsonReportPath];

  // eslint-disable-next-line import/no-dynamic-require
  const {fixtures, total} = require(jsonReportPath);
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
