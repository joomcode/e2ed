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
  const v8FlagsFilter: (cliPath: string, option: Options) => void;

  export default v8FlagsFilter;
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

  export default testRunTracker;
}
