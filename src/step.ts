import {LogEventType} from './constants/internal';
import {setCustomInspectOnFunction} from './utils/fn';
import {log} from './utils/log';

import type {MaybePromise} from './types/internal';

import {test as playwrightTest} from '@playwright/test';

type Options = Readonly<{skipLogs?: boolean; timeout?: number}>;

const noop = (): void => {};

/**
 * Declares a test step (calls Playwright's `test.step` function inside).
 */
export const step = (
  name: string,
  body: () => MaybePromise<void> = noop,
  options?: Options,
): Promise<void> => {
  if (options?.skipLogs !== true) {
    if (body !== noop) {
      setCustomInspectOnFunction(body);
    }

    log(name, {body: body === noop ? undefined : body, options}, LogEventType.InternalCore);
  }

  return playwrightTest.step(name, body, options);
};
