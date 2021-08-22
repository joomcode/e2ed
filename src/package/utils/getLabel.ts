/**
 * Get  run label for logs.
 * @internal
 */
export const getLabel = (label: string | undefined): string => (label ? `[${label}]` : '');
