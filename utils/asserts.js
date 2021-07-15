import { E2EDError } from './E2EDError';
export function assertValueIsDefined(value) {
    if (value === undefined) {
        throw new E2EDError('Asserted value is undefined', { value });
    }
}
