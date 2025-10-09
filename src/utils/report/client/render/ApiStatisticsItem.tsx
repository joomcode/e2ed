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
    <li class="step" data-status="passed">
      <button class="step__popover-button" title={name}></button>
      <div class="step__head">
        <span class="step__name">{nameHtml}</span>
        <span class="step__duration">
          {countHtml} / {sizeHtml}
          <Duration durationInMs={duration / count} />
        </span>
      </div>
    </li>
  );
};
