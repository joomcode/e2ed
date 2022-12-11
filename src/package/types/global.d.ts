/* eslint-disable import/no-default-export, import/no-unused-modules, import/unambiguous */

/**
 * Extends node's require function.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface NodeRequire {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  <ModuleExports = import('./utils').Any>(modulePath: string): ModuleExports;
}

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
 * Internal TestCafe module, which is used to decode/encode response body buffers.
 * @internal
 */
declare module 'testcafe-hammerhead/lib/processing/encoding' {
  type RequestHookCharset = import('./requestHooks').RequestHookCharset;
  type RequestHookEncoding = import('./requestHooks').RequestHookEncoding;

  export const decodeContent: (
    destResBody: Buffer,
    encoding: RequestHookEncoding,
    charset: RequestHookCharset,
  ) => Promise<string>;
}

/**
 * Internal TestCafe module with Charset class, which is used to decode/encode response body buffers.
 * @internal
 */
declare module 'testcafe-hammerhead/lib/processing/encoding/charset' {
  type ClassWithoutArgs<Prototype extends object> = import('./class').Class<[], Prototype>;
  type RequestHookCharset = import('./requestHooks').RequestHookCharset;

  const Charset: ClassWithoutArgs<RequestHookCharset>;

  export default Charset;
}

/**
 * Internal TestCafe module with request-hooks events factory class.
 * @internal
 */
declare module 'testcafe-hammerhead/lib/request-pipeline/request-hooks/events/factory' {
  type RequestHookClassWithContext = import('./requestHooks').RequestHookClassWithContext;

  const RequestPipelineRequestHookEventFactory: RequestHookClassWithContext;

  export default RequestPipelineRequestHookEventFactory;
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

  const testRunTracker: Readonly<{
    activeTestRuns: Record<string, InternalTestRun>;
    addTrackingMarkerToFunction(testRunId: string, fn: Fn): Fn;
    ensureEnabled(): void;
    resolveContextTestRun(): InternalTestRun;
    /**
     * Wraps function in context tracker for asynchronous calls.
     */
    _createContextSwitchingFunctionHook(ctxSwitchingFn: Fn, patchedArgsCount: number): Fn;
  }>;

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

  /**
   * Absolute path to testcafe-hammerhead package (to main file), used in testcafe-without-typecheck.
   * @internal
   */
  export const testCafeHammerheadPath: string;
}
