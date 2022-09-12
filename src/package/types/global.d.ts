/* eslint-disable import/no-default-export, import/no-unused-modules, import/unambiguous */

/**
 * Package for filtering V8 command line flags when run TestCafe via CLI.
 * @internal
 */
declare module 'bin-v8-flags-filter' {
  type Options = Readonly<{
    ignore?: string[];
    useShutdownMessage?: boolean;
    forcedKillDelay?: number;
  }>;

  /**
   * Filters out nodejs cli options and runs node module on cliPath.
   */
  const v8FlagsFilter: (cliPath: string, options: Options) => void;

  export default v8FlagsFilter;
}

/**
 * Internal ESM module, which is used to directly access to TestCafe exports.
 * @internal
 */
declare module 'e2ed/testcafe' {
  type TestCafeExports = typeof import('../testcafe');

  export const createTestCafe: TestCafeExports['createTestCafe'];
  export const fixture: TestCafeExports['fixture'];
  export const RequestHook: TestCafeExports['RequestHook'];
  export const RequestLogger: TestCafeExports['RequestLogger'];
  export const RequestMock: TestCafeExports['RequestMock'];
  export const Selector: TestCafeExports['Selector'];
  export const test: TestCafeExports['test'];
}

/**
 * Assert functions (with assertion signatures) for out-of-test-context scope.
 * @internal
 */
declare module 'e2ed/utils/asserts' {
  export const assertValueIsDefined: typeof import('../utils/asserts').assertValueIsDefined;
}

/**
 * Internal TestCafe module, which is used to track asynchronous calls in tests.
 * @internal
 */
declare module 'testcafe-without-typecheck/lib/api/test-run-tracker' {
  type InternalTestRun = {
    id: string;
    controller: Record<string, unknown>;

    executeAction(apiMethodName: string, command: unknown, callsite: unknown): Promise<unknown>;
    executeCommand(command: unknown): Promise<unknown>;
  };

  type Fn = (...args: never[]) => unknown;

  const testRunTracker: {
    activeTestRuns: Record<string, InternalTestRun>;
    addTrackingMarkerToFunction(testRunId: string, fn: Fn): Fn;
    ensureEnabled(): void;
    resolveContextTestRun(): InternalTestRun;
    /**
     * Wraps function in context tracker for asynchronous calls.
     */
    _createContextSwitchingFunctionHook(ctxSwitchingFn: Fn, patchedArgsCount: number): Fn;
  };

  /**
   * Internal TestCafe test context runner tracker.
   * @internal
   */
  export default testRunTracker;
}

/**
 * A patched TestCafe CLI module that exports a TestCafe run promise.
 * @internal
 */
declare module 'testcafe-without-typecheck/lib/cli/cli' {
  /**
   * A promise that resolves when the TestCafe completes its tests run (in CLI).
   * @internal
   */
  export const runTestCafePromise: Promise<number>;
}
