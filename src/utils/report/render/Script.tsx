import {initialScript} from '../client';

import {ScriptFunctions} from './ScriptFunctions';
import {ScriptGlobals} from './ScriptGlobals';

declare const jsx: JSX.Runtime;

/**
 * Renders tag `<script>` with all report JavaScript code.
 * @internal
 */
export const Script: JSX.Component = () => (
  <script async type="module">
    <ScriptGlobals />
    <ScriptFunctions />
    {initialScript.name}(); //# sourceURL=fullScript.js
  </script>
);
