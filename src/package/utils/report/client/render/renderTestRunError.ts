import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import type {SafeHtml} from '../../../../types/internal';

const sanitizeHtml = clientSanitizeHtml;

/**
 * Render TestRun error as simple message.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderTestRunError(error: string | undefined): SafeHtml {
  if (!error) {
    return sanitizeHtml``;
  }

  return sanitizeHtml`
<div class="status-detail status-detail_status_failed">
  <div class="status-detail__content">
    <code class="status-detail__button-text">${error}</code>
  </div>
</div>
`;
}
