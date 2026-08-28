import {getScenarioReference} from './getScenarioReference';

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
    const fullDefinition = `${step.kind} ${step.definition}`;

    stepsHash[fullDefinition] =
      stepsHash[fullDefinition] === undefined ? 1 : stepsHash[fullDefinition] + 1;

    const count = stepsHash[fullDefinition];
    const reference = `in ${scenario.featurePath}:${step.lineNumber + 1}:${step.column + 1} (in ${scenarioReference})`;

    steps.push({
      key: count === 1 ? `"${fullDefinition}"` : `"${fullDefinition}" (occurrence ${count})`,
      reference,
    });
  }

  return steps;
};
