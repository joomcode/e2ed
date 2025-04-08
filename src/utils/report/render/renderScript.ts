import {createSafeHtmlWithoutSanitize, initialScript} from '../client';

import {renderScriptFunctions} from './renderScriptFunctions';
import {renderScriptGlobals} from './renderScriptGlobals';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders tag `<script>` with all report JavaScript code.
 * @internal
 */
export const renderScript = (): SafeHtml => createSafeHtmlWithoutSanitize`
<script async type="module">
${renderScriptGlobals()};
${renderScriptFunctions()};
${initialScript.name}();
</script>`;
