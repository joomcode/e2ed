import type {DeepReadonly} from './internal';

type Err = {readonly errMsg: string};

/**
 * Internal extend TestController type.
 * @internal
 */
declare module 'testcafe-without-typecheck' {
  namespace Inner {
    interface TestController {
      readonly testRun: DeepReadonly<{
        errs: readonly Err[];
        test: {
          testFile: {
            filename: string;
          };
        };
      }>;
    }
  }
}
