import { Route } from './Route';
export class PageRoute extends Route {
    getOrigin(params) {
        const { E2ED_ORIGIN } = process.env;
        if (E2ED_ORIGIN) {
            return E2ED_ORIGIN.replace(/\/+$/, '');
        }
        return `http://localhost`;
    }
}
