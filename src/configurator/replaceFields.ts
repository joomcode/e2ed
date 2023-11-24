import {getReplacedObject} from './getReplacedObject';

import type {FieldReplacer} from '../types/internal';

/**
 * Recursively replaces fields in an object (for payloads of logs).
 */
export const replaceFields = <Value>(value: Value, replacer: FieldReplacer): Value => {
  const valueWrapper = {'': value};

  const replacedWrapper = getReplacedObject([], valueWrapper, replacer);

  return replacedWrapper[''];
};
