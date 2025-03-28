import {createSafeHtmlWithoutSanitize, initialScript} from '../client';

import {renderScriptConstants} from './renderScriptConstants';
import {renderScriptFunctions} from './renderScriptFunctions';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders tag `<script>` with all report JavaScript code.
 * @internal
 */
export const renderScript = (): SafeHtml => createSafeHtmlWithoutSanitize`
<script async type="module">
${renderScriptConstants()};
${renderScriptFunctions()};
${initialScript.name}();
</script>`;
