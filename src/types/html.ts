import type {Brand} from './brand';

/**
 * Sanitized HTML for rendering on HTML-page (like report).
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type SafeHtml = Brand<String, 'SafeHtml'>;
