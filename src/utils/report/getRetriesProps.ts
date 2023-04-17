import {getTestRunButtonProps} from './getTestRunButtonProps';

import type {ReportData, RetryProps} from '../../types/internal';

/**
 * Get array of RetryProps from report data.
 * @internal
 */
export const getRetriesProps = ({retries}: ReportData): readonly RetryProps[] => {
  const retryProps: RetryProps[] = retries.map(
    ({endTimeInMs, fullTestRuns, retryIndex, startTimeInMs}) => {
      const testRunButtons = fullTestRuns.map(getTestRunButtonProps);

      return {endTimeInMs, hidden: true, retryIndex, startTimeInMs, testRunButtons};
    },
  );

  if (retryProps.at(-1)) {
    (retryProps.at(-1) as {hidden: boolean}).hidden = false;
  }

  return retryProps;
};
