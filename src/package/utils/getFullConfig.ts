import type {FullConfig} from '../types/internal';

/**
 * Get full e2ed config object.
 */
export const getFullConfig = (): FullConfig => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
  const {fullConfig}: typeof import('../testcaferc') = require('../testcaferc');

  return fullConfig;
};
