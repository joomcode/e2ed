/* eslint-disable import/no-default-export */

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

declare module 'testcafe-without-typecheck' {
  export namespace Inner {
    interface TestController {
      testRun: Readonly<{
        test: Readonly<{
          testFile: Readonly<{
            filename: string;
          }>;
        }>;
      }>;
    }
  }
}

/**
 * Internal TestCafe module, which is used to track asynchronous calls in tests.
 */
declare module 'testcafe-without-typecheck/lib/api/test-run-tracker' {
  type TestRun = {
    id: string;
    controller: Record<string, unknown>;

    executeAction(apiMethodName: string, command: unknown, callsite: unknown): Promise<unknown>;
    executeCommand(command: unknown): Promise<unknown>;
  };

  type Fn = (...args: never[]) => unknown;

  const testRunTracker: {
    activeTestRuns: {[id: string]: TestRun};
    addTrackingMarkerToFunction(testRunId: string, fn: Fn): Fn;
    ensureEnabled(): void;
    resolveContextTestRun(): TestRun;
    /**
     * Wraps function in context tracker for asynchronous calls.
     */
    _createContextSwitchingFunctionHook(ctxSwitchingFn: Fn, patchedArgsCount: number): Fn;
  };

  export default testRunTracker;
}
