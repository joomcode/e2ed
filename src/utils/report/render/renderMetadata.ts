import {createSafeHtmlWithoutSanitize} from '../client';

import type {ApiStatisticsReportHash, SafeHtml} from '../../../types/internal';

type Props = Readonly<{menuIndex: number}>;

/**
 * Renders metadata of whole `e2ed` run.
 * @internal
 */
export const renderMetadata = ({menuIndex}: Props): SafeHtml => {
  const pagesHash: ApiStatisticsReportHash = 'api-statistics-pages';
  const requestsHash: ApiStatisticsReportHash = 'api-statistics-requests';
  const resourcesHash: ApiStatisticsReportHash = 'api-statistics-resources';

  return createSafeHtmlWithoutSanitize`
<article class="retry" id="retry${menuIndex}" hidden>
  <h3 class="__title">Metadata</h3>
  <button aria-selected="false" class="test-button" data-runhash="${pagesHash}" role="tab">Pages statistics</button>
  <button aria-selected="false" class="test-button" data-runhash="${requestsHash}" role="tab">Requests statistics</button>
  <button aria-selected="false" class="test-button" data-runhash="${resourcesHash}" role="tab">Resources statistics</button>
</article>`;
};
