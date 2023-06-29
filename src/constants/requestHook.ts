/**
 * Request hook options that includes body and headers in response event.
 */
export const INCLUDE_BODY_AND_HEADERS_IN_RESPONSE_EVENT = {
  includeBody: true,
  includeHeaders: true,
} as const;

/**
 * Request hook options that includes headers in response event.
 */
export const INCLUDE_HEADERS_IN_RESPONSE_EVENT = {includeHeaders: true} as const;

/**
 * Key for id of TestCafe's request hook context.
 */
export const REQUEST_HOOK_CONTEXT_ID_KEY = Symbol('Key for id of request hook context');

/**
 * Key for TestCafe's request hook context on request hook events.
 */
export const REQUEST_HOOK_CONTEXT_KEY = Symbol('Key for request hook context');
