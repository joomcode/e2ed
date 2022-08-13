import type {Config} from 'e2ed/configurator';

/**
 * Array of groups of skipped tests, grouped by skip reason.
 */
export const skipTests: Config['skipTests'] = [
  {
    reason: 'Skip for testing skipping mechanism',
    testIds: ['3'],
    unskipTaskUrl: 'https://tasktracker.com/3',
  },
];
