import {createSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

type Props = Readonly<{retryIndex: number}>;

/**
 * Renders metadata of whole `e2ed` run.
 * @internal
 */
export const renderMetadata = ({retryIndex}: Props): SafeHtml => createSafeHtmlWithoutSanitize`
<article class="retry" id="retry${retryIndex}" hidden>
  <h3 class="__title">Metadata</h3>
  <button aria-selected="false" class="test-button" role="tab">Pages statistics</button>
  <button aria-selected="false" class="test-button" role="tab">Requests statistics</button>
  <button aria-selected="false" class="test-button" role="tab">Resources statistics</button>
</article>`;
