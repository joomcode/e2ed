import {renderApiStatistics as clientRenderApiStatistics} from './render';

import type {
  ApiStatisticsReportHash,
  ReportClientState,
  RunHash,
  SafeHtml,
} from '../../../types/internal';

const renderApiStatistics = clientRenderApiStatistics;

declare const reportClientState: ReportClientState;

/**
 * Renders `ApiStatistics` by `runHash`, if this is a one of kind of `ApiStatistics` hash
 * (pages, requests or resources).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function maybeRenderApiStatistics(runHash: RunHash): SafeHtml | undefined {
  const hash = String(runHash);

  const pagesHash: ApiStatisticsReportHash = 'api-statistics-pages';
  const requestsHash: ApiStatisticsReportHash = 'api-statistics-requests';
  const resourcesHash: ApiStatisticsReportHash = 'api-statistics-resources';

  if (hash !== pagesHash && hash !== requestsHash && hash !== resourcesHash) {
    return;
  }

  const {reportClientData} = reportClientState;

  if (reportClientData === undefined) {
    // eslint-disable-next-line no-console
    console.error(
      `Cannot find report client data in JSON report data (tried to click "${hash}"). Probably JSON report data not yet completely loaded. Please try click again later`,
    );

    return;
  }

  const {apiStatistics} = reportClientData;

  return renderApiStatistics({apiStatistics, hash});
}
