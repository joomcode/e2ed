// eslint-disable-next-line import/no-internal-modules
import {setReadonlyProperty} from '../../object/setReadonlyProperty';

import {assertValueIsDefined} from './assertValueIsDefined';
import {fillTestErrors} from './fillTestErrors';

import type {CodeReport} from '../../../types/internal';

/**
 * Fills links from tests to scenarios and from scenarios to tests.
 * @internal
 */
export const fillLinks = (codeReport: CodeReport): void => {
  const {scenarios, scenariosByTestIdentifier, tests, testsByTestIdentifier} = codeReport;

  for (const {duplicatesByTestIdentifier, path, testIdentifier} of Object.values(scenarios)) {
    if (testIdentifier !== undefined && duplicatesByTestIdentifier.length === 0) {
      setReadonlyProperty(scenariosByTestIdentifier, testIdentifier, path);
    }
  }

  for (const test of Object.values(tests)) {
    const {duplicatesByTestIdentifier, path: testPath, testIdentifier} = test;

    if (testIdentifier !== undefined && duplicatesByTestIdentifier.length === 0) {
      setReadonlyProperty(testsByTestIdentifier, testIdentifier, testPath);

      const scenarioPath = scenariosByTestIdentifier[testIdentifier];

      if (scenarioPath === undefined) {
        continue;
      }

      const scenario = scenarios[scenarioPath];

      assertValueIsDefined(scenario, `Cannot find scenario with the "${scenarioPath}" path`);

      setReadonlyProperty(scenario, 'testPath', testPath);
      setReadonlyProperty(test, 'featurePath', scenario.featurePath);
      setReadonlyProperty(test, 'scenarioPath', scenarioPath);

      fillTestErrors(scenario, test);
    }
  }
};
