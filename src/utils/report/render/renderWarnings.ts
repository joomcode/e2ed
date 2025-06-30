import {createSafeHtmlWithoutSanitize, sanitizeHtml} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders report warnings.
 * @internal
 */
export const renderWarnings = (warnings: readonly string[]): SafeHtml => {
  if (warnings.length === 0) {
    return sanitizeHtml``;
  }

  const renderedWarnings = warnings.map(
    (warning) => sanitizeHtml`<div class="__error">${warning}</div>`,
  );

  return createSafeHtmlWithoutSanitize`<div class="warnings">${renderedWarnings.join('')}</div>`;
};
