export * from './user';

export type Language = 'de' | 'en';

export type MobileDevice = 'iphone' | 'samsung';

/**
 * Test metadata type (testId, severity, etc).
 */
export type TestMeta = Readonly<{
  testId: string;
}>;
