import { Route } from './Route';
export class ApiRoute extends Route {
    getOrigin() {
        return process.env.E2ED_API_ORIGIN || 'http://localhost';
    }
}
