/**
 * `Clear` context function.
 */
export type Clear = (this: void) => void;

/**
 * Get value from context.
 */
export type Get<Type> = (this: void) => Type | undefined;

/**
 * Get value from context with default value.
 */
export type GetWithDefaultValue<Type> = (this: void) => Type;

/**
 * Set value to context.
 */
export type Set<Type> = (this: void, value: Type) => void;
