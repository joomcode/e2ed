/**
 * Regexp that accept any url.
 */
export const ANY_URL_REGEXP = /.*/;

/**
 * Request hook options that includes body and headers in response event.
 */
export const INCLUDE_BODY_AND_HEADERS_IN_RESPONSE_EVENT = {includeBody: true, includeHeaders: true};

/**
 * Request hook options that includes headers in response event.
 */
export const INCLUDE_HEADERS_IN_RESPONSE_EVENT = {includeHeaders: true};

/**
 * Key for TestCafe's request hook context on request hook events.
 */
export const REQUEST_HOOK_CONTEXT_KEY = Symbol('Key for request hook context');
