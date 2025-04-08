import type {ObjectEntries} from '../../types/internal';

/**
 * Get typed array of key-value pairs  (like `Object.entries`, but typed).
 */
export const getEntries = <Value extends {}>(
  value: Value,
): readonly ObjectEntries<Value>[number][] => Object.entries(value) as ObjectEntries<Value>;
