import {generalLog} from '../../generalLog';

import {sanitizeHtml} from '../client';
import {getRetriesProps} from '../getRetriesProps';

import {renderErrors} from './renderErrors';
import {renderHead} from './renderHead';
import {renderJsonData} from './renderJsonData';
import {renderNavigation} from './renderNavigation';
import {renderRetries} from './renderRetries';
import {renderScript} from './renderScript';

import type {ReportData, SafeHtml} from '../../../types/internal';

/**
 * Render report data to HTML report page.
 * @internal
 */
export const renderReportToHtml = (reportData: ReportData): SafeHtml => {
  const {length} = reportData.testRunsWithHooks;

  generalLog(`Will render HTML report for ${length} test run${length > 1 ? 's' : ''}`);

  const retries = getRetriesProps(reportData);

  return sanitizeHtml`<!DOCTYPE html>
<html lang="en">
  ${renderHead(reportData.name)}
  <body>
    ${renderNavigation(retries)}
    <div class="main" role="tabpanel">
      <section class="main__section _position_left" aria-label="Retry 1">
        ${renderRetries(retries)}
        ${renderErrors(reportData.errors)}
      </section>
      <div class="drag-container"></div>
      <section
        aria-label="Tests results"
        class="main__section _position_right"
        id="e2edTestRunDetailsContainer"
      ><div class="test-details-empty"><p>No test selected</p></div></section>
    </div>
    ${renderScript()}
    ${renderJsonData(reportData)}
  </body>
</html>`;
};
