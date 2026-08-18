// eslint-disable-next-line import/no-internal-modules
import {setReadonlyProperty} from '../../object/setReadonlyProperty';

import {assertValueIsDefined} from './assertValueIsDefined';

import type {Scenario} from 'parse-gherkin';

import type {CodeReport, ScenarioReport, SourcePath} from '../../../types/internal';

type Options = Readonly<{
  codeReport: CodeReport;
  featurePath: SourcePath;
  scenarios: readonly Scenario[];
  testIdentifierKey: string;
}>;

/**
 * Process scenarios from features files.
 * @internal
 */
export const processScenarios = ({
  codeReport,
  featurePath,
  scenarios,
  testIdentifierKey,
}: Options): readonly SourcePath[] => {
  const {scenarios: reportScenarios} = codeReport;
  const paths: SourcePath[] = [];
  const testIdTagStart = `@${testIdentifierKey}-`;

  for (let index = 0; index < scenarios.length; index += 1) {
    const scenario = scenarios[index];

    assertValueIsDefined(
      scenario,
      `Scenario is undefined in feature with the "${featurePath}" path`,
    );

    const path = `${featurePath}/[${index}]` as SourcePath;

    paths.push(path);

    const errors: string[] = [];
    const scenarioReport: ScenarioReport = {
      [testIdentifierKey]: undefined,
      ...scenario,
      duplicatesByTestIdentifier: [],
      errors,
      featurePath,
      name: scenario.Scenario,
      path,
      testIdentifier: undefined as string | undefined,
      testPath: undefined,
    };

    setReadonlyProperty(reportScenarios, path, scenarioReport);

    let testId: string | undefined;

    for (const tag of scenario.tags) {
      if (!tag.startsWith(testIdTagStart)) {
        continue;
      }

      if (testId === undefined) {
        testId = tag.slice(testIdTagStart.length);
      } else {
        errors.push(`Scenario has a duplicate test identifier tag: "${tag}".`);
      }
    }

    if (testId !== undefined) {
      setReadonlyProperty(scenarioReport, 'testIdentifier', testId);
      setReadonlyProperty(scenarioReport, testIdentifierKey as 'testIdentifier', testId);
    }
  }

  return paths;
};
