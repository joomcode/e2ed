declare type Cookie = Readonly<{
    name: string;
    value: string;
}>;
export declare const replaceCookie: (cookies: string[], cookie: Cookie) => string[];
export {};
