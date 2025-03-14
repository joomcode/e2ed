import {sanitizeHtml} from '../client';

import {locator} from './locator';

import type {RetryButtonProps, SafeHtml} from '../../../types/internal';

type Props = RetryButtonProps;

/**
 * Renders tag `<button>` with single retry button.
 * @internal
 */
export const renderRetryButton = ({
  disabled,
  name,
  retry,
  selected,
}: Props): SafeHtml => sanitizeHtml`<button
aria-controls="retry${retry}"
aria-selected="${String(selected)}"
class="nav-tabs__button"
id="retry${retry}-nav"
role="tab"
${locator('RetryButton', {disabled, retry, selected})}
${disabled ? 'disabled' : ''}>${name}</button>`;
