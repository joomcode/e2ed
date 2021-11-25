export {};

/**
 * Internal extend TestController type.
 * @internal
 */
declare module 'testcafe-without-typecheck' {
  namespace Inner {
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
