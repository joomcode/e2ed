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

  void safeCspHash;

  return sanitizeHtml`
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${name}" />
  <meta
    http-equiv="Content-Security-Policy"
content="default-src 'self'; img-src 'self' data:; script-src 'sha256-thIX47WEDVDJxxP4E79NCaP6xBxd+AC060mJ6fNq9rg='; style-src 'sha256-Hgt5+lP9F1EnAc34JcU9giyeXmWgs8AkHn+BwHVxA7Q=';"
  />
  <title>${name}</title>
  ${renderFavicon()}
  ${renderCssStyles()}
</head>`;
};
