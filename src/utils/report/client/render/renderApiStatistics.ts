import {createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize} from '../sanitizeHtml';

import {renderApiStatisticsItem as clientRenderApiStatisticsItem} from './renderApiStatisticsItem';

import type {ApiStatistics, ApiStatisticsReportHash, SafeHtml} from '../../../../types/internal';

const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;
const renderApiStatisticsItem = clientRenderApiStatisticsItem;

type Options = Readonly<{
  apiStatistics: ApiStatistics;
  hash: ApiStatisticsReportHash;
}>;

/**
 * Renders `ApiStatistics` of one kind (pages, requests or resources).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderApiStatistics({apiStatistics, hash}: Options): SafeHtml {
  let header: string | undefined;
  const items: SafeHtml[] = [];

  if (hash === 'api-statistics-pages') {
    header = 'Pages';

    for (const [name, byUrl] of Object.entries(apiStatistics.pages)) {
      let pageCount = 0;
      let pageDuration = 0;
      const pageItems: SafeHtml[] = [];

      for (const [url, {count, duration}] of Object.entries(byUrl)) {
        pageCount += count;
        pageDuration += duration;

        pageItems.push(renderApiStatisticsItem({count, duration, name: url}));
      }

      items.push(
        renderApiStatisticsItem({count: pageCount, duration: pageDuration, isHeader: true, name}),
      );
      items.push(...pageItems);
    }
  } else if (hash === 'api-statistics-requests') {
    header = 'Requests';

    for (const [url, byMethod] of Object.entries(apiStatistics.requests)) {
      for (const [method, byStatusCode] of Object.entries(byMethod)) {
        // eslint-disable-next-line max-depth
        for (const [statusCode, {count, duration, size}] of Object.entries(byStatusCode)) {
          items.push(
            renderApiStatisticsItem({
              count,
              duration,
              name: `${method} ${url} ${statusCode}`,
              size,
            }),
          );
        }
      }
    }
  } else {
    header = 'Resources';

    for (const [url, byStatusCode] of Object.entries(apiStatistics.resources)) {
      for (const [statusCode, {count, duration, size}] of Object.entries(byStatusCode)) {
        items.push(renderApiStatisticsItem({count, duration, name: `${url} ${statusCode}`, size}));
      }
    }
  }

  return createSafeHtmlWithoutSanitize`<article class="test-details">
  <p class="test-details__path"></p>
  <h2 class="test-details__title">${header}</h2>
  <div role="tabpanel">
    <article class="overview">${items.join('')}</article>
  </div>
</article>`;
}
