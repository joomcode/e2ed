import { RequestHook } from 'testcafe';
import { applyHeadersMapper } from './applyHeadersMapper';
import { log } from './log';
import { wrapInTestRunTracker } from './wrapInTestRunTracker';
export class SetHeadersRequestHook extends RequestHook {
    url;
    options;
    constructor(url, options) {
        super([url], { includeHeaders: true });
        this.url = url;
        this.options = options;
        this.resetMethods(this.onRequest, this._onConfigureResponse);
    }
    async onRequest(event) {
        const { headers } = event.requestOptions;
        applyHeadersMapper(headers, this.options.mapRequestHeaders);
        log(`Map request headers for ${this.url}`, { headers });
    }
    async onResponse() {
    }
    async _onConfigureResponse(event) {
        await super._onConfigureResponse(event);
        const { headers } = event._requestContext.destRes;
        applyHeadersMapper(headers, this.options.mapResponseHeaders);
        log(`Map response headers for ${this.url}`, { headers });
    }
    resetMethods(onRequest, _onConfigureResponse) {
        this.onRequest = onRequest;
        this._onConfigureResponse = _onConfigureResponse;
    }
}
SetHeadersRequestHook.prototype.resetMethods = wrapInTestRunTracker(SetHeadersRequestHook.prototype.resetMethods);
