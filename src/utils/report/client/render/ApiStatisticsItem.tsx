import {Duration as clientDuration} from './Duration';

import type {SafeHtml, Url} from '../../../../types/internal';

const Duration = clientDuration;

declare const jsx: JSX.Runtime;

type Props = Readonly<{
  count: number;
  duration: number;
  isHeader?: boolean;
  name: string;
  size?: number;
  url?: Url;
}>;

/**
 * Renders singe item of `ApiStatistics` (pages, requests or resources).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const ApiStatisticsItem: JSX.Component<Props> = ({
  count,
  duration,
  isHeader,
  name,
  size,
  url,
}) => {
  const bytesInKiB = 1_024;
  const countHtml = `${count}x`;
  const sizeHtml = size === undefined ? '' : `${(size / count / bytesInKiB).toFixed(2)} KiB / `;

  let nameHtml: SafeHtml;

  if (isHeader) {
    nameHtml = <b>{name}</b>;
  } else if (url !== undefined) {
    nameHtml = (
      <a href={url} rel="noreferrer" target="_blank">
        {name}
      </a>
    );
  } else {
    nameHtml = <>{name}</>;
  }

  return (
    <span class="step-expanded step-expanded_is-empty">
      <span class="step-expanded__name">{nameHtml}</span>
      <span class="step-expanded__time">
        {countHtml} / {sizeHtml}
        <Duration durationInMs={duration / count} />
      </span>
    </span>
  );
};
