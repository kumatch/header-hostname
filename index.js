
module.exports = function (headers) {
    headers = headers || {};
    var host = headers["x-forwarded-host"] || headers["host"];
    if (!host) {
        return undefined;
    }

    // IPv6 literal support
    var offset = host[0] === '[' ?
            (host.indexOf(']') + 1) : 0;
    var index = host.indexOf(':', offset);

    if (index >= 0) {
        return host.substring(0, index);
    } else {
        return host;
    }
};
