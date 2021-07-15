"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoute = void 0;
const Route_1 = require("./Route");
class ApiRoute extends Route_1.Route {
    getOrigin() {
        return process.env.E2ED_API_ORIGIN || 'http://localhost';
    }
}
exports.ApiRoute = ApiRoute;
