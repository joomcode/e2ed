export * from './user';

export type Language = 'de' | 'en';

/**
 * Test metadata type (testId, severity, etc).
 */
export type TestMeta = Readonly<{
  testId: string;
}>;
