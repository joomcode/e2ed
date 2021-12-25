import {e2edCreateSafeHtmlWithoutSanitize, e2edSanitizeHtml} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render report errors.
 * @internal
 */
export const renderErrors = (errors: readonly string[]): SafeHtml => {
  if (errors.length === 0) {
    return e2edSanitizeHtml``;
  }

  const renderedErrors = errors.map(
    (error) => e2edSanitizeHtml`<div class="__error">${error}</div>`,
  );

  return e2edCreateSafeHtmlWithoutSanitize`<div class="errors">${renderedErrors.join('')}</div>`;
};
