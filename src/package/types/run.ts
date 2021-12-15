/**
 * Fail test params.
 * @internal
 */
export type FailTest = Readonly<{
  fixtureName: string;
  fixturePath: string;
  testName: string;
}>;

/**
 * Fail tests with all tests count.
 * @internal
 */
export type FailTests = Readonly<{
  allTestsCount: number;
  tests: readonly FailTest[];
}>;

/**
 * Options for running one retry of tests.
 * @internal
 */
export type TestCafeRunOptions = Readonly<{
  concurrency: number;
  runLabel: string;
  tests: readonly FailTest[];
}>;

/**
 * Internal TestCafe error object (only some fields).
 */
export type TestCafeError = Readonly<{
  message: string;
}>;
