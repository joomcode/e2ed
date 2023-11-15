import {createLocator, type Locator, type Mark} from 'create-locator';

import {sanitizeHtml} from '../client';

import {renderAttributes} from './renderAttributes';

import type {RetryButtonProps, SafeHtml} from '../../../types/internal';

type Props = RetryButtonProps & Mark<RetryButtonLocator>;

export type RetryButtonLocator = Locator<
  void,
  {disabled: `${boolean}`; retry: string; selected: `${boolean}`}
>;

/**
 * Renders tag <button> with single retry button.
 * @internal
 */
export const renderRetryButton = ({disabled, retry, selected, ...rest}: Props): SafeHtml => {
  const locator = createLocator(rest);

  return sanitizeHtml`<button
aria-controls="retry${retry}"
aria-selected="${String(selected)}"
class="nav-tabs__button"
id="retry${retry}-nav"
role="tab"
${renderAttributes(
  locator({disabled: `${disabled}`, retry: String(retry), selected: `${selected}`}),
)}
${disabled ? 'disabled' : ''}>Retry ${retry}</button>`;
};
