import {readFileSync} from 'node:fs';
import {join} from 'node:path';

import {INSTALLED_E2ED_DIRECTORY_PATH, READ_FILE_OPTIONS} from '../../../constants/internal';

import {createSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders tag `<style>` with all CSS styles.
 * @internal
 */
export const renderStyle = (): SafeHtml => {
  const pathToCss = join(INSTALLED_E2ED_DIRECTORY_PATH, 'styles', 'report.css');

  const cssString = readFileSync(pathToCss, READ_FILE_OPTIONS);

  return createSafeHtmlWithoutSanitize`<style>${cssString}</style>`;
};
