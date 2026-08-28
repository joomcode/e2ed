import {fillDuplicates} from './fillDuplicates';
import {fillLinks} from './fillLinks';
import {sortAllFields} from './sortAllFields';

import type {CodeReport} from '../../../types/internal';

/**
 * Fills code report internal fields.
 * @internal
 */
export const fillReport = (codeReport: CodeReport): void => {
  sortAllFields(codeReport);
  fillDuplicates(codeReport.scenarios);
  fillDuplicates(codeReport.tests);
  fillLinks(codeReport);
};
