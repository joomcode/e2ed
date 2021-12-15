import {renderCssStyles} from './renderCssStyles';
import {renderFavicon} from './renderFavicon';
import {renderScript} from './renderScript';

/**
 * Render tag <head>.
 * @internal
 */
export const renderHead = (): string => `<head>
<meta charset="utf-8" />
<title>e2ed-report</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="e2ed-report" />
${renderFavicon()}
${renderCssStyles()}
${renderScript()}
</head>`;
