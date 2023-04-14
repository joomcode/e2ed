import {createSafeHtmlWithoutSanitize, sanitizeHtml} from '../client';
import {getContentFromRenderedElement} from '../getContentFromRenderedElement';
import {getCspHash} from '../getCspHash';

import {renderFavicon} from './renderFavicon';
import {renderScript} from './renderScript';
import {renderStyle} from './renderStyle';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders tag <head>.
 * @internal
 */
export const renderHead = (reportFileName: string): SafeHtml => {
  const renderedScript = renderScript();
  const renderedStyle = renderStyle();

  const scriptContent = getContentFromRenderedElement(renderedScript);
  const styleContent = getContentFromRenderedElement(renderedStyle);

  const cspStyleHash = getCspHash(styleContent);
  const cspScriptHash = getCspHash(scriptContent);

  const safeCspStyleHash = createSafeHtmlWithoutSanitize`${cspStyleHash}`;
  const safeCspScriptHash = createSafeHtmlWithoutSanitize`${cspScriptHash}`;

  return sanitizeHtml`
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${reportFileName}" />
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'self'; img-src 'self' data:; script-src 'sha256-U2b0QBOORMKiqctoYx0EN8oqYd6jdSh6Tr6qnpVPa3M=' '${safeCspScriptHash}'; style-src '${safeCspStyleHash}';"
  />
  <title>${reportFileName}</title>
  ${renderFavicon()}
  ${renderedStyle}
  <script type="plain/text"></script>
  ${renderedScript}
</head>`;
};
