import {parseGherkin} from 'parse-gherkin';

// eslint-disable-next-line import/no-internal-modules
import {setReadonlyProperty} from '../../object/setReadonlyProperty';

import {processScenarios} from './processScenarios';

import type {
  CodeReport,
  FeatureReport,
  SourceFile,
  SourceIterable,
  SourcePath,
} from '../../../types/internal';

type Options = Readonly<{
  codeReport: CodeReport;
  featuresIterable: SourceIterable;
  testIdentifierKey: string;
}>;

/**
 * Process features files.
 * @internal
 */
export const processFeatures = async ({
  codeReport,
  featuresIterable,
  testIdentifierKey,
}: Options): Promise<void> => {
  const {invalidFeatures, features} = codeReport;

  const process = ({path, source}: SourceFile): void => {
    if (path in features || path in invalidFeatures) {
      throw new Error(`There is more than one feature with the "${path}" path`);
    }

    try {
      const parsed = parseGherkin(source);
      const scenariosPaths: SourcePath[] = [];
      const {scenarios: _scenarios, ...parsedWithoutScenarios} = parsed;
      const featureReport: FeatureReport = {
        ...parsedWithoutScenarios,
        name: parsedWithoutScenarios.Feature,
        path: path as SourcePath,
        scenariosPaths,
      };

      setReadonlyProperty(features, path as SourcePath, featureReport);

      const maybeScenarios = parsed.scenarios?.filter(
        (maybeScenario) => 'Scenario' in maybeScenario,
      );

      if (maybeScenarios === undefined || maybeScenarios.length === 0) {
        return;
      }

      const paths = processScenarios({
        codeReport,
        featurePath: path as SourcePath,
        scenarios: maybeScenarios,
        testIdentifierKey,
      });

      scenariosPaths.push(...paths);
    } catch (error) {
      setReadonlyProperty(invalidFeatures, path as SourcePath, {
        error: error as Error,
        source,
      });
    }
  };

  if (Symbol.asyncIterator in featuresIterable) {
    for await (const file of featuresIterable) {
      process(file);
    }
  } else {
    for (const file of featuresIterable) {
      process(file);
    }
  }
};
