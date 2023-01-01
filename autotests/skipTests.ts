import type {SkipTests} from './types/skipTests';

/**
 * Array of groups of skipped tests, grouped by skip reason.
 */
export const skipTests: SkipTests = [
  {
    reason: 'Skip for testing skipping mechanism',
    testIds: ['4'],
    unskipTaskUrl: 'https://tasktracker.com/3',
  },
];
