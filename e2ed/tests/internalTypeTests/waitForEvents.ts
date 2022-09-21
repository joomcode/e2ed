import {waitForRequest, waitForResponse} from 'e2ed';

// ok
void waitForRequest(() => false);

// ok
void waitForResponse(() => false);

// ok
void waitForRequest(() => false, {});

// ok
void waitForResponse(() => false, {});

// @ts-expect-error: wrong returned value
void waitForRequest(() => undefined, {});

// @ts-expect-error: wrong returned value
void waitForResponse(() => undefined, {});

// ok
void waitForRequest(() => Promise.resolve(true), {});

// ok
void waitForResponse(() => Promise.resolve(true), {});

// ok
void waitForRequest(() => false, {timeout: 10_000});

// ok
void waitForResponse(() => false, {timeout: 10_000});

// @ts-expect-error: unknown options property
void waitForRequest(() => false, {foo: 10_000});

// @ts-expect-error: unknown options property
void waitForResponse(() => false, {foo: 10_000});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
void waitForRequest(({method, query, requestBody, requestHeaders, url}) => true);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
void waitForResponse(({responseBody, responseHeaders, statusCode}) => true);
