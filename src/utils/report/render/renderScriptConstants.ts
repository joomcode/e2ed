import {createSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render JS constants for report page.
 * @internal
 */
export const renderScriptConstants = (): SafeHtml => createSafeHtmlWithoutSanitize`
const reportClientState = {};
`;
