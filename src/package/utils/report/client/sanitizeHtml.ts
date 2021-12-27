import type {SafeHtml} from '../../../types/internal';

/**
 * Create SafeHtml from string without sanitize.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edCreateSafeHtmlWithoutSanitize(
  strings: readonly string[],
  ...values: readonly unknown[]
): SafeHtml {
  const key = Symbol.for('e2ed SafeHtml key');
  const parts: string[] = [];

  for (let index = 0; index < values.length; index += 1) {
    const string = strings[index];
    const value = String(values[index]);

    parts.push(string, value);
  }

  parts.push(strings[strings.length - 1]);

  const html = parts.join('');
  // eslint-disable-next-line no-new-wrappers
  const safeHtml = new String(html) as SafeHtml;

  Object.defineProperty(safeHtml, key, {value: undefined});

  return safeHtml;
}

/**
 * Sanitize HTML code (simple protection against XSS attacks).
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edSanitizeHtml(
  strings: readonly string[],
  ...values: readonly unknown[]
): SafeHtml {
  const key = Symbol.for('e2ed SafeHtml key');

  const sanitizeValue = (value: unknown): string =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const parts: string[] = [];

  for (let index = 0; index < values.length; index += 1) {
    const string = strings[index];
    const value = values[index];

    const valueIsSafeHtml = typeof value === 'object' && value !== null && key in value;

    const safeValue = valueIsSafeHtml ? String(value) : sanitizeValue(value);

    parts.push(string, safeValue);
  }

  parts.push(strings[strings.length - 1]);

  const html = parts.join('');

  return e2edCreateSafeHtmlWithoutSanitize`${html}`;
}
