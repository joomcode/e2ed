import {renderDuration as clientRenderDuration} from './renderDuration';

import type {ReportClientState, SafeHtml} from '../../../../types/internal';

const renderDuration = clientRenderDuration;

declare const reportClientState: ReportClientState;

type Options = Readonly<{
  count: number;
  duration: number;
  isHeader?: boolean;
  isUrl?: boolean;
  name: string;
  size?: number;
}>;

/**
 * Renders singe item of `ApiStatistics` (pages, requests or resources).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderApiStatisticsItem({
  count,
  duration,
  isHeader,
  isUrl,
  name,
  size,
}: Options): SafeHtml {
  const bytesInKiB = 1_024;
  const durationHtml = renderDuration(duration / count);
  const countHtml = `${count}x`;
  const sizeHtml = size === undefined ? '' : `${(size / count / bytesInKiB).toFixed(2)} KiB / `;
  const {createElement, Fragment} = reportClientState.jsxRuntime;

  let nameHtml: SafeHtml;

  if (isHeader) {
    nameHtml = <b>{name}</b>;
  } else if (isUrl) {
    nameHtml = (
      <a href={name} rel="noreferrer" target="_blank">
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
        {durationHtml}
      </span>
    </span>
  );
}
