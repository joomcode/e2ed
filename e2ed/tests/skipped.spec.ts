/**
 * @file Skipped test for testing skipping mechanism.
 */

import {it} from 'e2ed';

it('skipped', {meta: {testId: '3'}}, () => {
  throw new Error('Skipped test was running');
});
