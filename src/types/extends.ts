import type {DeepReadonly} from './deep';
import type {OriginalTestRunError} from './errors';
import type {TestCafeBrowserConnection} from './testCafe';

/**
 * Internal extend `TestController` type.
 * @internal
 */
declare module 'testcafe-without-typecheck' {
  namespace Inner {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface TestController {
      readonly testRun: DeepReadonly<{
        browserConnection: TestCafeBrowserConnection;
        emit: (this: void, eventName: string) => Promise<void>;
        errs: readonly OriginalTestRunError[];
        test: {testFile: {filename: string}};
      }>;
    }
  }
}

/**
 * We add this export so that the `d.ts`-module from this file does not remain empty
 * after build and was not removed (since TypeScript will leave a `reference` to it).
 */
export type {};
