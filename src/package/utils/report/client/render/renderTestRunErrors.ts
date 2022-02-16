import {
  createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize,
  sanitizeHtml as clientSanitizeHtml,
} from '../sanitizeHtml';

import type {SafeHtml, TestRunError} from '../../../../types/internal';

const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;
const sanitizeHtml = clientSanitizeHtml;

/**
 * Render TestRun errors as simple message.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderTestRunErrors(errors: readonly TestRunError[]): SafeHtml {
  const errorHtmls: SafeHtml[] = [];

  for (const error of errors) {
    const {message} = error;
    const errorHtml = sanitizeHtml`
<div class="status-detail status-detail_status_failed">
  <div class="status-detail__content">
    <code class="status-detail__button-text">${message}</code>
  </div>
</div>
`;

    errorHtmls.push(errorHtml);
  }

  return createSafeHtmlWithoutSanitize`${errorHtmls.join('')}`;
}
