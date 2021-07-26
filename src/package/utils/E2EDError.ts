import {getContextLength} from '../context/getContextLength';

import {print} from './print';

export class E2EDError extends Error {
  constructor(message: string, params: Record<string, unknown>) {
    const printedObject = {params, contextLength: getContextLength()};
    const printedString = print(printedObject);

    super(`${message} ${printedString}`);

    Object.assign(this, params);
  }
}
