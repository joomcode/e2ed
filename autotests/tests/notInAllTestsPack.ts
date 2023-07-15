/**
 * @file Test for testing pack tests filtering mechanism.
 */

import {it} from 'autotests';
import {E2edError} from 'e2ed/utils';

it('not in allTests pack', {meta: {testId: '13'}}, () => {
  throw new E2edError('Test filtered from the pack "allTests" was running');
});
