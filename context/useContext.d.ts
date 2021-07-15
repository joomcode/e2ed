declare type Get<T> = () => T | undefined;
declare type Set<T> = (value: T) => void;
export declare const useContext: <T>() => [get: Get<T>, set: Set<T>];
export {};
