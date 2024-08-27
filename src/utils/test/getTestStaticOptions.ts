import {getRelativeTestFilePath} from '../getRelativeTestFilePath';

import type {TestInfo} from '@playwright/test';

import type {Test, TestStaticOptions} from '../../types/internal';

/**
 * Get test static options from test and testController.
 * @internal
 */
export const getTestStaticOptions = (test: Test, testInfo: TestInfo): TestStaticOptions => {
  // eslint-disable-next-line no-underscore-dangle
  const absoluteFilePath = String((testInfo as {_requireFile?: string})._requireFile);
  const filePath = getRelativeTestFilePath(absoluteFilePath);

  return {filePath, name: test.name, options: test.options};
};
