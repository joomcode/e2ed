import {inspect} from 'util';

import {DEFAULT_INSPECT_OPTIONS} from '../constants';

export const print = (value: unknown): string => inspect(value, DEFAULT_INSPECT_OPTIONS);
