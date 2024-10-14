/**
 * Get Content-Length and Content-Type headers for JSON body.
 */
export const getContentJsonHeaders = (
  bodyAsString: string | undefined,
): Readonly<{'content-length': string; 'content-type': 'application/json; charset=UTF-8'}> => ({
  'content-length': String(Buffer.byteLength(bodyAsString ?? '')),
  'content-type': 'application/json; charset=UTF-8',
});
