import { Route } from './Route';
export declare abstract class ApiRoute<Params = unknown> extends Route<Params> {
    getOrigin(): string;
}
