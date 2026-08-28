import {getScenarioReference} from './getScenarioReference';
import {getScenarioStepsWithReference} from './getScenarioStepsWithReference';
import {getStepComparisonErrors} from './getStepComparisonErrors';
import {getTestReference} from './getTestReference';
import {getTestStepsWithReference} from './getTestStepsWithReference';

import type {ScenarioReport, TestReport} from '../../../types/internal';

/**
 * Fills test errors (compares tests steps with scenario steps).
 * @internal
 */
export const fillTestErrors = (
  scenario: ScenarioReport,
  test: TestReport,
  testIdentifierKey: string,
): void => {
  let scenarioHasError = false;
  const errors = test.errors as string[];
  const scenarioReference = getScenarioReference(scenario, testIdentifierKey);
  const testReference = getTestReference(test, testIdentifierKey);

  if (scenario.steps.length === 0) {
    scenarioHasError = true;
    errors.push(`The ${scenarioReference} has no steps.`);
  }

  for (const step of scenario.steps) {
    if (step.definition === '') {
      scenarioHasError = true;
      errors.push(
        `Step in ${scenario.featurePath}:${step.lineNumber + 1}:${step.column + 1} (in ${scenarioReference}) has no definition.`,
      );
    }
  }

  for (const step of test.steps) {
    if (step.definition === undefined || step.definition === '') {
      errors.push(
        `Step in ${test.path}:${step.line}:${step.column} (in ${testReference}) has no definition.`,
      );
    }
  }

  if (scenarioHasError) {
    return;
  }

  const scenarioSteps = getScenarioStepsWithReference(scenario, testIdentifierKey);
  const testSteps = getTestStepsWithReference(test);

  const comparisonErrors = getStepComparisonErrors({
    scenarioReference,
    scenarioSteps,
    testReference,
    testSteps,
  });

  errors.push(...comparisonErrors);
};
