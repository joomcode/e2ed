import {valueToString} from './valueToString';

export class E2EDError extends Error {
  constructor(message: string, params: Record<string, unknown>) {
    // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
    const hooks: typeof import('../hooks') = require('../hooks');

    const printedObject = {params, context: hooks.logContext()};
    const printedString = valueToString(printedObject);

    super(`${message} ${printedString}`);

    Object.assign(this, params);
  }
}
