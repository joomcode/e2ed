import {sanitizeHtml} from '../client';

import {locator} from './locator';
import {renderAttributes} from './renderAttributes';
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
}: Props): SafeHtml => sanitizeHtml`<nav class="nav" ${renderAttributes(locator('Navigation'))}>
  <header class="header">
    ${renderLogo()}
  </header>
${renderRetriesButtons({retries})}
</nav>`;
