interface RequestHook {
  _onConfigureResponse(event: Record<string, unknown>): Promise<void>;
}

type TestRun = {
  id: string;
  controller: TestController;

  executeAction(apiMethodName: string, command: unknown, callsite: unknown): Promise<unknown>;
  executeCommand(command: unknown): Promise<unknown>;
};

type Fn = (...args: never[]) => unknown;

/**
 * Internal TestCafe module, which is used to track asynchronous calls in tests.
 */
declare module 'testcafe/lib/api/test-run-tracker' {
  const testRunTracker: {
    activeTestRuns: {[id: string]: TestRun};
    addTrackingMarkerToFunction(testRunId: string, fn: Fn): Fn;
    ensureEnabled(): void;
    resolveContextTestRun(): TestRun;
    _createContextSwitchingFunctionHook(ctxSwitchingFn: Fn, patchedArgsCount: number): Fn;
  };

  export default testRunTracker;
}
