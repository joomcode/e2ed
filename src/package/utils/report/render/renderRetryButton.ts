import {e2edSanitizeHtml} from '../client';

import type {RetryButtonProps, SafeHtml} from '../../../types/internal';

/**
 * Render tag <button> with single retry button.
 * @internal
 */
export const renderRetryButton = ({
  disabled,
  retry,
  selected,
}: RetryButtonProps): SafeHtml => e2edSanitizeHtml`<button
aria-controls="retry${retry}-nav-tablist"
aria-selected="${String(selected)}"
class="nav-tabs__button"
id="retry${retry}-nav"
role="tab"
${disabled ? 'disabled' : ''}>Retry ${retry}</button>`;
