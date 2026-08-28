// eslint-disable-next-line import/no-internal-modules
import {cloneWithSortedFields} from '../../clone/cloneWithSortedFields';
// eslint-disable-next-line import/no-internal-modules
import {setReadonlyProperty} from '../../object/setReadonlyProperty';

import type {CodeReport} from '../../../types/internal';

/**
 * Sorts all fields in code report (features, scenarios, tests).
 * @internal
 */
export const sortAllFields = (codeReport: CodeReport): void => {
  const features = cloneWithSortedFields(codeReport.features);
  const invalidFeatures = cloneWithSortedFields(codeReport.invalidFeatures);
  const invalidTests = cloneWithSortedFields(codeReport.invalidTests);
  const scenarios = cloneWithSortedFields(codeReport.scenarios, ([, a], [, b]) =>
    // eslint-disable-next-line no-nested-ternary
    a.featurePath < b.featurePath
      ? -1
      : a.featurePath > b.featurePath
        ? 1
        : a.indexInFeature - b.indexInFeature,
  );
  const tests = cloneWithSortedFields(codeReport.tests);

  setReadonlyProperty(codeReport, 'features', features);
  setReadonlyProperty(codeReport, 'invalidFeatures', invalidFeatures);
  setReadonlyProperty(codeReport, 'invalidTests', invalidTests);
  setReadonlyProperty(codeReport, 'scenarios', scenarios);
  setReadonlyProperty(codeReport, 'tests', tests);
};
