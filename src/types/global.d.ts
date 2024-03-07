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
    forcedKillDelay?: number;
    ignore?: string[];
    useShutdownMessage?: boolean;
  }>;

  /**
   * Filters out `nodejs` cli options and runs node module on `cliPath`.
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
declare module 'testcafe-hammerhead-up/lib/processing/encoding' {
  type RequestHookCharset = import('./requestHooks').RequestHookCharset;
  type RequestHookEncoding = import('./requestHooks').RequestHookEncoding;

  export const decodeContent: (
    destResBody: Buffer,
    encoding: RequestHookEncoding,
    charset: RequestHookCharset,
  ) => Promise<string>;
}

/**
 * Internal TestCafe module with `Charset` class, which is used to decode/encode response body buffers.
 * @internal
 */
declare module 'testcafe-hammerhead-up/lib/processing/encoding/charset' {
  type ClassWithoutArgs<Prototype extends object> = import('./class').Class<[], Prototype>;
  type RequestHookCharset = import('./requestHooks').RequestHookCharset;

  const Charset: ClassWithoutArgs<RequestHookCharset>;

  export default Charset;
}

/**
 * Internal TestCafe module with request-hooks events factory class.
 * @internal
 */
declare module 'testcafe-hammerhead-up/lib/request-pipeline/request-hooks/events/factory' {
  type RequestHookClassWithContext = import('./requestHooks').RequestHookClassWithContext;

  const RequestHookEventFactory: RequestHookClassWithContext;

  export default RequestHookEventFactory;
}

/**
 * Internal TestCafe module with request-hooks frame navigated events factory class for native automation.
 * @internal
 */
declare module 'testcafe-without-typecheck/lib/native-automation/request-hooks/event-factory/frame-navigated-event-based' {
  type RequestHookClassWithContext = import('./requestHooks').RequestHookClassWithContext;

  const RequestHookEventFactory: RequestHookClassWithContext;

  export default RequestHookEventFactory;
}

/**
 * Internal TestCafe module with request-hooks events factory class for native automation.
 * @internal
 */
declare module 'testcafe-without-typecheck/lib/native-automation/request-hooks/event-factory/request-paused-event-based' {
  type RequestHookClassWithContext = import('./requestHooks').RequestHookClassWithContext;

  const RequestHookEventFactory: RequestHookClassWithContext;

  export default RequestHookEventFactory;
}

/**
 * Internal TestCafe module, which is used to track asynchronous calls in tests.
 * @internal
 */
declare module 'testcafe-without-typecheck/lib/api/test-run-tracker' {
  type InternalTestRun = {
    controller: Readonly<Record<string, unknown>>;
    executeAction: (apiMethodName: string, command: unknown, callsite: unknown) => Promise<unknown>;
    executeCommand: (command: unknown) => Promise<unknown>;
    id: string;
  };

  type Fn = (...args: never[]) => unknown;

  const testRunTracker: Readonly<{
    /**
     * Wraps function in context tracker for asynchronous calls.
     */
    _createContextSwitchingFunctionHook: (ctxSwitchingFn: Fn, patchedArgsCount: number) => Fn;
    activeTestRuns: Record<string, InternalTestRun>;
    addTrackingMarkerToFunction: (testRunId: string, fn: Fn) => Fn;
    ensureEnabled: () => void;
    resolveContextTestRun: () => InternalTestRun;
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
}

/**
 * Additional TestCafe module that exports an absolute path to installed testcafe-hammerhead-up package.
 * @internal
 */
declare module 'testcafe-without-typecheck/lib/testCafeHammerheadUpPath' {
  /**
   * Absolute path to testcafe-hammerhead-up package (to main file in lib directly),
   * used in testcafe-without-typecheck.
   * @internal
   */
  export const testCafeHammerheadUpPath: string;
}
