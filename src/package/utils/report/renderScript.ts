import {domContentLoadedCallback} from './client/domContentLoadedCallback';
import {initialScript} from './client/initialScript';
import {renderScriptGlobalFunctions} from './renderScriptGlobalFunctions';

/**
 * Render tag <script> with all report JavaScript code.
 * @internal
 */
export const renderScript = (): string => `<script>
${renderScriptGlobalFunctions()};
document.addEventListener("DOMContentLoaded", ${domContentLoadedCallback.toString()});
(${initialScript.toString()})();
</script>`;
