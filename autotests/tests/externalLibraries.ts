import {test} from 'autotests';
import {expect} from 'e2ed';
import {
  type Attributes,
  createSimpleLocator,
  createTestLocator,
  getCssSelectorFromAttributesChain,
} from 'e2ed/createLocator';
import {
  getModulesGraph,
  type Options,
  resolveImports,
  resolveReexports,
} from 'e2ed/getModulesGraph';
import {type Feature, parseGherkin, ParseGherkinError} from 'e2ed/parseGherkin';

test('External libraries are reexported correctly', {meta: {testId: '35'}}, async () => {
  await expect(typeof createSimpleLocator, '`createSimpleLocator` is a function').eql('function');

  await expect(typeof createTestLocator, '`createTestLocator` is a function').eql('function');

  await expect(
    typeof getCssSelectorFromAttributesChain,
    '`getCssSelectorFromAttributesChain` is a function',
  ).eql('function');

  await expect(typeof getModulesGraph, '`getModulesGraph` is a function').eql('function');

  await expect(typeof resolveImports, '`resolveImports` is a function').eql('function');

  await expect(typeof resolveReexports, '`resolveReexports` is a function').eql('function');

  await expect(typeof parseGherkin, '`parseGherkin` is a function').eql('function');

  await expect(typeof ParseGherkinError, '`ParseGherkinError` is a class').eql('function');

  const locatorAttributes: Attributes = {};
  const modulesGraphOptions: Partial<Options> = {};
  const gherkinFeatures: readonly Feature[] = [];

  await expect(
    typeof locatorAttributes === 'object' &&
      typeof modulesGraphOptions === 'object' &&
      gherkinFeatures.length === 0,
    'Types from external libraries are imported correctly',
  ).ok();
});
