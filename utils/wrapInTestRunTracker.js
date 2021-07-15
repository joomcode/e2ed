import testRunTracker from 'testcafe/lib/api/test-run-tracker';
export const wrapInTestRunTracker = (fn) => testRunTracker._createContextSwitchingFunctionHook(fn, 8);
