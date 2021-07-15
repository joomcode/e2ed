import type { Route } from './Route';
export declare abstract class Page<Params = unknown> {
    abstract readonly route: Route<Params>;
    willNavigateTo(params: Params): Promise<Params>;
}
