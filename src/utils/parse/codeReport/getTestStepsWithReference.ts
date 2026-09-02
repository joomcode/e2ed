import {getFullStepDefinition} from './getFullStepDefinition';
import {getStepReference} from './getStepReference';

import type {StepWithReference, TestReport} from '../../../types/internal';

/**
 * Get steps with reference for test.
 * @internal
 */
export const getTestStepsWithReference = (test: TestReport): readonly StepWithReference[] => {
  const steps: StepWithReference[] = [];
  const stepsHash: Record<string, number> = Object.create(null) as {};

  for (const step of test.steps) {
    if (step.definition === undefined || step.definition === '') {
      continue;
    }

    const fullDefinition = getFullStepDefinition(step);

    stepsHash[fullDefinition] =
      stepsHash[fullDefinition] === undefined ? 1 : stepsHash[fullDefinition] + 1;

    const count = stepsHash[fullDefinition];
    const reference = getStepReference(step, test.path);

    steps.push({
      key: getFullStepDefinition(step, count),
      reference,
    });
  }

  return steps;
};
