/**
 * Playwright error message for some connection error.
 * The test fails after such an error, so it cannot be completely ignored (we write it in the warning).
 * @internal
 */
export const OBJECT_NOT_BOUND_ERROR_REGEXP =
  /Object with guid response@[a-zA-Z0-9]+ was not bound in the connection/;

/**
 * Playwright error message for already closed target (`TargetClosedError`).
 * @internal
 */
export const TARGET_CLOSED_ERROR_MESSAGE = 'Target page, context or browser has been closed';

/**
 * Playwright error message for already ended test.
 * @internal
 */
export const TEST_ENDED_ERROR_MESSAGE = 'Test ended.';
