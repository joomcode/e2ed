import {assertValueIsDefined} from './assertValueIsDefined';
import {getStepOrderError} from './getStepOrderError';

import type {StepWithReference} from '../../../types/internal';

type Options = Readonly<{
  scenarioReference: string;
  scenarioSteps: readonly StepWithReference[];
  testReference: string;
  testSteps: readonly StepWithReference[];
}>;

/**
 * Get step comparison errors (between steps of scenario and steps of test).
 * @internal
 */
export const getStepComparisonErrors = ({
  scenarioReference,
  scenarioSteps,
  testReference,
  testSteps,
}: Options): readonly string[] => {
  const errors: string[] = [];
  const scenarioStepsHash: Record<string, number> = Object.create(null) as {};
  const testStepsHash: Record<string, number> = Object.create(null) as {};

  for (let index = 0; index < testSteps.length; index += 1) {
    const step = testSteps[index];

    assertValueIsDefined(step, `Undefined step in ${JSON.stringify(testSteps)}`);

    testStepsHash[step.key] = index;
  }

  const scenarioBothSteps: StepWithReference[] = [];
  const testBothSteps: StepWithReference[] = [];

  for (let index = 0; index < scenarioSteps.length; index += 1) {
    const step = scenarioSteps[index];

    assertValueIsDefined(step, `Undefined step in ${JSON.stringify(scenarioSteps)}`);

    if (step.key in testStepsHash) {
      scenarioBothSteps.push(step);
    } else {
      errors.push(`Step ${step.key} ${step.reference} is missing from ${testReference}.`);
    }

    scenarioStepsHash[step.key] = index;
  }

  for (const step of testSteps) {
    if (step.key in scenarioStepsHash) {
      testBothSteps.push(step);
    } else {
      errors.push(
        `The ${testReference} has an extra step ${step.key} ${step.reference} that is absent from ${scenarioReference}.`,
      );
    }
  }

  const orderError = getStepOrderError(scenarioBothSteps, testBothSteps);

  if (orderError !== undefined) {
    errors.push(orderError);
  }

  return errors;
};
