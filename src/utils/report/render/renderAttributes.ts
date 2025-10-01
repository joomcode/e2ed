import {createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize} from '../client';

import type {Attributes} from 'create-locator';

import type {SafeHtml} from '../../../types/internal';

const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;

/**
 * Renders attributes object to safe HTML string.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderAttributes(attributes: Attributes): SafeHtml {
  const parts: string[] = [];

  for (const key of Object.keys(attributes)) {
    parts.push(`${key}="${attributes[key]}"`);
  }

  return createSafeHtmlWithoutSanitize`${parts.join(' ')}`;
}
