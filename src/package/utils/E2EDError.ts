import {logContext} from '../hooks';

import {valueToString} from './valueToString';

export class E2EDError extends Error {
  constructor(message: string, params: Record<string, unknown>) {
    const printedObject = {params, context: logContext()};
    const printedString = valueToString(printedObject);

    super(`${message} ${printedString}`);

    Object.assign(this, params);
  }
}
