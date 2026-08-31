// eslint-disable-next-line import/no-internal-modules
import {getTestIdentifierKey} from '../../../configurator/getTestIdentifierKey';

// eslint-disable-next-line import/no-internal-modules
import {readFilesByGlobs} from '../../fs/readFilesByGlobs';
// eslint-disable-next-line import/no-internal-modules
import {setReadonlyProperty} from '../../object/setReadonlyProperty';
// eslint-disable-next-line import/no-internal-modules
import {getProjectSettings} from '../../userland/getProjectSettings';

import {fillReport} from './fillReport';
import {processFeatures} from './processFeatures';
import {processTests} from './processTests';

import type {CodeReport, SourceIterable, StepTokens} from '../../../types/internal';

type Options = Readonly<{
  features?: SourceIterable;
  steps?: StepTokens;
  testIdentifierKey?: string;
  tests?: SourceIterable;
}>;

const defaultSteps: Required<StepTokens> = {
  '*': '^[ \t]*await Star\\(',
  And: '^[ \t]*await And\\(',
  But: '^[ \t]*await But\\(',
  Given: '^[ \t]*await Given\\(',
  Then: '^[ \t]*await Then\\(',
  When: '^[ \t]*await When\\(',
};

/**
 * Get code report that analyzes test and specification code, as well as the relationships between them.
 */
export const getCodeReport = async <
  TestIdentifierKey extends string = string,
  TestIdentifierValue extends string = string,
>({
  features,
  steps = defaultSteps,
  testIdentifierKey = getTestIdentifierKey(getProjectSettings()),
  tests,
}: Options = {}): Promise<CodeReport<TestIdentifierKey, TestIdentifierValue>> => {
  const startTimeInMs = Date.now();

  const featuresIterable: SourceIterable =
    features ?? readFilesByGlobs(getProjectSettings().allFeatureFileGlobs);
  const testsIterable: SourceIterable =
    tests ?? readFilesByGlobs(getProjectSettings().allTestFileGlobs);

  const codeReport: CodeReport<TestIdentifierKey, TestIdentifierValue> = {
    durationInMs: 0,
    features: Object.create(null) as {},
    invalidFeatures: Object.create(null) as {},
    invalidTests: Object.create(null) as {},
    scenarios: Object.create(null) as {},
    scenariosByTestIdentifier: Object.create(null) as CodeReport['scenariosByTestIdentifier'],
    testIdentifierKey,
    tests: Object.create(null) as {},
    testsByTestIdentifier: Object.create(null) as CodeReport['testsByTestIdentifier'],
  };

  await Promise.all([
    processFeatures({codeReport, featuresIterable, testIdentifierKey}),
    processTests({codeReport, stepTokens: steps, testIdentifierKey, testsIterable}),
  ]);

  fillReport(codeReport);

  setReadonlyProperty(codeReport, 'durationInMs', Date.now() - startTimeInMs);

  return codeReport;
};
