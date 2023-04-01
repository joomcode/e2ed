import {assertValueIsTrue} from '../asserts';

/**
 * The number of tests successful in the current retry.
 */
let successfulInCurrentRetry = 0;

/**
 * The total number of tests successful in all previous retries.
 */
let successfulTotalInPreviousRetries = 0;

/**
 * Add one successful test run (in current retry).
 * @internal
 */
export const addSuccessfulInCurrentRetry = (): void => {
  successfulInCurrentRetry += 1;
};

/**
 * Get the number of tests successful for printing (total and in the current retry).
 * @internal
 */
export const getSuccessfulTestRunCount = (): string => {
  if (successfulTotalInPreviousRetries === 0) {
    return String(successfulInCurrentRetry);
  }

  const successfulTotal = successfulInCurrentRetry + successfulTotalInPreviousRetries;

  return `${successfulInCurrentRetry} in the current retry, ${successfulTotal} in total`;
};

/**
 * Set successful test runs total in previous retries
 * @internal
 */
export const setSuccessfulTotalInPreviousRetries = (
  newSuccessfulTotalInPreviousRetries: number,
): void => {
  assertValueIsTrue(
    successfulTotalInPreviousRetries === 0,
    'successfulTotalInPreviousRetries is equal to 0',
    {newSuccessfulTotalInPreviousRetries},
  );

  successfulTotalInPreviousRetries = newSuccessfulTotalInPreviousRetries;
};
