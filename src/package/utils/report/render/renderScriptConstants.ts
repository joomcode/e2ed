import {TEST_STATUS_TO_STATUS_STRING} from '../../../constants/internal';

import {createSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render JS constants for report page.
 * @internal
 */
export const renderScriptConstants = (): SafeHtml => {
  const TEST_STATUS_TO_STATUS_STRING_JSON = JSON.stringify(TEST_STATUS_TO_STATUS_STRING);

  return createSafeHtmlWithoutSanitize`
const TEST_STATUS_TO_STATUS_STRING = ${TEST_STATUS_TO_STATUS_STRING_JSON};
`;
};
