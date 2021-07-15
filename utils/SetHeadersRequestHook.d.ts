import { RequestHook } from 'testcafe';
import type { Headers, MapOptions } from '../types';
declare type RequestEvent = Readonly<{
    requestOptions: {
        headers: Headers;
    };
}>;
declare type ResponseEvent = Readonly<{
    setHeader(name: string, value: string): Promise<void>;
    removeHeader(name: string): Promise<void>;
    _requestContext: {
        destRes: {
            headers: Headers;
        };
    };
}>;
export declare class SetHeadersRequestHook extends RequestHook {
    url: string;
    options: MapOptions;
    constructor(url: string, options: MapOptions);
    onRequest(event: RequestEvent): Promise<void>;
    onResponse(): Promise<void>;
    _onConfigureResponse(event: ResponseEvent): Promise<void>;
    resetMethods(onRequest: SetHeadersRequestHook['onRequest'], _onConfigureResponse: SetHeadersRequestHook['_onConfigureResponse']): void;
}
export {};
