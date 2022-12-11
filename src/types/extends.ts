import type {DeepReadonly} from './deep';
import type {OriginalTestRunError} from './errors';

/**
 * Internal extend TestController type.
 * @internal
 */
declare module 'testcafe-without-typecheck' {
  namespace Inner {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface TestController {
      readonly testRun: DeepReadonly<{
        errs: readonly OriginalTestRunError[];
        test: {
          testFile: {
            filename: string;
          };
        };
      }>;
    }
  }
}
