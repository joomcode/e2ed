import { Route } from './Route';
export declare abstract class PageRoute<Params> extends Route<Params> {
    getOrigin(params?: Params): string;
}
