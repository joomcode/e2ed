import {assertValueIsDefined as clientAssertValueIsDefined} from './assertValueIsDefined';

import type {SafeHtml} from '../../../types/internal';

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;

/**
 * Creates SafeHtml from string without sanitize.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function createSafeHtmlWithoutSanitize(
  stringParts: readonly string[],
  ...values: readonly unknown[]
): SafeHtml {
  const key = Symbol.for('e2ed:SafeHtml:key');
  const parts: string[] = [];

  for (let index = 0; index < values.length; index += 1) {
    const stringPart = stringParts[index];

    assertValueIsDefined(stringPart);

    const value = String(values[index]);

    parts.push(stringPart, value);
  }

  const lastStringPart = stringParts[stringParts.length - 1];

  assertValueIsDefined(lastStringPart);

  parts.push(lastStringPart);

  const html = parts.join('');
  // eslint-disable-next-line no-new-wrappers
  const safeHtml = new String(html) as SafeHtml;

  Object.defineProperty(safeHtml, key, {value: undefined});

  return safeHtml;
}

/**
 * Sanitizes HTML code (simple protection against XSS attacks).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function sanitizeHtml(
  stringParts: readonly string[],
  ...values: readonly unknown[]
): SafeHtml {
  const key = Symbol.for('e2ed:SafeHtml:key');

  const sanitizeValue = (value: unknown): string =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const parts: string[] = [];

  for (let index = 0; index < values.length; index += 1) {
    const stringPart = stringParts[index];

    assertValueIsDefined(stringPart);

    const value = values[index];

    const valueIsSafeHtml = typeof value === 'object' && value !== null && key in value;

    const safeValue = valueIsSafeHtml ? String(value) : sanitizeValue(value);

    parts.push(stringPart, safeValue);
  }

  const lastStringPart = stringParts[stringParts.length - 1];

  assertValueIsDefined(lastStringPart);

  parts.push(lastStringPart);

  const html = parts.join('');

  return createSafeHtmlWithoutSanitize`${html}`;
}

/**
 * Sanitize JSON string (simple protection against XSS attacks).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function sanitizeJson(json: string): string {
  return json.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
