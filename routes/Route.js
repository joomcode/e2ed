"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
class Route {
    isMatchUrl(url) {
        return url.includes(this.getPath());
    }
    getMethod(params) {
        return 'GET';
    }
    getUrl(params) {
        return `${this.getOrigin(params)}${this.getPath(params)}`;
    }
}
exports.Route = Route;
