import {sanitizeHtml} from '../client';

import {locatorAttributes} from './locator';
import {renderLogo} from './renderLogo';
import {renderRetriesButtons} from './renderRetriesButtons';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = Readonly<{retries: readonly RetryProps[]}>;

/**
 * Renders tag `<nav>`.
 * @internal
 */
export const renderNavigation = ({
  retries,
}: Props): SafeHtml => sanitizeHtml`<nav class="nav" ${locatorAttributes('Navigation')}>
  <header class="header" ${locatorAttributes('header')}>
    ${renderLogo()}
  </header>
${renderRetriesButtons({retries})}
</nav>`;
