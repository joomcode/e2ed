/**
 * @file This file must be a syntactically valid ESM module.
 */

import {createTestCafe} from 'e2ed/testcafe';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const checkCreateTestCafe = async () => {
  const testCafe = await createTestCafe();
  const runner = testCafe.createRunner();

  runner.concurrency(1);

  await testCafe.close();
};

// @ts-expect-error: top-level await is not allowed with "module": "CommonJS"
await checkCreateTestCafe();
