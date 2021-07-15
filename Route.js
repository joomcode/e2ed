export class Route {
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
