import {getRelativeTestFilePath} from '../getRelativeTestFilePath';

import type {Test, TestController, TestStaticOptions} from '../../types/internal';

/**
 * Get test static options from test and testController.
 * @internal
 */
export const getTestStaticOptions = (
  test: Test,
  testController: TestController,
): TestStaticOptions => {
  const {filename: absoluteFilePath} = testController.testRun.test.testFile;
  const filePath = getRelativeTestFilePath(absoluteFilePath);

  return {
    filePath,
    name: test.name,
    options: test.options,
  };
};
