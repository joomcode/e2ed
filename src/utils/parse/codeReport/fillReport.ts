import {fillDuplicates} from './fillDuplicates';
import {fillLinks} from './fillLinks';

import type {CodeReport} from '../../../types/internal';

/**
 * Fill code report internal fields.
 * @internal
 */
export const fillReport = (codeReport: CodeReport): void => {
  fillDuplicates(codeReport.scenarios);
  fillDuplicates(codeReport.tests);
  fillLinks(codeReport);
};
