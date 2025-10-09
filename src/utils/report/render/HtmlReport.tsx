import {assertValueIsNotNull} from '../../asserts';
import {generalLog} from '../../generalLog';
import {getDurationWithUnits} from '../../getDurationWithUnits';

import {createJsxRuntime, sanitizeHtml} from '../client';
import {getImgCspHosts} from '../getImgCspHosts';
import {getRetriesProps} from '../getRetriesProps';

import {DragContainer} from './DragContainer';
import {Errors} from './Errors';
import {Head} from './Head';
import {JsonData} from './JsonData';
import {locator} from './locator';
import {Navigation} from './Navigation';
import {Retries} from './Retries';
import {ScreenshotDialog} from './ScreenshotDialog';
import {Warnings} from './Warnings';

import type {ReportData, UtcTimeInMs} from '../../../types/internal';

declare const jsx: JSX.Runtime;

Object.assign(globalThis, {jsx: createJsxRuntime()});

type Props = Readonly<{reportData: ReportData}>;

/**
 * Renders report data to HTML report page.
 * @internal
 */
export const HtmlReport: JSX.Component<Props> = ({reportData}) => {
  const startTimeInMs = Date.now() as UtcTimeInMs;

  const {length} = reportData.fullTestRuns;
  const {reportFileName} = reportData;

  assertValueIsNotNull(reportFileName, 'reportFileName is not null');

  const imgCspHosts = getImgCspHosts(reportData);
  const retries = getRetriesProps(reportData);
  const retryNumbers = retries.map(({retryIndex}) => retryIndex);
  const maxRetry = Math.max(...retryNumbers);

  const page = (
    <html lang="en">
      <Head imgCspHosts={imgCspHosts} reportFileName={reportFileName} />
      <body>
        <Navigation retries={retries} />
        <div class="main">
          <section class="column-2" aria-label={`Retry ${maxRetry}`} {...locator('column-2')}>
            <Retries retries={retries} />
            <Errors errors={reportData.errors} />
            <Warnings warnings={reportData.warnings} />
          </section>
          <DragContainer />
          <section
            class="column-3"
            id="e2edRightColumnContainer"
            aria-label="Tests results"
            {...locator('column-3')}
          >
            <p class="empty-state">No test selected</p>
          </section>
        </div>
        <ScreenshotDialog />
        <JsonData reportData={reportData} />
      </body>
    </html>
  );

  const safeHtml = sanitizeHtml`<!DOCTYPE html>${page}`;

  const durationWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

  generalLog(
    `HTML report was rendered for ${length} test run${
      length > 1 ? 's' : ''
    } in ${durationWithUnits}`,
  );

  return safeHtml;
};
