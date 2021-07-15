"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRoute = void 0;
const Route_1 = require("./Route");
class PageRoute extends Route_1.Route {
    getOrigin(params) {
        const { E2ED_ORIGIN } = process.env;
        if (E2ED_ORIGIN) {
            return E2ED_ORIGIN.replace(/\/+$/, '');
        }
        return `http://localhost`;
    }
}
exports.PageRoute = PageRoute;
