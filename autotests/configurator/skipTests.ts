import type {SkipTests} from './types/skipTests';

/**
 * Get array of groups of skipped tests, grouped by skip reason.
 */
export const skipTests: SkipTests = [
  {
    reason: 'Skip for testing skipping mechanism (with link to [Google](https://google.com))',
    testIds: ['4'],
    unskipTaskUrl: 'https://tasktracker.com/3',
  },
];
