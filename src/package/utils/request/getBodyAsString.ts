/**
 * Get request or response body as string by original body.
 * @internal
 */
export const getBodyAsString = (originalBody: unknown, bodyIsInJsonFormat: boolean): string => {
  if (originalBody === undefined) {
    return '';
  }

  if (typeof originalBody === 'string') {
    return originalBody;
  }

  return bodyIsInJsonFormat ? JSON.stringify(originalBody) : String(originalBody);
};
