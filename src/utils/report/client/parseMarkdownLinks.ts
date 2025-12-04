import {
  createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize,
  sanitizeHtml as clientSanitizeHtml,
} from './sanitizeHtml';

import type {SafeHtml} from '../../../types/internal';

const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;
const sanitizeHtml = clientSanitizeHtml;

/**
 * Parses markdown links in template string and returns sanitized HTML.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export const parseMarkdownLinks = (
  stringParts: readonly string[],
  ...values: readonly unknown[]
): SafeHtml => {
  const sanitizedHtml = sanitizeHtml(stringParts, ...values);

  const htmlWithLinks = sanitizedHtml.replace(
    /\[(?<name>[^\]]+)\]\((?<href>[^)]+)\)/g,
    '<a href="$<href>" rel="noreferrer" target="_blank">$<name></a>',
  );

  return createSafeHtmlWithoutSanitize`${htmlWithLinks}`;
};
