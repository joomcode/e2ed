import {sanitizeHtml} from '../client';

import {renderLogo} from './renderLogo';
import {renderRetriesButtons} from './renderRetriesButtons';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Renders tag <nav>.
 * @internal
 */
export const renderNavigation = (retries: readonly RetryProps[]): SafeHtml => sanitizeHtml`
<nav class="nav">
  <header class="header">
    ${renderLogo()}
  </header>
  ${renderRetriesButtons(retries)}
</nav>`;
