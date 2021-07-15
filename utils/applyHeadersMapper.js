const getCopyOfHeaders = (headers) => {
    const copyOfHeaders = { ...headers };
    for (const [key, value] of Object.entries(copyOfHeaders)) {
        if (Array.isArray(value)) {
            copyOfHeaders[key] = [...value];
        }
    }
    return copyOfHeaders;
};
export const applyHeadersMapper = (headers, mapper) => {
    if (mapper === undefined) {
        return;
    }
    const copyOfHeaders = getCopyOfHeaders(headers);
    const newHeaders = mapper(copyOfHeaders);
    const mutableHeaders = headers;
    for (const [key, value] of Object.entries(newHeaders)) {
        if (value === undefined) {
            delete mutableHeaders[key];
        }
        else {
            mutableHeaders[key] = value;
        }
    }
};
