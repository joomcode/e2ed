// eslint-disable-next-line import/no-internal-modules
import {getBrowserConsoleMessages} from '../../actions/getBrowserConsoleMessages';
// eslint-disable-next-line import/no-internal-modules
import {getBrowserJsErrors} from '../../actions/getBrowserJsErrors';

import {addTimeoutToPromise} from '../promise';

import {takeScreenshotsOnErrorIfNeeded} from './takeScreenshotsOnErrorIfNeeded';

import type {TestStaticOptions} from '../../types/internal';

const afterErrorInTestTimeoutInMs = 8_000;

/**
 * Internal "after error in test" hook.
 * @internal
 */
export const afterErrorInTest = (testStaticOptions: TestStaticOptions): Promise<void> =>
  addTimeoutToPromise(
    (async () => {
      getBrowserConsoleMessages({showMessagesInLog: true});

      getBrowserJsErrors({showErrorsInLog: true});

      await takeScreenshotsOnErrorIfNeeded(testStaticOptions);
    })(),
    afterErrorInTestTimeoutInMs,
  );
