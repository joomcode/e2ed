import {assertValueIsNotNull} from '../../asserts';
import {generalLog} from '../../generalLog';

import {sanitizeHtml} from '../client';
import {getRetriesProps} from '../getRetriesProps';

import {renderErrors} from './renderErrors';
import {renderHead} from './renderHead';
import {renderJsonData} from './renderJsonData';
import {renderNavigation} from './renderNavigation';
import {renderRetries} from './renderRetries';

import type {ReportData, SafeHtml, UtcTimeInMs} from '../../../types/internal';

/**
 * Renders report data to HTML report page.
 * @internal
 */
export const renderReportToHtml = (reportData: ReportData): SafeHtml => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const {length} = reportData.fullTestRuns;
  const {reportFileName} = reportData;

  assertValueIsNotNull(reportFileName, 'reportFileName is not null');

  const retries = getRetriesProps(reportData);

  const safeHtml = sanitizeHtml`<!DOCTYPE html>
<html lang="en">
  ${renderHead(reportFileName)}
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
    ${renderJsonData(reportData)}
  </body>
</html>`;

  const duration = Date.now() - startTimeInMs;

  generalLog(
    `HTML report was rendered for ${length} test run${length > 1 ? 's' : ''} in ${duration}ms`,
  );

  return safeHtml;
};
