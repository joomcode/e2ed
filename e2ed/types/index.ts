export * from './user';

/**
 * User language.
 */
export type Language = 'de' | 'en';

/**
 * Mobile device type.
 */
export type MobileDevice = 'iphone' | 'samsung';

/**
 * Test metadata type (testId, severity, etc).
 */
export type TestMeta = Readonly<{
  testId: string;
}>;
