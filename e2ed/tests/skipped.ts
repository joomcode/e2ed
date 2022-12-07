/**
 * @file Skipped test for testing skipping mechanism.
 */

import {it} from 'autotests';

it('skipped', {meta: {testId: '4'}}, () => {
  throw new Error('Skipped test was running');
});
