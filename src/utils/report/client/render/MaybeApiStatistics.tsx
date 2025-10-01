import {ApiStatistics as clientApiStatistics} from './ApiStatistics';

import type {ApiStatisticsReportHash, ReportClientState, RunHash} from '../../../../types/internal';

const ApiStatistics = clientApiStatistics;

declare const jsx: JSX.Runtime;
declare const reportClientState: ReportClientState;

type Props = Readonly<{runHash: RunHash}>;

/**
 * Renders `ApiStatistics` by `runHash`, if this is a one of kind of `ApiStatistics` hash
 * (pages, requests or resources).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const MaybeApiStatistics: JSX.Component<Props> = ({runHash}) => {
  const hash = String(runHash);

  const pagesHash: ApiStatisticsReportHash = 'api-statistics-pages';
  const requestsHash: ApiStatisticsReportHash = 'api-statistics-requests';
  const resourcesHash: ApiStatisticsReportHash = 'api-statistics-resources';

  if (hash !== pagesHash && hash !== requestsHash && hash !== resourcesHash) {
    return <></>;
  }

  const {reportClientData} = reportClientState;

  if (reportClientData === undefined) {
    // eslint-disable-next-line no-console
    console.error(
      `Cannot find report client data in JSON report data (tried to click "${hash}"). Probably JSON report data not yet completely loaded. Please try click again later`,
    );

    return <></>;
  }

  const {apiStatistics} = reportClientData;

  return <ApiStatistics apiStatistics={apiStatistics} hash={hash} />;
};
