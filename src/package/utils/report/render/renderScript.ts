import {
  domContentLoadedCallback,
  e2edCreateSafeHtmlWithoutSanitize,
  initialScript,
} from '../client';

import {renderScriptConstants} from './renderScriptConstants';
import {renderScriptGlobalFunctions} from './renderScriptGlobalFunctions';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render tag <script> with all report JavaScript code.
 * @internal
 */
export const renderScript = (): SafeHtml => e2edCreateSafeHtmlWithoutSanitize`
<script>
'use strict';
${renderScriptConstants()}
${renderScriptGlobalFunctions()};
document.addEventListener("DOMContentLoaded", ${domContentLoadedCallback.toString()});
(${initialScript.toString()})();
</script>`;
