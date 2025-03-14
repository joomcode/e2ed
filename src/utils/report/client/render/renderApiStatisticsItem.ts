import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import {renderDuration as clientRenderDuration} from './renderDuration';

import type {SafeHtml} from '../../../../types/internal';

const renderDuration = clientRenderDuration;
const sanitizeHtml = clientSanitizeHtml;

type Options = Readonly<{
  count: number;
  duration: number;
  isHeader?: boolean;
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
  name,
  size,
}: Options): SafeHtml {
  const bytesInKiB = 1_024;
  const durationHtml = renderDuration(duration / count);
  const countHtml = `${count}x`;
  const nameHtml: SafeHtml = isHeader ? sanitizeHtml`<b>${name}</b>` : sanitizeHtml`${name}`;
  const sizeHtml = size === undefined ? '' : `${(size / count / bytesInKiB).toFixed(2)} KiB `;

  return sanitizeHtml`
<span class="step-expanded step-expanded_is-empty">
  <span class="step-expanded__name">${nameHtml}</span>
  <span class="step-expanded__time">${countHtml} ${sizeHtml}${durationHtml}</span>
</span>`;
}
