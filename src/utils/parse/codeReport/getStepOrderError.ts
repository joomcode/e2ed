import type {StepWithReference} from '../../../types/internal';

/**
 * Compares the order of two arrays of steps and return an error if they differ.
 * @internal
 */
export const getStepOrderError = (
  scenarioSteps: readonly StepWithReference[],
  testSteps: readonly StepWithReference[],
): string | undefined => {
  const unorderedScenarioSteps: StepWithReference[] = [];
  const unorderedTestSteps: StepWithReference[] = [];

  for (let index = 0; index < scenarioSteps.length; index += 1) {
    const scenarioStep = scenarioSteps[index];
    const testStep = testSteps[index];

    if (scenarioStep !== undefined && testStep !== undefined && scenarioStep.key !== testStep.key) {
      unorderedScenarioSteps.push(scenarioStep);
      unorderedTestSteps.push(testStep);
    }
  }

  if (unorderedScenarioSteps.length === 0) {
    return;
  }

  const scenarioStepsMessage = unorderedScenarioSteps
    .map(({key, reference}) => `${key} ${reference}`)
    .join(',\n');
  const testStepsMessage = unorderedTestSteps
    .map(({key, reference}) => `${key} ${reference}`)
    .join(',\n');

  return [
    'The following steps appear in a different order in the scenario and the test.',
    'In the scenario the order is:',
    `${scenarioStepsMessage}.`,
    'In the test the order is:',
    `${testStepsMessage}.`,
  ].join('\n');
};
