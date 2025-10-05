import {List} from '../client';
import {getContentFromRenderedElement} from '../getContentFromRenderedElement';
import {getCspHash} from '../getCspHash';

import {Favicon} from './Favicon';
import {Script} from './Script';
import {Style} from './Style';

declare const jsx: JSX.Runtime;

type Props = Readonly<{imgCspHosts: string; reportFileName: string}>;

/**
 * Renders tag `<head>`.
 * @internal
 */
export const Head: JSX.Component<Props> = ({imgCspHosts, reportFileName}) => {
  const renderedScript = <Script />;
  const renderedStyle = <Style />;

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

  const safeCspContent = <List separator=" " withoutSanitize={cspContent} />;

  return (
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={reportFileName} />
      <meta http-equiv="Content-Security-Policy" content={String(safeCspContent)} />
      <title>{reportFileName}</title>
      <Favicon />
      {renderedStyle}
      {renderedScript}
    </head>
  );
};
