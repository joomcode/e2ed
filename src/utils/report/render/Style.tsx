import {readFileSync} from 'node:fs';
import {join} from 'node:path';

import {INSTALLED_E2ED_DIRECTORY_PATH, READ_FILE_OPTIONS} from '../../../constants/internal';

import {SafeHtml} from '../client';

declare const jsx: JSX.Runtime;

/**
 * Renders tag `<style>` with all CSS styles.
 * @internal
 */
export const Style: JSX.Component = () => {
  const pathToCss = join(INSTALLED_E2ED_DIRECTORY_PATH, 'styles', 'report.css');

  const cssString = readFileSync(pathToCss, READ_FILE_OPTIONS);

  return (
    <style>
      <SafeHtml withoutSanitize={cssString} />
    </style>
  );
};
