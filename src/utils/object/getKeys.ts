/**
 * Get typed array of keys (like `Object.keys`, but typed).
 */
export const getKeys = <Value extends {}>(value: Value): readonly (keyof Value)[] =>
  Object.keys(value) as (keyof Value)[];
