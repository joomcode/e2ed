import {e2edSanitizeHtml} from '../client';

import {renderCssStyles} from './renderCssStyles';
import {renderFavicon} from './renderFavicon';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render tag <head>.
 * @internal
 */
export const renderHead = (name: string): SafeHtml => e2edSanitizeHtml`
<head>
  <meta charset="utf-8" />
  <title>${name}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${name}" />
  ${renderFavicon()}
  ${renderCssStyles()}
</head>`;
