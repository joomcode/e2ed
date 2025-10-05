import {getDurationWithUnits as clientGetDurationWithUnits} from '../../../getDurationWithUnits';

import {SafeHtml as clientSafeHtml} from './SafeHtml';

const getDurationWithUnits = clientGetDurationWithUnits;
const SafeHtml = clientSafeHtml;

declare const jsx: JSX.Runtime;

type Props = Readonly<{durationInMs: number}>;

/**
 * Renders the duration of time interval in hours, minutes, seconds and milliseconds.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const Duration: JSX.Component<Props> = ({durationInMs}) => {
  const durationWithUnits = getDurationWithUnits(durationInMs);

  return <SafeHtml withoutSanitize={durationWithUnits} />;
};
