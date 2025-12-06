import {LogEventType} from './constants/internal';
import {setCustomInspectOnFunction} from './utils/fn';
import {log} from './utils/log';

import type {LogPayload, MaybePromise, Void} from './types/internal';

import {test as playwrightTest} from '@playwright/test';

type Options = Readonly<{runPlaywrightStep?: boolean; skipLogs?: boolean; timeout?: number}>;

/**
 * Declares a test step (calls Playwright's `test.step` function inside).
 */
export const step = async (
  name: string,
  body?: () => MaybePromise<LogPayload | Void>,
  options?: Options,
): Promise<void> => {
  if (options?.skipLogs !== true) {
    if (body !== undefined) {
      setCustomInspectOnFunction(body);
    }

    log(name, {body, options}, LogEventType.InternalCore);
  }

  try {
    let payload: LogPayload | Void;

    if (options?.runPlaywrightStep === true) {
      await playwrightTest.step(
        name,
        async () => {
          payload = await body?.();
        },
        options,
      );
    } else {
      payload = await body?.();
    }

    // TODO: set payload to log
    payload;
  } catch (error) {
    // TODO: add error to log and set logEventStatus = 'failed'

    if (error !== null && typeof error === 'object') {
      Object.assign(error, {fromStep: name});
    }

    throw error;
  }
};
