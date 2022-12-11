/**
 * Get Content-Length and Content-Type headers for JSON body.
 */
export const getContentJsonHeaders = (bodyAsString: string | undefined) =>
  ({
    'Content-Length': String(Buffer.byteLength(bodyAsString ?? '')),
    'Content-Type': 'application/json; charset=UTF-8',
  } as const);
