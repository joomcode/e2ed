import {e2edSanitizeHtml} from '../client';

import {renderLogo} from './renderLogo';
import {renderRetriesButtons} from './renderRetriesButtons';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Render tag <nav>.
 * @internal
 */
export const renderNavigation = (retries: RetryProps[]): SafeHtml => e2edSanitizeHtml`
<nav class="nav">
  <header class="header">
    ${renderLogo()}
  </header>
  ${renderRetriesButtons(retries)}
</nav>`;
