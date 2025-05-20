import {TEST_ENDED_ERROR_MESSAGE} from '../../constants/internal';

import type {Page, Request} from '@playwright/test';

import type {MaybePromise} from '../../types/internal';

type Call = Readonly<{
  disablePredicate: () => void;
  options: Options;
  predicate: Predicate;
  reject: (error: unknown) => void;
  resolve: (request: Request) => void;
}>;
type Options = Readonly<{timeout?: number}>;
type Predicate = (request: Request) => MaybePromise<boolean>;

/**
 * `pageWaitForRequest` calls.
 * @internal
 */
export const waitForRequestCalls: Call[] = [];

/**
 * `page.waitForRequest` wrapper to support tab switching.
 * @internal
 */
export const pageWaitForRequest = (
  page: Page,
  predicate: Predicate,
  options: Options,
): Promise<Request> => {
  let isDisabled = false;

  const disablePredicate = (): void => {
    isDisabled = true;
  };

  const disableablePredicate: Predicate = (request) => {
    if (isDisabled) {
      return true;
    }

    return predicate(request);
  };

  return new Promise<Request>((resolve, reject) => {
    waitForRequestCalls.push({disablePredicate, options, predicate, reject, resolve});

    page.waitForRequest(disableablePredicate, options).then(
      (request) => {
        if (!isDisabled) {
          resolve(request);
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
