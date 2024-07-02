/**
 * Wrap functions that set callbacks in the test run tracker.
 */
export const wrapInTestRunTracker = <F extends (...args: never[]) => unknown>(fn: F): F => fn;
