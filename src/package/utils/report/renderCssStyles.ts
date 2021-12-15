import {readFileSync} from 'fs';
import {join} from 'path';

import {E2ED_PACKAGE_DIRECTORY_PATH, READ_FILE_OPTIONS} from '../../constants/internal';

/**
 * Render tag <style> with all CSS styles.
 * @internal
 */
export const renderCssStyles = (): string => {
  const pathToCss = join(E2ED_PACKAGE_DIRECTORY_PATH, 'styles', 'report.css');

  const cssString = readFileSync(pathToCss, READ_FILE_OPTIONS);

  return `<style>${cssString}</style>`;
};
