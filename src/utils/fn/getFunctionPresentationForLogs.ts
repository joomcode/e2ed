import {valueToString} from '../valueToString';

import {getFunctionCode} from './getFunctionCode';

import type {Fn} from '../../types/internal';

/**
 * Get custom function string presentation for logs.
 */
export const getFunctionPresentationForLogs = (fn: Fn): string => {
  const {length, name} = fn;
  const code = getFunctionCode(fn);
  const withName = name ? `: ${name}` : '';
  const printedValue = {code, length, name: name || 'anonymous'};
  const printedString = valueToString(printedValue);

  return `[Function${withName}] ${printedString}`;
};
