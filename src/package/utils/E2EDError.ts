import {valueToString} from './valueToString';

type Params = Record<string, unknown>;

/**
 * e2ed's own Error class.
 */
export class E2EDError extends Error {
  constructor(message: string, params?: Params) {
    const printedString = valueToString(params);

    super(`${message} ${printedString}`);

    Object.assign(this, params);
  }
}
