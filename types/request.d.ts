/// <reference types="node" />
import type { IncomingHttpHeaders } from 'http';
export declare type Headers = Readonly<IncomingHttpHeaders>;
export declare type MapHeaders = (headers: Headers) => Partial<Headers>;
export declare type MapOptions = Readonly<{
    mapRequestHeaders?: MapHeaders;
    mapResponseHeaders?: MapHeaders;
}>;
export declare type Method = 'HEAD' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
export declare type Query = Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined>;
