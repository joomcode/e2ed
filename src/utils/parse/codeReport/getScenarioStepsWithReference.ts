import {getFullStepDefinition} from './getFullStepDefinition';
import {getScenarioReference} from './getScenarioReference';
import {getStepReference} from './getStepReference';

import type {ScenarioReport, StepWithReference} from '../../../types/internal';

/**
 * Get steps with reference for scenario.
 * @internal
 */
export const getScenarioStepsWithReference = (
  scenario: ScenarioReport,
  testIdentifierKey: string,
): readonly StepWithReference[] => {
  const scenarioReference = getScenarioReference(scenario, testIdentifierKey);
  const steps: StepWithReference[] = [];
  const stepsHash: Record<string, number> = Object.create(null) as {};

  for (const step of scenario.steps) {
    const fullDefinition = getFullStepDefinition(step);

    stepsHash[fullDefinition] =
      stepsHash[fullDefinition] === undefined ? 1 : stepsHash[fullDefinition] + 1;

    const count = stepsHash[fullDefinition];
    const reference = getStepReference(
      {column: step.column + 1, line: step.lineNumber + 1},
      scenario.featurePath,
    );

    steps.push({
      key: getFullStepDefinition(step, count),
      reference: `${reference} (in ${scenarioReference})`,
    });
  }

  return steps;
};
