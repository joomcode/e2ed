import {createSafeHtmlWithoutSanitize} from '../client';

import type {Attributes} from 'create-locator';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders attributes object to safe HTML string.
 * @internal
 */
export const renderAttributes = (attributes: object): SafeHtml => {
  const parts: string[] = [];

  for (const key of Object.keys(attributes)) {
    parts.push(`${key}="${(attributes as Attributes)[key]}"`);
  }

  return createSafeHtmlWithoutSanitize`${parts.join(' ')}`;
};
