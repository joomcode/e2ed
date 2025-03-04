import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import type {RunError, SafeHtml} from '../../../../types/internal';

const sanitizeHtml = clientSanitizeHtml;

/**
 * Renders `TestRun` error as simple message.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderTestRunError(runError: RunError): SafeHtml {
  if (runError === undefined) {
    return sanitizeHtml``;
  }

  // eslint-disable-next-line no-control-regex
  const stylesRegexp = /((\\x1B\[)|(\x1B\[)|(\\u001b\[)|(\u001b\[))[\d;]*m/gi;

  const runErrorWithoutStyle = String(runError).replace(stylesRegexp, '');

  return sanitizeHtml`
<div class="status-detail status-detail_status_failed">
  <div class="status-detail__content">
    <code class="status-detail__button-text">${runErrorWithoutStyle}</code>
  </div>
</div>
`;
}
