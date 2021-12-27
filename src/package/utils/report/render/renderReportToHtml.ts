import {generalLog} from '../../generalLog';

import {e2edSanitizeHtml} from '../client';
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

  return e2edSanitizeHtml`<!DOCTYPE html>
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
      <section id="e2edTestRunDetails" class="main__section _position_right" aria-label="Tests results">
        <div class="test-details-empty"><p>No test selected</p></div>
      </section>
    </div>
    ${renderScript()}
    ${renderJsonData(reportData)}
  </body>
</html>`;
};
