import type {FullConfig} from '../types/internal';

/**
 * Get full e2ed config object.
 * This function can only be called after the E2edRunEvent is registered,
 * because the userland configuration (e2ed/config.ts) is compiled when this event is registered.
 */
export const getFullConfig = (): FullConfig => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
  const {fullConfig}: typeof import('../testcaferc') = require('../testcaferc');

  return fullConfig;
};
