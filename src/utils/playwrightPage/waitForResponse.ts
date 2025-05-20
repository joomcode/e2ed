import {TEST_ENDED_ERROR_MESSAGE} from '../../constants/internal';

import type {Page, Response} from '@playwright/test';

import type {MaybePromise} from '../../types/internal';

type Call = Readonly<{
  disablePredicate: () => void;
  options: Options;
  predicate: Predicate;
  reject: (error: unknown) => void;
  resolve: (response: Response) => void;
}>;
type Options = Readonly<{timeout?: number}>;
type Predicate = (response: Response) => MaybePromise<boolean>;

/**
 * `pageWaitForResponse` calls.
 * @internal
 */
export const waitForResponseCalls: Call[] = [];

/**
 * `page.waitForResponse` wrapper to support tab switching.
 * @internal
 */
export const pageWaitForResponse = (
  page: Page,
  predicate: Predicate,
  options: Options,
): Promise<Response> => {
  let isDisabled = false;

  const disablePredicate = (): void => {
    isDisabled = true;
  };

  const disableablePredicate: Predicate = (response) => {
    if (isDisabled) {
      return true;
    }

    return predicate(response);
  };

  return new Promise<Response>((resolve, reject) => {
    waitForResponseCalls.push({disablePredicate, options, predicate, reject, resolve});

    page.waitForResponse(disableablePredicate, options).then(
      (response) => {
        if (!isDisabled) {
          resolve(response);
        }
      },
      (error) => {
        if (!isDisabled && !String(error).includes(TEST_ENDED_ERROR_MESSAGE)) {
          reject(error);
        }
      },
    );
  });
};
