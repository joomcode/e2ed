// eslint-disable-next-line import/no-internal-modules
import {getBrowserConsoleMessages} from '../../actions/getBrowserConsoleMessages';
// eslint-disable-next-line import/no-internal-modules
import {getBrowserJsErrors} from '../../actions/getBrowserJsErrors';

import {takeScreenshotsOnErrorIfNeeded} from './takeScreenshotsOnErrorIfNeeded';

import type {TestStaticOptions} from '../../types/internal';

/**
 * Internal "after error in test" hook.
 * @internal
 */
export const afterErrorInTest = async (testStaticOptions: TestStaticOptions): Promise<void> => {
  await getBrowserConsoleMessages({showMessagesInLog: true});

  await getBrowserJsErrors({showErrorsInLog: true});

  await takeScreenshotsOnErrorIfNeeded(testStaticOptions);
};
