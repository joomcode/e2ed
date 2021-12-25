import type {Brand} from './brand';

/**
 * Sanitized HTML for rendering on HTML-page (like report).
 * @internal
 */
export type SafeHtml = Brand<String, 'SafeHtml'>; // eslint-disable-line @typescript-eslint/ban-types
