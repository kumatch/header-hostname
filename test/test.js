var assert = require("power-assert");
var headerHostname = require("..");

var results = {
    "example.com": "example.com",
    "example.com:8080": "example.com",
    "foo.bar.example.com": "foo.bar.example.com",
    "foo.bar.example.com:8081": "foo.bar.example.com",

    "[1001:1002::1003:1004:1005:1006:1007]": "[1001:1002::1003:1004:1005:1006:1007]",
    "[1001:1002::1003:1004:1005:1006:1007]:8082": "[1001:1002::1003:1004:1005:1006:1007]",
    "[1001::2]": "[1001::2]",
    "[1001::2]:8083": "[1001::2]",
    "[::1]": "[::1]",
    "[::1]:8084": "[::1]"
};


describe("Host headers", function () {
    Object.keys(results).forEach(function (source) {
        var result = results[source];
        var headers = {
            host: source
        };

        it(source + " => " + result, function () {
            assert(headerHostname(headers) === result);
        });
    });

    it("no set => undefined", function () {
        assert(headerHostname({ foo: 123 }) === undefined);
    });
});

describe("X-Forwarded-Host headers", function () {
    Object.keys(results).forEach(function (source) {
        var result = results[source];
        var headers = {
            "x-forwarded-host": source,
            host: "invalid.example.com"
        };

        it(source + " => " + result, function () {
            assert(headerHostname(headers) === result);
        });
    });
});
