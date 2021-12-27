import {E2ED_TEST_STATUS_TO_STATUS_STRING} from '../../../constants/internal';

import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render JS constants for report page.
 * @internal
 */
export const renderScriptConstants = (): SafeHtml => {
  const E2ED_TEST_STATUS_TO_STATUS_STRING_JSON = JSON.stringify(E2ED_TEST_STATUS_TO_STATUS_STRING);

  return e2edCreateSafeHtmlWithoutSanitize`
window.E2ED_TEST_STATUS_TO_STATUS_STRING = ${E2ED_TEST_STATUS_TO_STATUS_STRING_JSON};
`;
};
