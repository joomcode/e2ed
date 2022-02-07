import {getTestRunButtonProps} from './getTestRunButtonProps';

import type {ReportData, RetryProps} from '../../types/internal';

/**
 * Get array of RetryProps from report data.
 * @internal
 */
export const getRetriesProps = ({retries}: ReportData): readonly RetryProps[] => {
  const retryProps: RetryProps[] = retries.map(
    ({endTimeInMs, fullTestRuns, retry, startTimeInMs}) => {
      const testRunButtons = fullTestRuns.map(getTestRunButtonProps);

      return {endTimeInMs, hidden: true, retry, startTimeInMs, testRunButtons};
    },
  );

  if (retryProps[0]) {
    (retryProps[0] as {hidden: boolean}).hidden = false;
  }

  return retryProps;
};
