// eslint-disable-next-line import/no-internal-modules
import {setReadonlyProperty} from '../../object/setReadonlyProperty';

import {parseTest} from '../parseTest';

import type {StepKind} from 'parse-gherkin';

import type {
  CodeReport,
  SourceFile,
  SourceIterable,
  SourcePath,
  StepTokens,
  TestReport,
} from '../../../types/internal';

type Options = Readonly<{
  codeReport: CodeReport;
  stepTokens: StepTokens;
  testIdentifierKey: string;
  testsIterable: SourceIterable;
}>;

/**
 * Process tests files.
 * @internal
 */
export const processTests = async ({
  codeReport,
  stepTokens,
  testIdentifierKey,
  testsIterable,
}: Options): Promise<void> => {
  const {invalidTests, tests} = codeReport;

  const process = ({path, source}: SourceFile): void => {
    if (path in tests || path in invalidTests) {
      throw new Error(`There is more than one test with the "${path}" path`);
    }

    try {
      const parsed = parseTest<StepKind>(source, stepTokens as Required<typeof stepTokens>);
      const testReport: TestReport = {
        [testIdentifierKey]: undefined,
        ...parsed,
        duplicatesByTestIdentifier: [],
        errors: [],
        featurePath: undefined,
        path: path as SourcePath,
        scenarioPath: undefined,
        testIdentifier: undefined as string | undefined,
      };

      setReadonlyProperty(tests, path as SourcePath, testReport);

      const testId: unknown = parsed.options?.['meta']?.[testIdentifierKey as never];

      if (testId !== undefined) {
        setReadonlyProperty(testReport, 'testIdentifier', String(testId));
        setReadonlyProperty(testReport, testIdentifierKey as 'testIdentifier', String(testId));
      }
    } catch (error) {
      setReadonlyProperty(invalidTests, path as SourcePath, {
        error: error as Error,
        source,
      });
    }
  };

  if (Symbol.asyncIterator in testsIterable) {
    for await (const file of testsIterable) {
      process(file);
    }
  } else {
    for (const file of testsIterable) {
      process(file);
    }
  }
};
