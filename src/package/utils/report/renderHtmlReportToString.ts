import {generalLog} from '../generalLog';

import {getTestRunsLists} from './getTestRunsLists';
import {renderHead} from './renderHead';
import {renderJsonData} from './renderJsonData';
import {renderNavigation} from './renderNavigation';
import {renderScript} from './renderScript';
import {renderTestRunsLists} from './renderTestRunsLists';

import type {ReportData} from '../../types/internal';

/**
 * Render report data to HTML report page.
 * @internal
 */
export const renderHtmlReportToString = (reportData: ReportData): string => {
  const {length} = reportData.testRunsWithHooks;

  generalLog(`Will render HTML report for ${length} test run${length > 1 ? 's' : ''}`);

  const testRunsLists = getTestRunsLists(reportData);

  return `<!DOCTYPE html><html lang="en">${renderHead()}
<body>${renderNavigation(testRunsLists)}
  <div class="main" role="tabpanel">
    <section class="main__section main__section_position_left" aria-label="Retry 1">
      <h4 class="main__section-title">Retry 1</h4>
      <div class="toolbar" role="toolbar" aria-label="Tests filter"></div>
      ${renderTestRunsLists(testRunsLists)}
    </section>
    <div class="drag-container"></div>
    <section id="e2edTestRunDetails" class="main__section main__section_position_right" aria-label="Tests results">
      <div class="test-detail-empty"><p>No test selected</p></div>
    </section>
  </div>
  ${renderScript()}
  ${renderJsonData(reportData)}
</body></html>`;
};
