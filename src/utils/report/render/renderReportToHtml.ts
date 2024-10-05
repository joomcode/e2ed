import {assertValueIsNotNull} from '../../asserts';
import {generalLog} from '../../generalLog';
import {getDurationWithUnits} from '../../getDurationWithUnits';

import {sanitizeHtml} from '../client';
import {getRetriesProps} from '../getRetriesProps';

import {locator} from './locator';
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
  const retryNumbers = retries.map(({retryIndex}) => retryIndex);
  const maxRetry = Math.max(...retryNumbers);

  const safeHtml = sanitizeHtml`<!DOCTYPE html>
<html lang="en">
  ${renderHead(reportFileName)}
  <body>
    ${renderNavigation({retries})}
    <div class="main" role="tabpanel">
      <section class="main__section _position_left" aria-label="Retry ${maxRetry}" ${locator('column1')}>
        ${renderRetries({retries})}
        ${renderErrors(reportData.errors)}
      </section>
      <div class="drag-container"></div>
      <section
        aria-label="Tests results"
        class="main__section _position_right"
        id="e2edTestRunDetailsContainer"
        ${locator('column2')}
      ><div class="test-details-empty"><p>No test selected</p></div></section>
    </div>
    ${renderJsonData(reportData)}
  </body>
</html>`;

  const durationWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

  generalLog(
    `HTML report was rendered for ${length} test run${
      length > 1 ? 's' : ''
    } in ${durationWithUnits}`,
  );

  return safeHtml;
};
