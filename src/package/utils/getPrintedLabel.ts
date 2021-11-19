/**
 * Get run label string for printing in logs.
 * @internal
 */
export const getPrintedLabel = (label: string | undefined): string => (label ? `[${label}]` : '');
