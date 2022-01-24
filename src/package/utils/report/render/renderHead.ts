import {createSafeHtmlWithoutSanitize, sanitizeHtml} from '../client';
import {getCspHash} from '../getCspHash';

import {renderCssStyles} from './renderCssStyles';
import {renderFavicon} from './renderFavicon';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render tag <head>.
 * @internal
 */
export const renderHead = (name: string): SafeHtml => {
  const cspHash = getCspHash('');
  const safeCspHash = createSafeHtmlWithoutSanitize`${cspHash}`;

  return sanitizeHtml`
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${name}" />
  <meta
    http-equiv="_Content-Security-Policy"
    content="default-src 'self'; img-src 'self' data:; script-src '${safeCspHash}';"
  />
  <title>${name}</title>
  ${renderFavicon()}
  ${renderCssStyles()}
</head>`;
};
