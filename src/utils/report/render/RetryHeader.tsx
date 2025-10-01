import {DatesInterval, Duration} from '../client';

import {locator} from './locator';

import type {RetryProps} from '../../../types/internal';

const testId = 'RetryHeader';

declare const jsx: JSX.Runtime;

type Props = RetryProps;

/**
 * Renders retry header.
 * @internal
 */
export const RetryHeader: JSX.Component<Props> = ({endTimeInMs, retryIndex, startTimeInMs}) => {
  const durationInMs = endTimeInMs - startTimeInMs;

  return (
    <>
      <h3 class="__title" {...locator(testId, 'title')}>
        Retry {retryIndex}
      </h3>
      <p class="__date" {...locator(testId, 'date')}>
        <DatesInterval endTimeInMs={endTimeInMs} startTimeInMs={startTimeInMs} />(
        <Duration durationInMs={durationInMs} />
      </p>
    </>
  );
};
