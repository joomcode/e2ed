import {DEFAULT_INSPECT_OPTIONS} from 'e2e/constants';
import {inspect} from 'util';

import {context} from './context';

export class E2EUtilsError extends Error {
  constructor(message: string, params: Record<string, unknown>) {
    const printedObject = {params, fullContext: context.getFullContext()};
    const printedString = inspect(printedObject, DEFAULT_INSPECT_OPTIONS);

    super(`${message} ${printedString}`);

    Object.assign(this, params);
  }
}
