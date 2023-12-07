/**
 * @file Skipped test for testing skipping mechanism.
 */

import {test} from 'autotests';

test('skipped', {meta: {testId: '4'}}, () => {
  throw new Error('Skipped test was running');
});
