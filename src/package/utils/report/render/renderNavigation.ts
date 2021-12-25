import {e2edSanitizeHtml} from '../client';

import {renderLogo} from './renderLogo';
import {renderRetriesButtons} from './renderRetriesButtons';

import type {SafeHtml, TestRunsListProps} from '../../../types/internal';

/**
 * Render tag <nav>.
 * @internal
 */
export const renderNavigation = (testRunsLists: TestRunsListProps[]): SafeHtml => e2edSanitizeHtml`
<nav class="nav">
  <header class="header">
    <div style="width: 80%; height: 80%">
      ${renderLogo()}
    </div>
  </header>
  ${renderRetriesButtons(testRunsLists)}
</nav>`;
