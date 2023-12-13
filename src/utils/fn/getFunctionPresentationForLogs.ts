import {valueToString, wrapStringForLogs} from '../valueToString';

import {getFunctionCode} from './getFunctionCode';

import type {Fn, StringForLogs} from '../../types/internal';

/**
 * Get custom function string presentation for logs.
 */
export const getFunctionPresentationForLogs = (fn: Fn): StringForLogs | string => {
  const {length, name} = fn;
  const code = getFunctionCode(fn);
  const withName = name ? `: ${name}` : '';
  const printedValue = {code: wrapStringForLogs(code), length, name: name || 'anonymous'};
  const printedString = valueToString(printedValue);

  return wrapStringForLogs(`[Function${withName}] ${printedString}`);
};
