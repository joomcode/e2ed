import {getContextLength} from '../context/getContextLength';

import {valueToString} from './valueToString';

export class E2EDError extends Error {
  constructor(message: string, params: Record<string, unknown>) {
    const printedObject = {params, contextLength: getContextLength()};
    const printedString = valueToString(printedObject);

    super(`${message} ${printedString}`);

    Object.assign(this, params);
  }
}
