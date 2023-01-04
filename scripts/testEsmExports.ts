/**
 * @file This file must be a syntactically valid ESM module.
 * Tests ESM-exports of package.
 */

import {createTestCafe} from 'e2ed/testcafe';

/**
 * Tests that createTestCafe from e2ed/testcafe has correct interface.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const testCreateTestCafe = async () => {
  const testCafe = await createTestCafe();
  const runner = testCafe.createRunner();

  runner.concurrency(1);

  await testCafe.close();

  // eslint-disable-next-line no-console
  console.log('[OK] ESM exports are correct');
};

// @ts-expect-error: top-level await is not allowed with "module": "CommonJS"
await testCreateTestCafe();
