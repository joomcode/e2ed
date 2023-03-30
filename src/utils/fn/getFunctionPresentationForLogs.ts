import {valueToString, wrapStringForLogs} from '../valueToString';

import {getFunctionCode} from './getFunctionCode';

import type {Fn} from '../../types/internal';

/**
 * Get custom function string presentation for logs.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getFunctionPresentationForLogs = (fn: Fn): string | String => {
  const {length, name} = fn;
  const code = getFunctionCode(fn);
  const withName = name ? `: ${name}` : '';
  const printedValue = {code: wrapStringForLogs(code), length, name: name || 'anonymous'};
  const printedString = valueToString(printedValue);

  return wrapStringForLogs(`[Function${withName}] ${printedString}`);
};
