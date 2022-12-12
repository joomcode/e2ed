import {createSafeHtmlWithoutSanitize, sanitizeHtml} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders report errors.
 * @internal
 */
export const renderErrors = (errors: readonly string[]): SafeHtml => {
  if (errors.length === 0) {
    return sanitizeHtml``;
  }

  const renderedErrors = errors.map((error) => sanitizeHtml`<div class="__error">${error}</div>`);

  return createSafeHtmlWithoutSanitize`<div class="errors">${renderedErrors.join('')}</div>`;
};
