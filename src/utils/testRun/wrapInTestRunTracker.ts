// eslint-disable-next-line import/no-internal-modules
import testRunTracker from 'testcafe-without-typecheck/lib/api/test-run-tracker';

const maxPatchedArgsCount = 8;

/**
 * Wrap functions that set callbacks in the test run tracker.
 */
export const wrapInTestRunTracker = <F extends (...args: never[]) => unknown>(fn: F): F =>
  // eslint-disable-next-line no-underscore-dangle
  testRunTracker._createContextSwitchingFunctionHook(fn, maxPatchedArgsCount) as F;
