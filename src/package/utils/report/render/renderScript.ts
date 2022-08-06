import {createSafeHtmlWithoutSanitize, domContentLoadedCallback, initialScript} from '../client';

import {renderScriptConstants} from './renderScriptConstants';
import {renderScriptFunctions} from './renderScriptFunctions';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render tag <script> with all report JavaScript code.
 * @internal
 */
export const renderScript = (): SafeHtml => createSafeHtmlWithoutSanitize`
<script>
'use strict'; {
${renderScriptConstants()};
${renderScriptFunctions()};
document.addEventListener("DOMContentLoaded", ${domContentLoadedCallback.toString()});
(${initialScript.toString()})();
}</script>`;
