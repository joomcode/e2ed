/**
 * Get request or response body as string by original body.
 * @internal
 */
export const getBodyAsString = (originalBody: unknown, isBodyInJsonFormat: boolean): string => {
  if (originalBody === undefined) {
    return '';
  }

  if (typeof originalBody === 'string') {
    return originalBody;
  }

  return isBodyInJsonFormat ? JSON.stringify(originalBody) : String(originalBody);
};
