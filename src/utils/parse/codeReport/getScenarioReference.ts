import type {ScenarioReport} from '../../../types/internal';

/**
 * Get reference to scenario for errors.
 */
export const getScenarioReference = (
  scenario: ScenarioReport,
  testIdentifierKey: string,
): string => {
  const maybeTestIdentifier =
    scenario.testIdentifier === undefined
      ? ''
      : ` (${testIdentifierKey}=${scenario.testIdentifier})`;

  return `scenario "${scenario.name}"${maybeTestIdentifier} in ${scenario.featurePath}:${scenario.lineNumber + 1}:${scenario.column + 1}`;
};
