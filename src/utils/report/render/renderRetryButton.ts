import {sanitizeHtml} from '../client';

import type {RetryButtonProps, SafeHtml} from '../../../types/internal';

/**
 * Render tag <button> with single retry button.
 * @internal
 */
export const renderRetryButton = ({
  disabled,
  retry,
  selected,
}: RetryButtonProps): SafeHtml => sanitizeHtml`<button
aria-controls="retry${retry}"
aria-selected="${String(selected)}"
class="nav-tabs__button"
id="retry${retry}-nav"
role="tab"
${disabled ? 'disabled' : ''}>Retry ${retry}</button>`;
