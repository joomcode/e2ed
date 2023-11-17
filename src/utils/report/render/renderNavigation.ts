import {createLocator, type Locator, type Mark} from 'create-locator';

import {sanitizeHtml} from '../client';

import {renderAttributes} from './renderAttributes';
import {renderLogo} from './renderLogo';
import {renderRetriesButtons, type RetriesButtonsLocator} from './renderRetriesButtons';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = Readonly<{retries: readonly RetryProps[]}> & Mark<NavigationLocator>;

export type NavigationLocator = Locator<{
  retries: RetriesButtonsLocator;
}>;

/**
 * Renders tag `<nav>`.
 * @internal
 */
export const renderNavigation = ({retries, ...rest}: Props): SafeHtml => {
  const locator = createLocator(rest);

  return sanitizeHtml`
<nav class="nav" ${renderAttributes(locator())}>
  <header class="header">
    ${renderLogo()}
  </header>
${renderRetriesButtons({retries, ...locator.retries()})}
</nav>`;
};
