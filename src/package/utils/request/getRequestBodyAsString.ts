/**
 * Get requestBody as string by requestBody.
 * @internal
 */
export const getRequestBodyAsString = (requestBody: unknown): string => {
  if (requestBody === undefined) {
    return '';
  }

  if (typeof requestBody === 'string') {
    return requestBody;
  }

  return JSON.stringify(requestBody);
};
