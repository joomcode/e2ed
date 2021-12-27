import {
  e2edCreateSafeHtmlWithoutSanitize as clientE2edCreateSafeHtmlWithoutSanitize,
  e2edSanitizeHtml as clientE2edSanitizeHtml,
} from './sanitizeHtml';

import type {SafeHtml, TestRunError} from '../../../types/internal';

const e2edCreateSafeHtmlWithoutSanitize = clientE2edCreateSafeHtmlWithoutSanitize;
const e2edSanitizeHtml = clientE2edSanitizeHtml;

/**
 * Render TestRun errors as simple message.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edRenderTestRunErrors(errors: readonly TestRunError[]): SafeHtml {
  const errorHtmls: SafeHtml[] = [];

  for (const error of errors) {
    const {message} = error;
    const errorHtml = e2edSanitizeHtml`
<div class="status-detail status-detail_status_failed">
  <div class="status-detail__content">n
    <code class="status-detail__button-text">
      ${message}
    </code>
  </div>
</div>
`;

    errorHtmls.push(errorHtml);
  }

  return e2edCreateSafeHtmlWithoutSanitize`${errorHtmls.join('')}`;
}
