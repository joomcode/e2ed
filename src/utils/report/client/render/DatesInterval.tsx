/* eslint-disable @typescript-eslint/no-magic-numbers */

import type {UtcTimeInMs} from '../../../../types/internal';

type Props = Readonly<{
  endTimeInMs: UtcTimeInMs;
  startTimeInMs: UtcTimeInMs;
}>;

declare const jsx: JSX.Runtime;

/**
 * Renders the interval between two dates.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const DatesInterval: JSX.Component<Props> = ({endTimeInMs, startTimeInMs}) => {
  const startDate = new Date(startTimeInMs);
  const endDate = new Date(endTimeInMs);

  const startDateTime = startDate.toISOString();
  const endDateTime = endDate.toISOString();

  const date = startDateTime.slice(0, 10);

  const startTime = startDateTime.slice(11, 19);
  const endTime = endDateTime.slice(11, 19);

  return (
    <>
      <time dateTime={startDateTime}>
        {date} {startTime}
      </time>{' '}
      – <time dateTime={endDateTime}>{endTime}</time> UTC
    </>
  );
};
