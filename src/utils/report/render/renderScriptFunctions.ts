import {createSimpleLocator} from 'create-locator';

import {getDurationWithUnits} from '../../getDurationWithUnits';

import * as clientFunctions from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders JS client functions for report.
 * @internal
 */
export const renderScriptFunctions = (): SafeHtml => {
  const functions = Object.values(clientFunctions).map((fn) => `var ${fn.name} = ${String(fn)};`);

  functions.push(`var createSimpleLocator = ${createSimpleLocator.toString()};`);
  functions.push(String(getDurationWithUnits));

  return clientFunctions.createSafeHtmlWithoutSanitize`${functions.join('\n')}`;
};
