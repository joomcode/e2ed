import {readFileSync} from 'node:fs';
import {join} from 'node:path';

import {INSTALLED_E2ED_DIRECTORY_PATH, READ_FILE_OPTIONS} from '../../../constants/internal';

import {createSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders SVG logo for report page.
 * @internal
 */
export const renderLogo = (): SafeHtml => {
  const pathToLogo = join(INSTALLED_E2ED_DIRECTORY_PATH, 'logo.svg');

  const logoString = readFileSync(pathToLogo, READ_FILE_OPTIONS);

  return createSafeHtmlWithoutSanitize`
<a class="logo" href="https://www.npmjs.com/package/e2ed" aria-label="e2ed package" rel="noreferrer" target="_blank" title="e2ed package">${logoString}</a>`;
};
