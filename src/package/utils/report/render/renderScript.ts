import {
  domContentLoadedCallback,
  e2edCreateSafeHtmlWithoutSanitize,
  initialScript,
} from '../client';

import {renderScriptGlobalFunctions} from './renderScriptGlobalFunctions';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render tag <script> with all report JavaScript code.
 * @internal
 */
export const renderScript = (): SafeHtml => e2edCreateSafeHtmlWithoutSanitize`
<script>
'use strict';
${renderScriptGlobalFunctions()};
document.addEventListener("DOMContentLoaded", ${domContentLoadedCallback.toString()});
(${initialScript.toString()})();
</script>`;
