/// <reference types="node" />
import type { Headers, Method, Query } from '../types';
declare type Response<Data> = Readonly<{
    statusCode: number;
    headers: Headers;
    data: Data;
}>;
declare type Options<Data> = Readonly<{
    url: string;
    query?: Query;
    method?: Method;
    headers?: Headers;
    data?: string | Record<string, unknown>;
    timeout?: number;
    maxRetriesCount?: number;
    isNeedRetry?: (response: Response<Data>) => boolean;
}>;
export declare const request: <Data = unknown>({ url, query, method, headers, data, timeout, maxRetriesCount, isNeedRetry, }: Readonly<{
    url: string;
    query?: Query | undefined;
    method?: Method | undefined;
    headers?: Readonly<import("http").IncomingHttpHeaders> | undefined;
    data?: string | Record<string, unknown> | undefined;
    timeout?: number | undefined;
    maxRetriesCount?: number | undefined;
    isNeedRetry?: ((response: Readonly<{
        statusCode: number;
        headers: Readonly<import("http").IncomingHttpHeaders>;
        data: Data;
    }>) => boolean) | undefined;
}>) => Promise<Readonly<{
    statusCode: number;
    headers: Readonly<import("http").IncomingHttpHeaders>;
    data: Data;
}>>;
export {};
