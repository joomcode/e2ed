import {inspect} from 'util';

import {DEFAULT_INSPECT_OPTIONS} from '../constants/internal';

/**
 * Return string representation of arbitrary value.
 */
export const valueToString = (value: unknown): string => inspect(value, DEFAULT_INSPECT_OPTIONS);
