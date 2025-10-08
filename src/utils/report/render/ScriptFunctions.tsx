import {createSimpleLocator} from 'create-locator';

import {getDurationWithUnits} from '../../getDurationWithUnits';

import * as clientFunctions from '../client';

declare const jsx: JSX.Runtime;

/**
 * Renders JS client functions for report.
 * @internal
 */
export const ScriptFunctions: JSX.Component = () => {
  const functions = Object.values(clientFunctions).map((fn) => `var ${fn.name} = ${String(fn)};`);

  functions.push(`var createSimpleLocator = ${createSimpleLocator.toString()};`);
  functions.push(`var getDurationWithUnits = ${getDurationWithUnits.toString()};`);

  return <clientFunctions.List separator={'\n'} withoutSanitize={functions} />;
};
