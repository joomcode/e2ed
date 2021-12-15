import {renderLogo} from './renderLogo';
import {renderRetriesButtons} from './renderRetriesButtons';

import type {TestRunsListProps} from '../../types/internal';

/**
 * Render tag <nav>.
 * @internal
 */
export const renderNavigation = (testRunsLists: TestRunsListProps[]): string => `<nav class="nav">
<header class="header">
  <div style="width: 80%; height: 80%">
    ${renderLogo()}
  </div>
</header>
${renderRetriesButtons(testRunsLists)}
</nav>`;
