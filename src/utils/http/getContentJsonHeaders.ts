/**
 * Get Content-Length and Content-Type headers for JSON body.
 */
export const getContentJsonHeaders = (bodyAsString: string | undefined) =>
  ({
    'content-length': String(Buffer.byteLength(bodyAsString ?? '')),
    'content-type': 'application/json; charset=UTF-8',
  }) as const;
