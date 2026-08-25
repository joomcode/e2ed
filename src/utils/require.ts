/* eslint-disable global-require */

/**
 * Requires `@playwright/test` (for lazy loading).
 * @internal
 */
export const requirePlaywright = (): typeof import('@playwright/test') =>
  require<typeof import('@playwright/test')>('@playwright/test');

/**
 * Requires `typescript` (for lazy loading).
 * @internal
 */
export const requireTypescript = (): typeof import('typescript') =>
  require<typeof import('typescript')>('typescript');
