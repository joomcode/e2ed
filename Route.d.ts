import type { Method } from './types';
export declare abstract class Route<Params = unknown> {
    isMatchUrl(url: string): boolean;
    getMethod(params?: Params): Method;
    abstract getOrigin(params?: Params): string;
    abstract getPath(params?: Params): string;
    getUrl(params?: Params): string;
}
