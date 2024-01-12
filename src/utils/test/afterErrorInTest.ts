// eslint-disable-next-line import/no-internal-modules
import {getBrowserConsoleMessages} from '../../actions/getBrowserConsoleMessages';
// eslint-disable-next-line import/no-internal-modules
import {getBrowserJsErrors} from '../../actions/getBrowserJsErrors';

import {addTimeoutToPromise} from '../promise';

import {takeScreenshotsOnErrorIfNeeded} from './takeScreenshotsOnErrorIfNeeded';

import type {TestStaticOptions} from '../../types/internal';

const afterErrorInTestTimeoutInMs = 15_000;

/**
 * Internal "after error in test" hook.
 * @internal
 */
export const afterErrorInTest = (testStaticOptions: TestStaticOptions): Promise<void> =>
  addTimeoutToPromise(
    (async () => {
      await getBrowserConsoleMessages({showMessagesInLog: true});

      await getBrowserJsErrors({showErrorsInLog: true});

      await takeScreenshotsOnErrorIfNeeded(testStaticOptions);
    })(),
    afterErrorInTestTimeoutInMs,
  );
