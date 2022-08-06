import {assertValueIsTrue} from '../asserts';

import type {SafeHtml} from '../../types/internal';

/**
 * Get element content (innerHTML) from rendered element.
 * @internal
 */
export const getContentFromRenderedElement = (renderedElement: SafeHtml): string => {
  const contentWithTags = String(renderedElement).trim();

  assertValueIsTrue(contentWithTags.startsWith('<'), 'contentWithTags starts with tag', {
    contentWithTags,
  });
  assertValueIsTrue(contentWithTags.endsWith('>'), 'contentWithTags ends with tag', {
    contentWithTags,
  });

  const openTagIndex = contentWithTags.indexOf('>');
  const closeTagIndex = contentWithTags.lastIndexOf('<');

  return contentWithTags.slice(openTagIndex + 1, closeTagIndex);
};
