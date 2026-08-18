import type {ScenarioReport} from '../../../types/internal';

/**
 * Get reference to scenario for errors.
 * @internal
 */
export const getScenarioReference = (scenario: ScenarioReport): string =>
  `scenario "${scenario.Scenario}" in ${scenario.featurePath}:${scenario.lineNumber + 1}:${scenario.column + 1}`;
