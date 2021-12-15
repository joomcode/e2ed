import {domContentLoadedCallback} from './domContentLoadedCallback';
import {renderScriptGlobalFunctions} from './renderScriptGlobalFunctions';

/**
 * Render tag <script> with all report JavaScript code.
 * @internal
 */
export const renderScript = (): string => `<script>
${renderScriptGlobalFunctions()}
document.addEventListener("DOMContentLoaded", ${domContentLoadedCallback.toString()})
</script>`;
