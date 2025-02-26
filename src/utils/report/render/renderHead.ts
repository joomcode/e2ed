import {createSafeHtmlWithoutSanitize, sanitizeHtml} from '../client';
import {getContentFromRenderedElement} from '../getContentFromRenderedElement';
import {getCspHash} from '../getCspHash';

import {renderFavicon} from './renderFavicon';
import {renderScript} from './renderScript';
import {renderStyle} from './renderStyle';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders tag `<head>`.
 * @internal
 */
export const renderHead = (reportFileName: string, imgCspHosts: string): SafeHtml => {
  const renderedScript = renderScript();
  const renderedStyle = renderStyle();

  const scriptContent = getContentFromRenderedElement(renderedScript);
  const styleContent = getContentFromRenderedElement(renderedStyle);

  const cspScriptHash = getCspHash(scriptContent);
  const cspStyleHash = getCspHash(styleContent);

  const cspContent = [
    "default-src 'self';",
    `img-src 'self' data: ${imgCspHosts};`,
    `script-src '${cspScriptHash}';`,
    `style-src '${cspStyleHash}';`,
  ];

  const safeCspContent = createSafeHtmlWithoutSanitize`${cspContent.join(' ')}`;

  return sanitizeHtml`
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${reportFileName}" />
  <meta http-equiv="Content-Security-Policy" content="${safeCspContent}" />
  <title>${reportFileName}</title>
  ${renderFavicon()}
  ${renderedStyle}
  ${renderedScript}
</head>`;
};
