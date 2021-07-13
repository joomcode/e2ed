import {inspect} from 'util';

import {DEFAULT_INSPECT_OPTIONS} from '../constants';
import {getContextLength} from '../context';

export class E2EUtilsError extends Error {
  constructor(message: string, params: Record<string, unknown>) {
    const printedObject = {params, contextLength: getContextLength()};
    const printedString = inspect(printedObject, DEFAULT_INSPECT_OPTIONS);

    super(`${message} ${printedString}`);

    Object.assign(this, params);
  }
}
