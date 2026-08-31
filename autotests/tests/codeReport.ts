/* eslint-disable @typescript-eslint/no-magic-numbers, max-lines */

import {test} from 'autotests';
import {expect} from 'e2ed';
import {assertValueIsDefined, readFilesByGlobs} from 'e2ed/utils';
import {getCodeReport} from 'e2ed/utils/parse';

import type {
  CodeReport,
  FeatureReport,
  ParseError,
  ScenarioReport,
  SourceFile,
  SourcePath,
  TestReport,
} from 'e2ed/types';

const getFeature = (codeReport: CodeReport, path: string): FeatureReport => {
  const feature = Object.values(codeReport.features).find(
    (featureReport) => featureReport.path === path,
  );

  assertValueIsDefined(feature, 'feature is defined', {path});

  return feature;
};

const getParseError = (parseErrors: CodeReport['invalidFeatures'], path: string): ParseError => {
  const parseError = Object.entries(parseErrors).find(([somePath]) => somePath === path)?.[1];

  assertValueIsDefined(parseError, 'parseError is defined', {path});

  return parseError;
};

const getScenario = <Key extends string>(
  codeReport: CodeReport<Key>,
  path: string,
): ScenarioReport<Key> => {
  const scenario = Object.values(codeReport.scenarios).find(
    (scenarioReport) => scenarioReport.path === path,
  );

  assertValueIsDefined(scenario, 'scenario is defined', {path});

  return scenario;
};

const getTestReport = <Key extends string>(
  codeReport: CodeReport<Key>,
  path: string,
): TestReport<Key> => {
  const testReport = Object.values(codeReport.tests).find(
    (someTestReport) => someTestReport.path === path,
  );

  assertValueIsDefined(testReport, 'testReport is defined', {path});

  return testReport;
};

async function* toAsyncIterable(files: readonly SourceFile[]): AsyncGenerator<SourceFile> {
  for (const file of files) {
    yield await Promise.resolve(file);
  }
}

// eslint-disable-next-line complexity, max-lines-per-function, max-statements
test('getCodeReport(...) function works correctly', {meta: {testId: '36'}}, async () => {
  const projectFeaturePath = 'autotests/specs/codeReport.feature' as SourcePath;
  const selfTestPath = 'autotests/tests/codeReport.ts' as SourcePath;

  const projectReport = await getCodeReport<'testId'>();

  await expect(projectReport.durationInMs, 'Code report has non-negative duration').gte(0);

  await expect(
    projectReport.testIdentifierKey,
    'Report contains test identifier key from project settings',
  ).eql('testId');

  await expect(Object.keys(projectReport.invalidFeatures), 'Project has no invalid features').eql(
    [],
  );

  await expect(Object.keys(projectReport.invalidTests), 'Project has no invalid tests').eql([]);

  const projectFeature = getFeature(projectReport, projectFeaturePath);

  await expect(projectFeature.name, 'Feature name is parsed correctly').eql('Code report');

  await expect(
    projectFeature.scenariosPaths.map(String),
    'Feature report contains paths of all scenarios',
  ).eql([0, 1, 2, 3, 4, 5].map((index) => `${projectFeaturePath}/[${index}]`));

  await expect(
    !('scenarios' in projectFeature),
    'Feature report has no scenarios field at runtime',
  ).ok();

  const scenarioWithoutId = getScenario(projectReport, `${projectFeaturePath}/[0]`);

  await expect(scenarioWithoutId.name, 'Scenario name is parsed correctly').eql(
    'Scenario without test identifier',
  );

  await expect(scenarioWithoutId.testIdentifier, 'Scenario without tag has no test identifier').eql(
    undefined,
  );

  await expect(scenarioWithoutId.testId, 'Scenario without tag has no testId field').eql(undefined);

  await expect(scenarioWithoutId.testPath, 'Scenario without tag is not linked to test').eql(
    undefined,
  );

  await expect(scenarioWithoutId.errors, 'Scenario without tag has no errors').eql([]);

  await expect(
    scenarioWithoutId.steps.map(({kind, definition}) => `${kind}:${definition}`),
    'Scenario steps are parsed with kinds and definitions',
  ).eql(['Given:base state', 'When:action', 'Then:result']);

  const scenarioWithoutTest = getScenario(projectReport, `${projectFeaturePath}/[1]`);

  await expect(
    scenarioWithoutTest.testIdentifier,
    'Scenario test identifier is read from the tag',
  ).eql('901');

  await expect(
    scenarioWithoutTest.testId,
    'Scenario test identifier is duplicated in testId field',
  ).eql('901');

  await expect(scenarioWithoutTest.featurePath, 'Scenario has reference to feature path').eql(
    projectFeaturePath,
  );

  await expect(
    scenarioWithoutTest.steps.map(({kind}) => kind),
    'All scenario step kinds are parsed',
  ).eql(['Given', 'When', 'Then', 'And', 'But', '*']);

  await expect(scenarioWithoutTest.testPath, 'Scenario without matching test is not linked').eql(
    undefined,
  );

  await expect(
    projectReport.scenariosByTestIdentifier['901'],
    'Scenario with test identifier is present in scenarios map',
  ).eql(`${projectFeaturePath}/[1]` as SourcePath);

  const scenarioWithTwoTags = getScenario(projectReport, `${projectFeaturePath}/[2]`);

  await expect(
    scenarioWithTwoTags.testIdentifier,
    'First test identifier tag wins for scenario with two tags',
  ).eql('902');

  await expect(
    scenarioWithTwoTags.errors,
    'Second test identifier tag produces scenario error',
  ).eql(['Scenario has a duplicate test identifier tag: "@testId-903".']);

  const scenarioWithoutSteps = getScenario(projectReport, `${projectFeaturePath}/[3]`);

  await expect(scenarioWithoutSteps.steps, 'Scenario without steps has empty steps').eql([]);

  await expect(scenarioWithoutSteps.errors, 'Unlinked scenario without steps has no errors').eql(
    [],
  );

  const scenarioWithEmptyStep = getScenario(projectReport, `${projectFeaturePath}/[4]`);

  await expect(
    scenarioWithEmptyStep.steps.map(({kind, definition}) => `${kind}:${definition}`),
    'Empty step definition is parsed as empty string',
  ).eql(['Given:']);

  await expect(scenarioWithEmptyStep.errors, 'Unlinked scenario with empty step has no errors').eql(
    [],
  );

  const linkedScenario = getScenario(projectReport, `${projectFeaturePath}/[5]`);
  const selfTest = getTestReport(projectReport, selfTestPath);

  await expect(linkedScenario.name, 'Linked scenario has correct name').eql(
    'Scenario without steps linked to test',
  );

  await expect(linkedScenario.testIdentifier, 'Linked scenario has test identifier').eql('36');

  await expect(linkedScenario.testPath, 'Linked scenario points to this test').eql(selfTestPath);

  await expect(selfTest.scenarioPath, 'This test points to linked scenario').eql(
    `${projectFeaturePath}/[5]` as SourcePath,
  );

  await expect(selfTest.name, 'Test name is parsed correctly').eql(
    'getCodeReport(...) function works correctly',
  );

  await expect(selfTest.testIdentifier, 'Test identifier is read from test options').eql('36');

  await expect(selfTest.testId, 'Test identifier is duplicated in testId field').eql('36');

  await expect(selfTest.featurePath, 'Linked test points to feature file').eql(projectFeaturePath);

  await expect(selfTest.errors, 'Linked scenario without steps produces error on test').eql([
    `The scenario "Scenario without steps linked to test" (testId=36) in ${projectFeaturePath}:29:3 has no steps.`,
  ]);

  await expect(projectReport.testsByTestIdentifier['36'], 'This test is present in tests map').eql(
    selfTestPath,
  );

  await expect(
    projectReport.testsByTestIdentifier['25'],
    'Other tests are present in tests map',
  ).eql('autotests/tests/parseTest.ts' as SourcePath);

  await expect(
    getTestReport(projectReport, 'autotests/tests/parseTest.ts').scenarioPath,
    'Test without matching scenario is not linked',
  ).eql(undefined);

  await expect(
    getTestReport(projectReport, 'autotests/tests/parseTest.ts').featurePath,
    'Test without matching scenario has no feature path',
  ).eql(undefined);

  const allProjectTests = Object.values(projectReport.tests);

  await expect(allProjectTests.length, 'Project has tests').gt(0);

  await expect(
    allProjectTests
      .filter(({testIdentifier}) => testIdentifier === undefined)
      .map(({path}) => path),
    'All project tests have test identifier',
  ).eql([]);

  await expect(
    allProjectTests
      .filter(({duplicatesByTestIdentifier}) => duplicatesByTestIdentifier.length > 0)
      .map(({path}) => path),
    'Project has no tests with duplicate test identifiers',
  ).eql([]);

  await expect(
    Object.keys(projectReport.testsByTestIdentifier).length,
    'All project test identifiers are unique',
  ).eql(allProjectTests.length);

  await expect(
    allProjectTests.filter(({errors}) => errors.length > 0).map(({path}) => String(path)),
    'Only this test has errors from linked scenario',
  ).eql([selfTestPath]);

  const comparisonReport = await getCodeReport({
    features: [
      {
        path: 'f.feature',
        source: [
          'Feature: F',
          '',
          '  @testId-101',
          '  Scenario: Bad scenario',
          '    Given a',
          '    When b',
          '    Then c',
          '',
        ].join('\n'),
      },
    ],
    tests: [
      {
        path: 't.ts',
        source: [
          "test('Bad', {meta: {testId: '101'}}, async () => {",
          "  await When('b');",
          "  await Given('a');",
          "  await Then('d');",
          '});',
        ].join('\n'),
      },
    ],
  });

  const badScenario = getScenario(comparisonReport, 'f.feature/[0]');
  const badTest = getTestReport(comparisonReport, 't.ts');

  await expect(getFeature(comparisonReport, 'f.feature').name, 'Feature name is parsed').eql('F');

  await expect(badScenario.name, 'Scenario name is parsed').eql('Bad scenario');

  await expect(badScenario.testPath, 'Scenario is linked to test by test identifier').eql(
    't.ts' as SourcePath,
  );

  await expect(badTest.scenarioPath, 'Test is linked to scenario by test identifier').eql(
    'f.feature/[0]' as SourcePath,
  );

  await expect(badTest.featurePath, 'Linked test points to feature file of its scenario').eql(
    'f.feature' as SourcePath,
  );

  await expect(
    comparisonReport.scenariosByTestIdentifier['101'],
    'Scenario is present in scenarios map',
  ).eql('f.feature/[0]' as SourcePath);

  await expect(comparisonReport.testsByTestIdentifier['101'], 'Test is present in tests map').eql(
    't.ts' as SourcePath,
  );

  await expect(badScenario.errors, 'Scenario itself has no comparison errors').eql([]);

  await expect(badTest.errors, 'Missing, extra and reordered steps produce exact errors').eql([
    'Step "Then c" in f.feature:7:5 (in scenario "Bad scenario" (testId=101) in f.feature:4:3) is missing from test "Bad" (testId=101) in t.ts:1:1.',
    'The test "Bad" (testId=101) in t.ts:1:1 has an extra step "Then d" in t.ts:4:3 that is absent from scenario "Bad scenario" (testId=101) in f.feature:4:3.',
    [
      'The following steps appear in a different order in the scenario and the test.',
      'In the scenario the order is:',
      '"Given a" in f.feature:5:5 (in scenario "Bad scenario" (testId=101) in f.feature:4:3),',
      '"When b" in f.feature:6:5 (in scenario "Bad scenario" (testId=101) in f.feature:4:3).',
      'In the test the order is:',
      '"When b" in t.ts:2:3,',
      '"Given a" in t.ts:3:3.',
    ].join('\n'),
  ]);

  const orderReport = await getCodeReport({
    features: [
      {
        path: 'order.feature',
        source: [
          'Feature: F',
          '',
          '  @testId-106',
          '  Scenario: Order scenario',
          '    Given A',
          '    When B',
          '    Then C',
          '    And D',
          '',
        ].join('\n'),
      },
    ],
    tests: [
      {
        path: 'order.ts',
        source: [
          "test('Order', {meta: {testId: '106'}}, async () => {",
          "  await Then('C');",
          "  await When('B');",
          "  await And('D');",
          "  await Given('A');",
          '});',
        ].join('\n'),
      },
    ],
  });

  const orderTest = getTestReport(orderReport, 'order.ts');

  await expect(orderTest.errors, 'Steps at matching positions are excluded from order error').eql([
    [
      'The following steps appear in a different order in the scenario and the test.',
      'In the scenario the order is:',
      '"Given A" in order.feature:5:5 (in scenario "Order scenario" (testId=106) in order.feature:4:3),',
      '"Then C" in order.feature:7:5 (in scenario "Order scenario" (testId=106) in order.feature:4:3),',
      '"And D" in order.feature:8:5 (in scenario "Order scenario" (testId=106) in order.feature:4:3).',
      'In the test the order is:',
      '"Then C" in order.ts:2:3,',
      '"And D" in order.ts:4:3,',
      '"Given A" in order.ts:5:3.',
    ].join('\n'),
  ]);

  await expect(
    orderTest.errors[0] ?? '',
    'Step at the same position in scenario and test is not mentioned in order error',
  ).notContains('When B');

  const fullFeatureFiles: readonly SourceFile[] = [
    {
      path: 'full.feature',
      source: [
        'Feature: Full',
        '',
        '  @testId-102',
        '  Scenario: Full scenario',
        '    Given a',
        '    When b',
        '    Then c',
        '    And d',
        '    But e',
        '    * f',
        '    Then c',
        '',
      ].join('\n'),
    },
  ];
  const fullTestFiles: readonly SourceFile[] = [
    {
      path: 'full.ts',
      source: [
        "test('Full', {meta: {testId: '102'}}, async () => {",
        "  await Given('a');",
        "  await When('b');",
        "  await Then('c');",
        "  await And('d');",
        "  await But('e');",
        "  await Star('f');",
        "  await Then('c');",
        '});',
      ].join('\n'),
    },
  ];

  const fullReport = await getCodeReport({features: fullFeatureFiles, tests: fullTestFiles});

  const fullTest = getTestReport(fullReport, 'full.ts');

  await expect(fullTest.errors, 'Fully matching test has no errors').eql([]);

  await expect(
    fullTest.steps.map(({kind, definition}) => `${kind}:${definition}`),
    'All test step kinds are parsed, including Star and duplicated steps',
  ).eql(['Given:a', 'When:b', 'Then:c', 'And:d', 'But:e', '*:f', 'Then:c']);

  await expect(
    getScenario(fullReport, 'full.feature/[0]').testPath,
    'Fully matching scenario is linked to test',
  ).eql('full.ts' as SourcePath);

  const asyncReport = await getCodeReport({
    features: toAsyncIterable(fullFeatureFiles),
    tests: toAsyncIterable(fullTestFiles),
  });

  await expect(
    getTestReport(asyncReport, 'full.ts').errors,
    'Async iterables of features and tests are supported',
  ).eql([]);

  await expect(
    getTestReport(asyncReport, 'full.ts').scenarioPath,
    'Links are filled for async iterables',
  ).eql('full.feature/[0]' as SourcePath);

  const countReport = await getCodeReport({
    features: [
      {
        path: 'count.feature',
        source: ['Feature: F', '', '  @testId-103', '  Scenario: S', '    Then c', ''].join('\n'),
      },
    ],
    tests: [
      {
        path: 'count.ts',
        source: [
          "test('T', {meta: {testId: '103'}}, async () => {",
          "  await Then('c');",
          "  await Then('c');",
          '});',
        ].join('\n'),
      },
    ],
  });

  const countTest = getTestReport(countReport, 'count.ts');

  await expect(countTest.errors.length, 'Duplicated test step produces exactly one error').eql(1);

  await expect(
    countTest.errors[0] ?? '',
    'Error on duplicated step mentions the duplicate count',
  ).contains('"Then c" (occurrence 2)');

  await expect(countTest.errors[0] ?? '', 'Duplicated test step is reported as extra').contains(
    'has an extra step',
  );

  const tripleReport = await getCodeReport({
    features: [
      {
        path: 'triple.feature',
        source: [
          'Feature: F',
          '',
          '  @testId-107',
          '  Scenario: S',
          '    Then c',
          '    Then c',
          '',
        ].join('\n'),
      },
    ],
    tests: [
      {
        path: 'triple.ts',
        source: [
          "test('T', {meta: {testId: '107'}}, async () => {",
          "  await Then('c');",
          "  await Then('c');",
          "  await Then('c');",
          '});',
        ].join('\n'),
      },
    ],
  });

  const tripleTest = getTestReport(tripleReport, 'triple.ts');

  await expect(
    tripleTest.errors,
    'Third duplicate of the step is reported as extra with (occurrence 3) count',
  ).eql([
    'The test "T" (testId=107) in triple.ts:1:1 has an extra step "Then c" (occurrence 3) in triple.ts:4:3 that is absent from scenario "S" (testId=107) in triple.feature:4:3.',
  ]);

  const emptyStepReport = await getCodeReport({
    features: [
      {
        path: 'empty.feature',
        source: [
          'Feature: F',
          '',
          '  @testId-104',
          '  Scenario: S',
          '    Given a',
          '    Then b',
          '',
        ].join('\n'),
      },
    ],
    tests: [
      {
        path: 'empty.ts',
        source: [
          "test('T', {meta: {testId: '104'}}, async () => {",
          "  await Given('a');",
          "  await Then('');",
          '  await When(callback);',
          '});',
        ].join('\n'),
      },
    ],
  });

  const emptyStepTest = getTestReport(emptyStepReport, 'empty.ts');

  await expect(
    emptyStepTest.steps.map(({kind, definition}) => `${kind}:${String(definition)}`),
    'Empty and non-string test step definitions are parsed',
  ).eql(['Given:a', 'Then:', 'When:undefined']);

  await expect(
    emptyStepTest.errors,
    'Test steps without definition produce own errors and are excluded from comparison',
  ).eql([
    'Step in empty.ts:3:3 (in test "T" (testId=104) in empty.ts:1:1) has no definition.',
    'Step in empty.ts:4:3 (in test "T" (testId=104) in empty.ts:1:1) has no definition.',
    'Step "Then b" in empty.feature:6:5 (in scenario "S" (testId=104) in empty.feature:4:3) is missing from test "T" (testId=104) in empty.ts:1:1.',
  ]);

  await expect(
    emptyStepTest.errors.some((error) => error.includes('extra step')),
    'Test steps without definition are not reported as extra steps',
  ).notOk();

  const duplicateTestsReport = await getCodeReport({
    features: [
      {
        path: 'dup42.feature',
        source: ['Feature: F', '', '  @testId-42', '  Scenario: S', '    Given g', ''].join('\n'),
      },
    ],
    tests: [
      {
        path: 'dupA.ts',
        source: [
          "test('A', {meta: {testId: '42'}}, async () => {",
          "  await Given('g');",
          '});',
        ].join('\n'),
      },
      {path: 'dupB.ts', source: "test('B', {meta: {testId: '42'}}, async () => {});"},
    ],
  });

  const duplicateTestA = getTestReport(duplicateTestsReport, 'dupA.ts');
  const duplicateTestB = getTestReport(duplicateTestsReport, 'dupB.ts');

  await expect(
    duplicateTestA.duplicatesByTestIdentifier.map(String),
    'First duplicate test points to the second one',
  ).eql(['dupB.ts']);

  await expect(
    duplicateTestB.duplicatesByTestIdentifier.map(String),
    'Second duplicate test points to the first one',
  ).eql(['dupA.ts']);

  await expect(
    duplicateTestsReport.testsByTestIdentifier['42'],
    'Duplicate tests are excluded from tests map',
  ).eql(undefined);

  await expect(
    getScenario(duplicateTestsReport, 'dup42.feature/[0]').testPath,
    'Scenario is not linked to duplicate tests',
  ).eql(undefined);

  await expect(
    duplicateTestsReport.scenariosByTestIdentifier['42'],
    'Scenario itself is present in scenarios map',
  ).eql('dup42.feature/[0]' as SourcePath);

  await expect(duplicateTestA.scenarioPath, 'Duplicate test is not linked').eql(undefined);

  await expect(duplicateTestA.featurePath, 'Duplicate test has no feature path').eql(undefined);

  await expect(duplicateTestA.errors, 'Duplicate tests are not compared with scenario').eql([]);

  await expect(duplicateTestB.errors, 'Second duplicate test also has no errors').eql([]);

  const duplicateScenariosReport = await getCodeReport({
    features: [
      {
        path: 'dup43.feature',
        source: [
          'Feature: F',
          '',
          '  @testId-43',
          '  Scenario: First',
          '    Given g',
          '',
          '  @testId-43',
          '  Scenario: Second',
          '    Given g',
          '',
        ].join('\n'),
      },
    ],
    tests: [
      {
        path: 'dup43.ts',
        source: [
          "test('T', {meta: {testId: '43'}}, async () => {",
          "  await Given('g');",
          '});',
        ].join('\n'),
      },
    ],
  });

  await expect(
    getFeature(duplicateScenariosReport, 'dup43.feature').scenariosPaths.map(String),
    'Feature contains paths of both duplicate scenarios',
  ).eql(['dup43.feature/[0]', 'dup43.feature/[1]']);

  await expect(
    getScenario(duplicateScenariosReport, 'dup43.feature/[0]').duplicatesByTestIdentifier.map(
      String,
    ),
    'First duplicate scenario points to the second one',
  ).eql(['dup43.feature/[1]']);

  await expect(
    getScenario(duplicateScenariosReport, 'dup43.feature/[1]').duplicatesByTestIdentifier.map(
      String,
    ),
    'Second duplicate scenario points to the first one',
  ).eql(['dup43.feature/[0]']);

  await expect(
    duplicateScenariosReport.scenariosByTestIdentifier['43'],
    'Duplicate scenarios are excluded from scenarios map',
  ).eql(undefined);

  const testWithDuplicateScenarios = getTestReport(duplicateScenariosReport, 'dup43.ts');

  await expect(
    testWithDuplicateScenarios.scenarioPath,
    'Test is not linked to duplicate scenarios',
  ).eql(undefined);

  await expect(
    testWithDuplicateScenarios.errors,
    'Test is not compared with duplicate scenarios',
  ).eql([]);

  await expect(
    duplicateScenariosReport.testsByTestIdentifier['43'],
    'Test itself is present in tests map',
  ).eql('dup43.ts' as SourcePath);

  const invalidFeatureSource = 'Not a gherkin file at all';
  const invalidTestSource = ['const someConstant = 1;', ''].join('\n');

  const invalidReport = await getCodeReport({
    features: [
      {path: 'bad.feature', source: invalidFeatureSource},
      {
        path: 'good.feature',
        source: ['Feature: Good', '', '  Scenario: S', '    Given g', ''].join('\n'),
      },
    ],
    tests: [
      {path: 'bad.ts', source: invalidTestSource},
      {path: 'good.ts', source: "test('Good', async () => {});"},
    ],
  });

  const featureParseError = getParseError(invalidReport.invalidFeatures, 'bad.feature');
  const testParseError = getParseError(invalidReport.invalidTests, 'bad.ts');

  await expect(featureParseError.error instanceof Error, 'Invalid feature error is Error').ok();

  await expect(
    featureParseError.error.message,
    'Invalid feature error message mentions the problem',
  ).contains('Feature');

  await expect(featureParseError.source, 'Source is preserved for invalid feature').eql(
    invalidFeatureSource,
  );

  await expect(
    testParseError.error.message,
    'Invalid test error message mentions the problem',
  ).contains('contains no tests');

  await expect(testParseError.source, 'Source is preserved for invalid test').eql(
    invalidTestSource,
  );

  await expect(
    Object.keys(invalidReport.features),
    'Valid feature is parsed alongside invalid one',
  ).eql(['good.feature']);

  const goodTest = getTestReport(invalidReport, 'good.ts');

  await expect(goodTest.options, 'Test without options has undefined options').eql(undefined);

  await expect(goodTest.testIdentifier, 'Test without options has no test identifier').eql(
    undefined,
  );

  await expect(goodTest.errors, 'Test without options has no errors').eql([]);

  const caseReport = await getCodeReport<'caseId'>({
    features: [
      {
        path: 'case.feature',
        source: [
          'Feature: F',
          '',
          '  @testId-7 @caseId-9',
          '  Scenario: S',
          '    Given g',
          '',
        ].join('\n'),
      },
    ],
    testIdentifierKey: 'caseId',
    tests: [
      {
        path: 'case.ts',
        source: [
          "test('T', {meta: {caseId: '9', testId: '7'}}, async () => {",
          "  await Given('g');",
          '});',
        ].join('\n'),
      },
    ],
  });

  const caseScenario = getScenario(caseReport, 'case.feature/[0]');
  const caseTest = getTestReport(caseReport, 'case.ts');

  await expect(
    caseReport.testIdentifierKey,
    'Custom key: report contains test identifier key from options',
  ).eql('caseId');

  await expect(
    caseTest.testIdentifier,
    'Custom key: test identifier is read from caseId meta property',
  ).eql('9');

  await expect(caseTest.caseId, 'Custom key: identifier is duplicated in caseId field').eql('9');

  await expect(caseScenario.testIdentifier, 'Custom key: @caseId-* tag is used').eql('9');

  await expect(caseScenario.testPath, 'Custom key: scenario is linked to test').eql(
    'case.ts' as SourcePath,
  );

  await expect(caseTest.errors, 'Custom key: matching steps produce no errors').eql([]);

  await expect(
    caseReport.testsByTestIdentifier['7'],
    'Custom key: testId meta property is ignored',
  ).eql(undefined);

  await expect(
    caseReport.testsByTestIdentifier['9'],
    'Custom key: test is present in tests map by caseId',
  ).eql('case.ts' as SourcePath);

  const customStepsReport = await getCodeReport({
    features: [
      {
        path: 'steps.feature',
        source: [
          'Feature: F',
          '',
          '  @testId-105',
          '  Scenario: S',
          '    Given a',
          '    When b',
          '    Then c',
          '',
        ].join('\n'),
      },
    ],
    steps: {Given: '^[ \t]*await Given\\(', When: '^[ \t]*await When\\('},
    tests: [
      {
        path: 'steps.ts',
        source: [
          "test('T', {meta: {testId: '105'}}, async () => {",
          "  await Given('a');",
          "  await When('b');",
          "  await Then('c');",
          '});',
        ].join('\n'),
      },
    ],
  });

  const customStepsTest = getTestReport(customStepsReport, 'steps.ts');

  await expect(
    customStepsTest.steps.map(({kind}) => kind),
    'Only steps from custom step tokens are parsed',
  ).eql(['Given', 'When']);

  await expect(
    customStepsTest.errors.length,
    'Step not covered by custom tokens is missing from test',
  ).eql(1);

  await expect(customStepsTest.errors[0] ?? '', 'Missing step error mentions the step').contains(
    'Step "Then c"',
  );

  await expect(customStepsTest.errors[0] ?? '', 'Missing step error has correct kind').contains(
    'is missing from',
  );

  const unknownReport = await getCodeReport({
    features: [],
    tests: [
      {path: 'unknown.ts', source: "test('T', {meta: {testId: SomeExternalId}}, async () => {});"},
    ],
  });

  const unknownTest = getTestReport(unknownReport, 'unknown.ts');

  await expect(
    unknownTest.testIdentifier,
    'Unknown identifier in options becomes `<unknown>` string',
  ).eql('<unknown>');

  await expect(
    unknownReport.testsByTestIdentifier['<unknown>'],
    'Test with unknown identifier is present in tests map',
  ).eql('unknown.ts' as SourcePath);

  const duplicatePathTest: SourceFile = {
    path: 'same.ts',
    source: "test('T', {meta: {testId: '1'}}, async () => {});",
  };

  try {
    await getCodeReport({features: [], tests: [duplicatePathTest, duplicatePathTest]});

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof Error &&
        error.message.includes('more than one test with the "same.ts" path'),
      'Correctly throw on duplicate test path',
    ).ok();
  }

  const duplicatePathFeature: SourceFile = {
    path: 'same.feature',
    source: ['Feature: F', '', '  Scenario: S', '    Given g', ''].join('\n'),
  };

  try {
    await getCodeReport({features: [duplicatePathFeature, duplicatePathFeature], tests: []});

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof Error &&
        error.message.includes('more than one feature with the "same.feature" path'),
      'Correctly throw on duplicate feature path',
    ).ok();
  }

  const unreachablePaths: string[] = [];

  try {
    for await (const {path} of readFilesByGlobs([null as unknown as string])) {
      unreachablePaths.push(path);
    }

    throw new Error('Unreachable');
  } catch (error) {
    await expect(
      error instanceof TypeError && error.message.includes('patterns'),
      'readFilesByGlobs throws glob error for invalid pattern',
    ).ok();
  }

  await expect(unreachablePaths, 'Invalid pattern yields no files').eql([]);

  const emptyReport = await getCodeReport({features: [], tests: []});

  await expect(Object.keys(emptyReport.features), 'Empty report has no features').eql([]);

  await expect(
    Object.keys(emptyReport.invalidFeatures),
    'Empty report has no invalid features',
  ).eql([]);

  await expect(Object.keys(emptyReport.invalidTests), 'Empty report has no invalid tests').eql([]);

  await expect(Object.keys(emptyReport.scenarios), 'Empty report has no scenarios').eql([]);

  await expect(
    Object.keys(emptyReport.scenariosByTestIdentifier),
    'Empty report has empty scenarios map',
  ).eql([]);

  await expect(Object.keys(emptyReport.tests), 'Empty report has no tests').eql([]);

  await expect(
    Object.keys(emptyReport.testsByTestIdentifier),
    'Empty report has empty tests map',
  ).eql([]);

  await expect(emptyReport.durationInMs, 'Empty report has non-negative duration').gte(0);

  const orderFeatureFiles: readonly SourceFile[] = [
    {
      path: 'orderB.feature',
      source: [
        'Feature: OrderB',
        '',
        '  @testId-202',
        '  Scenario: B first',
        '    Given b',
        '',
        '  @testId-203',
        '  Scenario: B second',
        '    Given b',
        '',
      ].join('\n'),
    },
    {
      path: 'orderA.feature',
      source: [
        'Feature: OrderA',
        '',
        '  @testId-201',
        '  Scenario: A only',
        '    Given a',
        '',
      ].join('\n'),
    },
  ];
  const orderTestFiles: readonly SourceFile[] = [
    {path: 'orderB.ts', source: "test('B', {meta: {testId: '202'}}, async () => {});"},
    {path: 'orderA.ts', source: "test('A', {meta: {testId: '201'}}, async () => {});"},
  ];

  const forwardReport = await getCodeReport({features: orderFeatureFiles, tests: orderTestFiles});
  const reversedReport = await getCodeReport({
    features: [...orderFeatureFiles].reverse(),
    tests: [...orderTestFiles].reverse(),
  });

  await expect(Object.keys(forwardReport.features), 'Features are sorted by path').eql([
    'orderA.feature',
    'orderB.feature',
  ]);

  await expect(Object.keys(forwardReport.tests), 'Tests are sorted by path').eql([
    'orderA.ts',
    'orderB.ts',
  ]);

  await expect(
    Object.keys(forwardReport.scenarios),
    'Scenarios are sorted by feature path and by index inside feature',
  ).eql(['orderA.feature/[0]', 'orderB.feature/[0]', 'orderB.feature/[1]']);

  await expect(
    getScenario(forwardReport, 'orderB.feature/[1]').indexInFeature,
    'Scenario has index inside feature',
  ).eql(1);

  for (const reportKey of [
    'features',
    'invalidFeatures',
    'invalidTests',
    'scenarios',
    'scenariosByTestIdentifier',
    'tests',
    'testsByTestIdentifier',
  ] as const) {
    await expect(
      Object.keys(reversedReport[reportKey]),
      `Keys order of ${reportKey} does not depend on the order of source files`,
    ).eql(Object.keys(forwardReport[reportKey]));
  }

  await expect(
    reversedReport.scenarios,
    'Scenarios content does not depend on the order of source files',
  ).eql(forwardReport.scenarios);

  await expect(
    reversedReport.tests,
    'Tests content does not depend on the order of source files',
  ).eql(forwardReport.tests);

  const manyScenariosLines = ['Feature: Many'];
  const expectedManyScenariosPaths: string[] = [];

  for (let scenarioIndex = 0; scenarioIndex <= 10; scenarioIndex += 1) {
    manyScenariosLines.push('', `  Scenario: S${scenarioIndex}`, '    Given g');
    expectedManyScenariosPaths.push(`many.feature/[${scenarioIndex}]`);
  }

  manyScenariosLines.push('');

  const manyScenariosReport = await getCodeReport({
    features: [{path: 'many.feature', source: manyScenariosLines.join('\n')}],
    tests: [],
  });

  await expect(
    Object.keys(manyScenariosReport.scenarios),
    'Scenarios are sorted numerically by index inside feature, not alphabetically by path',
  ).eql(expectedManyScenariosPaths);

  const duplicatesOrderTestFiles: readonly SourceFile[] = [
    {path: 'dupOrderZ.ts', source: "test('Z', {meta: {testId: '44'}}, async () => {});"},
    {path: 'dupOrderX.ts', source: "test('X', {meta: {testId: '44'}}, async () => {});"},
    {path: 'dupOrderY.ts', source: "test('Y', {meta: {testId: '44'}}, async () => {});"},
  ];

  const duplicatesOrderFeatureFiles: readonly SourceFile[] = [
    {
      path: 'dupOrderD.feature',
      source: ['Feature: D', '', '  @testId-45', '  Scenario: D only', '    Given g', ''].join(
        '\n',
      ),
    },
    {
      path: 'dupOrderC.feature',
      source: [
        'Feature: C',
        '',
        '  @testId-45',
        '  Scenario: C first',
        '    Given g',
        '',
        '  @testId-45',
        '  Scenario: C second',
        '    Given g',
        '',
      ].join('\n'),
    },
  ];

  const duplicatesOrderReports: readonly (readonly [label: string, codeReport: CodeReport])[] = [
    [
      'forward',
      await getCodeReport({features: duplicatesOrderFeatureFiles, tests: duplicatesOrderTestFiles}),
    ],
    [
      'reversed',
      await getCodeReport({
        features: [...duplicatesOrderFeatureFiles].reverse(),
        tests: [...duplicatesOrderTestFiles].reverse(),
      }),
    ],
  ];

  for (const [label, duplicatesOrderReport] of duplicatesOrderReports) {
    await expect(
      getTestReport(duplicatesOrderReport, 'dupOrderX.ts').duplicatesByTestIdentifier.map(String),
      `Duplicates of the first test are sorted by path (${label} order)`,
    ).eql(['dupOrderY.ts', 'dupOrderZ.ts']);

    await expect(
      getTestReport(duplicatesOrderReport, 'dupOrderY.ts').duplicatesByTestIdentifier.map(String),
      `Duplicates of the middle test are sorted by path (${label} order)`,
    ).eql(['dupOrderX.ts', 'dupOrderZ.ts']);

    await expect(
      getTestReport(duplicatesOrderReport, 'dupOrderZ.ts').duplicatesByTestIdentifier.map(String),
      `Duplicates of the last test are sorted by path (${label} order)`,
    ).eql(['dupOrderX.ts', 'dupOrderY.ts']);

    await expect(
      getScenario(duplicatesOrderReport, 'dupOrderC.feature/[0]').duplicatesByTestIdentifier.map(
        String,
      ),
      `Duplicates of the first scenario are sorted by feature path and index (${label} order)`,
    ).eql(['dupOrderC.feature/[1]', 'dupOrderD.feature/[0]']);

    await expect(
      getScenario(duplicatesOrderReport, 'dupOrderC.feature/[1]').duplicatesByTestIdentifier.map(
        String,
      ),
      `Duplicates of the second scenario are sorted by feature path and index (${label} order)`,
    ).eql(['dupOrderC.feature/[0]', 'dupOrderD.feature/[0]']);

    await expect(
      getScenario(duplicatesOrderReport, 'dupOrderD.feature/[0]').duplicatesByTestIdentifier.map(
        String,
      ),
      `Duplicates of the scenario from another feature are sorted (${label} order)`,
    ).eql(['dupOrderC.feature/[0]', 'dupOrderC.feature/[1]']);
  }
});
