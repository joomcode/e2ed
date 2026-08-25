import type {testIdentifierKey} from 'autotests/configurator';

/**
 * Test metadata parameters (testId, severity, etc).
 */
export type TestMeta = Readonly<{
  [testIdentifierKey]: string;
}>;
