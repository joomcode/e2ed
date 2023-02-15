/**
 * @file Test for testing pack tests filtering mechanism.
 */

import {it} from 'autotests';

it('not in allTests pack', {meta: {testId: '13'}}, () => {
  throw new Error('Test filtered from the pack "allTests" was running');
});
