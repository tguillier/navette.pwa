(function () {
    HoneywellBarcodeReaderAjax = function (a, d) {
        var f = this; if (!a || HoneywellBarcodeReaderUtils.stdParamCheck(a, "scannerName", "string", d)) {
            var e = { method: "scanner.connect" }; a && (e.params = {}, e.params.scanner = a); HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection", e, function (a) {
                if (HoneywellBarcodeReaderUtils.hasProperty(a, "result", !0)) if (HoneywellBarcodeReaderUtils.hasProperty(a.result, "session", !0)) {
                f.sessionId = a.result.session; var k = { method: "scanner.claim", params: {} }; k.params.session =
                    f.sessionId; HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection", k, function (a) {
                        HoneywellBarcodeReaderUtils.hasProperty(a, "result", !0) ? HoneywellBarcodeReaderUtils.hasProperty(a.result, "filter", !0) ? (f.filter = a.result.filter, HoneywellBarcodeReaderUtils.isFunction(d) && setTimeout(function () { d({ status: 0, message: HoneywellBarcodeReaderUtils.MSG_OPERATION_COMPLETED }) }, 0)) : HoneywellBarcodeReaderUtils.isFunction(d) && setTimeout(function () {
                            d({
                                status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR,
                                message: "JSON-RPC parsing error in response, missing filter parameter."
                            })
                        }, 0) : HoneywellBarcodeReaderUtils.hasJsonRpcError(a) ? HoneywellBarcodeReaderUtils.isFunction(d) && setTimeout(function () { d({ status: a.error.code, message: a.error.message }) }, 0) : HoneywellBarcodeReaderUtils.isFunction(d) && setTimeout(function () { d({ status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, message: "JSON-RPC parsing error in response." }) }, 0)
                    })
                } else HoneywellBarcodeReaderUtils.isFunction(d) && setTimeout(function () {
                    d({
                        status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR,
                        message: "JSON-RPC parsing error in response, missing session parameter."
                    })
                }, 0); else HoneywellBarcodeReaderUtils.hasJsonRpcError(a) ? HoneywellBarcodeReaderUtils.isFunction(d) && setTimeout(function () { d({ status: a.error.code, message: a.error.message }) }, 0) : HoneywellBarcodeReaderUtils.isFunction(d) && setTimeout(function () { d({ status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, message: "JSON-RPC parsing error in response." }) }, 0)
            })
        }
    }; HoneywellBarcodeReaderAjax.prototype = {
        version: "1.20.00.0334", sessionId: null,
        filter: null, eventDispatcher: null, barcodeDataReadyListeners: [], batchGetBuffer: [], batchSetBuffer: [], addEventListener: function (a, d, f) {
            function e(a, b, g) {
                if ("scanner.barcodeEvent" === a && b && g) {
                    var f = a = null, d = null, e, n; if (HoneywellBarcodeReaderUtils.hasProperty(b, "barcode", !0) && (HoneywellBarcodeReaderUtils.hasProperty(b.barcode, "data", !0) && (a = b.barcode.data), HoneywellBarcodeReaderUtils.hasProperty(b.barcode, "honeywellId", !0) && (e = b.barcode.honeywellId), HoneywellBarcodeReaderUtils.hasProperty(b.barcode, "aimId",
                        !0) && (n = b.barcode.aimId), f = HoneywellBarcodeReaderUtils.getSymbologyName(e, n), HoneywellBarcodeReaderUtils.hasProperty(b.barcode, "timestamp", !0) && (d = b.barcode.timestamp), c.barcodeDataReadyListeners[g] instanceof Array)) for (b = c.barcodeDataReadyListeners[g], g = 0, e = b.length; g < e; g++)b[g](a, f, d)
                }
            } var c = this; c.filter && (f = { error: null, event: e, filter: c.filter }, "barcodedataready" === a && (c.eventDispatcher || (c.eventDispatcher = HoneywellBarcodeReaderWebEventDispatcher.create("datacollection"), c.eventDispatcher.startSession(f)),
                "undefined" === typeof c.barcodeDataReadyListeners[c.filter] && (c.barcodeDataReadyListeners[c.filter] = []), c.barcodeDataReadyListeners[c.filter].push(d)))
        }, clearBuffer: function () { this.batchGetBuffer.length = 0; this.batchSetBuffer.length = 0 }, close: function (a) {
            var d = this; if (null === this.sessionId) HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: 0, message: "BarcodeReader already closed" }) }, 0); else {
                var f = { method: "scanner.release", params: {} }; f.params.session = d.sessionId; HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection",
                    f, function (f) {
                        HoneywellBarcodeReaderUtils.stdErrorCheck(f, function (c) {
                            if (0 === c.status) { d.filter = null; var f = { method: "scanner.disconnect", params: {} }; f.params.session = d.sessionId; HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection", f, function (b) { HoneywellBarcodeReaderUtils.stdErrorCheck(b, function (b) { 0 === b.status && (d.sessionId = null, d.eventDispatcher && d.eventDispatcher.stopSession()); HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a(b) }, 0) }) }) } else HoneywellBarcodeReaderUtils.isFunction(a) &&
                                setTimeout(function () { a(c) }, 0)
                        })
                    })
            }
        }, commitBuffer: function (a) {
            function d() {
                if (0 < c.length) {
                    var b = { method: "scanner.getProperties", params: {} }; b.params.session = f.sessionId; b.params.names = []; for (var d = 0, g = c.length; d < g; d++)b.params.names.push(c[d].command); f.logVar("Batch get request.params.names", b.params.names, !1); HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection", b, function (b) {
                        f.logVar("Batch get's response", b, !1); if (HoneywellBarcodeReaderUtils.isFunction(a)) {
                            if (HoneywellBarcodeReaderUtils.hasProperty(b,
                                "result", !0)) if (HoneywellBarcodeReaderUtils.hasProperty(b.result, "values", !0)) for (var d = 0, g = c.length; d < g; d++) {
                                    var e = c[d], h = { method: "getBuffered" }; h.family = e.family; h.key = e.key; h.option = e.option; HoneywellBarcodeReaderUtils.hasProperty(b.result.values, e.command, !0) ? HoneywellBarcodeReaderUtils.convertScannerSettingValue(e, b.result.values[e.command], h) ? (h.status = 0, h.message = HoneywellBarcodeReaderUtils.MSG_OPERATION_COMPLETED) : (h.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, h.message = "Unexpected scanner setting value") :
                                        (h.status = HoneywellBarcodeReaderErrors.INVALID_PARAMETER, h.message = "Invalid scanner property: " + e.command); k.push(h)
                                } else h = { method: "getBuffered", family: null, key: null, option: null }, h.status = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, h.message = "JSON-RPC parsing error in response.", k.push(h); else HoneywellBarcodeReaderUtils.hasJsonRpcError(b) ? (h = { method: "getBuffered", family: null, key: null, option: null }, h.status = b.error.code, h.message = b.error.message) : (h = { method: "getBuffered", family: null, key: null, option: null },
                                    h.status = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, h.message = "JSON-RPC parsing error in response."), k.push(h); setTimeout(function () { a(k) }, 0)
                        }
                    })
                } else HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a(k) }, 0)
            } var f = this, e = [], c = [], k = []; if (null === this.sessionId || null === this.filter) {
                if (HoneywellBarcodeReaderUtils.isFunction(a)) {
                    var b = {}; b.status = HoneywellBarcodeReaderErrors.NO_CONNECTION; b.message = "No scanner connection"; b.method = null; b.family = null; b.key = null; b.option = null; k.push(b);
                    setTimeout(function () { a(k) }, 0)
                }
            } else if (0 === this.batchSetBuffer.length && 0 === this.batchGetBuffer.length) HoneywellBarcodeReaderUtils.isFunction(a) && (b = {}, b.status = HoneywellBarcodeReaderErrors.EMPTY_COMMIT_BUFFER, b.message = "The commit buffer is empty, nothing to commit.", b.method = null, b.family = null, b.key = null, b.option = null, k.push(b), setTimeout(function () { a(k) }, 0)); else {
                for (var g = 0, l = f.batchSetBuffer.length; g < l; g++) {
                    var h = f.batchSetBuffer[g]; 0 === h.status ? e.push(h) : (b = { method: "setBuffered" }, b.family = h.family,
                        b.key = h.key, b.option = h.option, b.status = h.status, b.message = h.message, k.push(b))
                } g = 0; for (l = f.batchGetBuffer.length; g < l; g++)h = f.batchGetBuffer[g], 0 === h.status ? c.push(h) : (b = { method: "getBuffered" }, b.family = h.family, b.key = h.key, b.option = h.option, b.status = h.status, b.message = h.message, k.push(b)); if (0 < e.length) {
                    var m = [], b = { method: "scanner.setProperties", params: {} }; b.params.session = f.sessionId; b.params.values = {}; g = 0; for (l = e.length; g < l; g++)h = e[g], b.params.values[h.command] = h.value, m.push(h.command); f.logVar("Batch set request.params.values",
                        b.params.values, !1); HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection", b, function (b) {
                            if (HoneywellBarcodeReaderUtils.isFunction(a)) if (HoneywellBarcodeReaderUtils.hasProperty(b, "result", !1)) b = { method: "scanner.getProperties", params: {} }, b.params.session = f.sessionId, b.params.names = m, HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection", b, function (b) {
                                f.logVar("Batch set's get response", b, !1); if (HoneywellBarcodeReaderUtils.hasProperty(b, "result", !0) && HoneywellBarcodeReaderUtils.hasProperty(b.result,
                                    "values", !0)) for (var a = 0, c = e.length; a < c; a++) {
                                        var g = e[a], h = { method: "setBuffered" }; h.family = g.family; h.key = g.key; h.option = g.option; HoneywellBarcodeReaderUtils.hasProperty(b.result.values, g.command, !0) ? b.result.values[g.command] === g.value ? (h.status = 0, h.message = HoneywellBarcodeReaderUtils.MSG_OPERATION_COMPLETED) : (h.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, h.message = "Scanner rejects the setting value.") : (h.status = HoneywellBarcodeReaderErrors.INVALID_PARAMETER, h.message = "Invalid scanner property: " +
                                            g.command); k.push(h)
                                    } else HoneywellBarcodeReaderUtils.hasJsonRpcError(b) ? (h = { method: "setBuffered", family: null, key: null, option: null }, h.status = b.error.code, h.message = b.error.message) : (h = { method: "setBuffered", family: null, key: null, option: null }, h.status = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, h.message = "JSON-RPC parsing error in response."), k.push(h); d()
                            }); else {
                                if (HoneywellBarcodeReaderUtils.hasJsonRpcError(b)) {
                                    var c = { method: "setBuffered", family: null, key: null, option: null }; c.status = b.error.code; c.message =
                                        b.error.message
                                } else c = { method: "setBuffered", family: null, key: null, option: null }, c.status = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, c.message = "JSON-RPC parsing error in response."; k.push(c); d()
                            }
                        })
                } else d()
            }
        }, enableTrigger: function (a, d) {
            if (this.verifyActiveConnection(d) && HoneywellBarcodeReaderUtils.stdParamCheck(a, "enabled", "boolean", d)) {
                var f = { method: "scanner.setProperties", params: {} }; f.params.session = this.sessionId; f.params.values = {}; f.params.values.TRIG_CONTROL_MODE = a ? "autoControl" : "disable";
                HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection", f, function (a) { HoneywellBarcodeReaderUtils.stdErrorCheck(a, d) })
            }
        }, get: function (a, d, f, e) {
            var c = this, k, b; b = {}; b.family = a; b.key = d; b.option = f; HoneywellBarcodeReaderUtils.isFunction(e) && ("undefined" === typeof HowneywellBarcodeReaderSwiftSettings ? (b.status = HoneywellBarcodeReaderErrors.MISSING_SETTINGS_DEF, b.message = "Missing settings definition HowneywellBarcodeReaderSwiftSettings.", setTimeout(function () { e(b) }, 0)) : null === this.sessionId ||
                null === this.filter ? (b.status = HoneywellBarcodeReaderErrors.NO_CONNECTION, b.message = "No scanner connection", setTimeout(function () { e(b) }, 0)) : HoneywellBarcodeReaderUtils.stdParamCheckResult(a, "family", "string", b, e) && (HoneywellBarcodeReaderUtils.stdParamCheckResult(d, "key", "string", b, e) && HoneywellBarcodeReaderUtils.stdParamCheckResult(f, "option", "string", b, e)) && (k = HoneywellBarcodeReaderUtils.getSettingDef(HowneywellBarcodeReaderSwiftSettings, a, d, f, null, !1), 0 === k.status ? (a = {
                    method: "scanner.getProperties",
                    params: {}
                }, a.params.session = c.sessionId, a.params.names = [], a.params.names.push(k.command), c.logVar("get settingDef", k, !1), HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection", a, function (a) {
                    HoneywellBarcodeReaderUtils.hasProperty(a, "result", !0) ? HoneywellBarcodeReaderUtils.hasProperty(a.result, "values", !0) ? (a = a.result.values[k.command], c.logVar("get response scannerSettingValue", a, !0), HoneywellBarcodeReaderUtils.convertScannerSettingValue(k, a, b) ? (b.status = 0, b.message = HoneywellBarcodeReaderUtils.MSG_OPERATION_COMPLETED) :
                        (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, b.message = "Unexpected scanner setting value"), setTimeout(function () { e(b) }, 0)) : (b.status = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, b.message = "JSON-RPC parsing error in response.") : (HoneywellBarcodeReaderUtils.hasJsonRpcError(a) ? (b.status = a.error.code, b.message = a.error.message) : (b.status = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, b.message = "JSON-RPC parsing error in response."), setTimeout(function () { e(b) }, 0))
                })) : (b.status = k.status,
                    b.message = k.message, setTimeout(function () { e(b) }, 0))))
        }, getBuffered: function (a, d, f, e) {
            var c; c = {}; c.family = a; c.key = d; c.option = f; "undefined" === typeof HowneywellBarcodeReaderSwiftSettings ? HoneywellBarcodeReaderUtils.isFunction(e) && (c.status = HoneywellBarcodeReaderErrors.MISSING_SETTINGS_DEF, c.message = "Missing settings definition HowneywellBarcodeReaderSwiftSettings.", setTimeout(function () { e(c) }, 0)) : null === this.sessionId || null === this.filter ? HoneywellBarcodeReaderUtils.isFunction(e) && (c.status = HoneywellBarcodeReaderErrors.NO_CONNECTION,
                c.message = "No scanner connection", setTimeout(function () { e(c) }, 0)) : HoneywellBarcodeReaderUtils.stdParamCheckResult(a, "family", "string", c, e) && (HoneywellBarcodeReaderUtils.stdParamCheckResult(d, "key", "string", c, e) && HoneywellBarcodeReaderUtils.stdParamCheckResult(f, "option", "string", c, e)) && (a = HoneywellBarcodeReaderUtils.getSettingDef(HowneywellBarcodeReaderSwiftSettings, a, d, f, null, !1), this.logVar("getBuffered settingDef", a, !1), this.batchGetBuffer.push(a), 0 === a.status ? HoneywellBarcodeReaderUtils.isFunction(e) &&
                    (c.status = 0, c.message = "Get request successfully buffered.", setTimeout(function () { e(c) }, 0)) : HoneywellBarcodeReaderUtils.isFunction(e) && (c.status = a.status, c.message = a.message, setTimeout(function () { e(c) }, 0)))
        }, getLicenseInfo: function (a) {
            if (HoneywellBarcodeReaderUtils.isFunction(a)) {
                var d = { method: "license.getLicenseInfo", params: {} }; d.params.subsystem = "datacollection"; HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("license", d, function (d) {
                    HoneywellBarcodeReaderUtils.hasProperty(d, "result", !0) ? (d.result.status =
                        0, d.result.message = "Get license info completed successfully.", setTimeout(function () { a(d.result) }, 0)) : HoneywellBarcodeReaderUtils.hasJsonRpcError(d) ? setTimeout(function () { a({ status: d.error.code, message: d.error.message }) }, 0) : setTimeout(function () { a({ status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, message: "JSON-RPC parsing error in response." }) }, 0)
                })
            }
        }, logVar: function (a, d, f) {
            if (typeof HoneywellBarcodeReaderUtils.log === typeof Function) {
                var e = typeof d; "object" === e ? null !== d ? "[object Array]" === Object.prototype.toString.call(d) ?
                    (a = a + "\x3d" + d.toString(), f && (a += ", type\x3dArray")) : (a = a + "\x3d" + JSON.stringify(d, null, " "), f && (a += ", type\x3dobject")) : (a += "\x3dnull", f && (a += ", type\x3dobject")) : "undefined" === e ? (a += "\x3dundefined", f && (a += ", type\x3dundefined")) : (a = a + "\x3d" + d.toString(), f && (a += ", type\x3d" + e)); HoneywellBarcodeReaderUtils.log(a)
            }
        }, removeEventListener: function (a, d) {
            if (this.filter && "barcodedataready" === a && this.barcodeDataReadyListeners[this.filter] instanceof Array) for (var f = this.barcodeDataReadyListeners[this.filter],
                e = 0, c = f.length; e < c; e++)if (f[e] === d) { f.splice(e, 1); break }
        }, set: function (a, d, f, e, c) {
            var k = this, b, g; g = {}; g.family = a; g.key = d; g.option = f; "undefined" === typeof HowneywellBarcodeReaderSwiftSettings ? HoneywellBarcodeReaderUtils.isFunction(c) && (g.status = HoneywellBarcodeReaderErrors.MISSING_SETTINGS_DEF, g.message = "Missing settings definition HowneywellBarcodeReaderSwiftSettings.", setTimeout(function () { c(g) }, 0)) : null === this.sessionId || null === this.filter ? HoneywellBarcodeReaderUtils.isFunction(c) && (g.status = HoneywellBarcodeReaderErrors.NO_CONNECTION,
                g.message = "No scanner connection", setTimeout(function () { c(g) }, 0)) : HoneywellBarcodeReaderUtils.stdParamCheckResult(a, "family", "string", g, c) && (HoneywellBarcodeReaderUtils.stdParamCheckResult(d, "key", "string", g, c) && HoneywellBarcodeReaderUtils.stdParamCheckResult(f, "option", "string", g, c) && HoneywellBarcodeReaderUtils.stdParamCheckResult(e, "value", "string", g, c)) && (b = HoneywellBarcodeReaderUtils.getSettingDef(HowneywellBarcodeReaderSwiftSettings, a, d, f, e, !0), 0 === b.status ? (a = {
                    method: "scanner.setProperties",
                    params: {}
                }, a.params.session = k.sessionId, a.params.values = {}, a.params.values[b.command] = b.value, k.logVar("set settingDef", b, !1), k.logVar("set request.params.values", a.params.values, !1), HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection", a, function (a) {
                    HoneywellBarcodeReaderUtils.isFunction(c) && (HoneywellBarcodeReaderUtils.hasProperty(a, "result", !1) ? (a = { method: "scanner.getProperties", params: {} }, a.params.session = k.sessionId, a.params.names = [], a.params.names.push(b.command), HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection",
                        a, function (a) {
                            k.logVar("set function get response", a, !1); HoneywellBarcodeReaderUtils.hasProperty(a, "result", !0) && HoneywellBarcodeReaderUtils.hasProperty(a.result, "values", !0) ? HoneywellBarcodeReaderUtils.hasProperty(a.result.values, b.command, !0) ? a.result.values[b.command] === b.value ? (g.status = 0, g.message = HoneywellBarcodeReaderUtils.MSG_OPERATION_COMPLETED) : (g.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, g.message = "Scanner rejects the setting value.") : (g.status = HoneywellBarcodeReaderErrors.INVALID_PARAMETER,
                                g.message = "Invalid scanner property: " + b.command) : HoneywellBarcodeReaderUtils.hasJsonRpcError(a) ? (g.status = a.error.code, g.message = a.error.message) : (g.status = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, g.message = "JSON-RPC parsing error in response."); setTimeout(function () { c(g) }, 0)
                        })) : (HoneywellBarcodeReaderUtils.hasJsonRpcError(a) ? (g.status = a.error.code, g.message = a.error.message) : (g.status = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, g.message = "JSON-RPC parsing error in response."), setTimeout(function () { c(g) },
                            0)))
                })) : HoneywellBarcodeReaderUtils.isFunction(c) && (g.status = b.status, g.message = b.message, setTimeout(function () { c(g) }, 0)))
        }, setBuffered: function (a, d, f, e, c) {
            var k; k = {}; k.family = a; k.key = d; k.option = f; "undefined" === typeof HowneywellBarcodeReaderSwiftSettings ? HoneywellBarcodeReaderUtils.isFunction(c) && (k.status = HoneywellBarcodeReaderErrors.MISSING_SETTINGS_DEF, k.message = "Missing settings definition HowneywellBarcodeReaderSwiftSettings.", setTimeout(function () { c(k) }, 0)) : null === this.sessionId || null === this.filter ?
                HoneywellBarcodeReaderUtils.isFunction(c) && (k.status = HoneywellBarcodeReaderErrors.NO_CONNECTION, k.message = "No scanner connection", setTimeout(function () { c(k) }, 0)) : HoneywellBarcodeReaderUtils.stdParamCheckResult(a, "family", "string", k, c) && (HoneywellBarcodeReaderUtils.stdParamCheckResult(d, "key", "string", k, c) && HoneywellBarcodeReaderUtils.stdParamCheckResult(f, "option", "string", k, c) && HoneywellBarcodeReaderUtils.stdParamCheckResult(e, "value", "string", k, c)) && (a = HoneywellBarcodeReaderUtils.getSettingDef(HowneywellBarcodeReaderSwiftSettings,
                    a, d, f, e, !0), this.logVar("setBuffered settingDef", a, !1), this.batchSetBuffer.push(a), 0 === a.status ? HoneywellBarcodeReaderUtils.isFunction(c) && (k.status = 0, k.message = "Set request successfully buffered.", setTimeout(function () { c(k) }, 0)) : HoneywellBarcodeReaderUtils.isFunction(c) && (k.status = a.status, k.message = a.message, setTimeout(function () { c(k) }, 0)))
        }, verifyActiveConnection: function (a) {
            return null === this.sessionId || null === this.filter ? (HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () {
                a({
                    status: HoneywellBarcodeReaderErrors.NO_CONNECTION,
                    message: "No scanner connection"
                })
            }, 0), !1) : !0
        }
    }; HoneywellBarcodeReadersAjax = function (a) { HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: 0, message: HoneywellBarcodeReaderUtils.MSG_OPERATION_COMPLETED }) }, 0) }; HoneywellBarcodeReadersAjax.prototype = {
        version: "1.20.00.0334", getAvailableBarcodeReaders: function (a) {
            function d(c) {
                if (HoneywellBarcodeReaderUtils.hasProperty(c, "result", !0) && HoneywellBarcodeReaderUtils.hasProperty(c.result, "scanners", !0) && c.result.scanners instanceof Array) for (var b =
                    0, d = c.result.scanners.length; b < d; b++)HoneywellBarcodeReaderUtils.hasProperty(c.result.scanners[b], "scanner", !0) && f.push(c.result.scanners[b].scanner); 0 === f.length && f.push("dcs.scanner.imager"); HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a(f) }, 0)
            } var f = [], e = { method: "scanner.listConnectedScanners" }; if (HoneywellBarcodeReaderUtils.isFunction(a)) HoneywellBarcodeReaderUtils.sendJsonRpcRequestSubSys("datacollection", e, d); else {
                var c; e.id = HoneywellBarcodeReaderUtils.getRandomInt(1E4, 99999);
                e.jsonrpc = "2.0"; window.XMLHttpRequest && (c = new XMLHttpRequest, c.onreadystatechange = function () { if (4 == c.readyState && 200 == c.status) { var a; try { a = JSON.parse(c.responseText), d(a) } catch (b) { } } }, c.open("POST", "http://127.0.0.1:8080/jsonrpc/datacollection", !1), c.send(JSON.stringify(e)))
            } return f
        }
    }
})();
;(function () {
    HoneywellBarcodeReaderSwiftWin = function (a, b) {
        var e = this, c, d; a && "string" !== typeof a ? HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: HoneywellBarcodeReaderErrors.INVALID_PARAMETER, message: "Invalid parameter: scannerName, must be string" }) }, 0) : (this.scannerName = a ? a : "default", c = HoneywellBarcodeReaderUtils.getRandomInt(1E4, 99999), d = win10EnterpriseBrowserInfo.getBrowserPortalSeqNum(), win10ScannerBridge.openAsync(c, this.scannerName, d).then(function (a) {
            if (a) {
                e.logVar("win10ScannerBridge.openAsync response",
                    a, !1); var c; try { c = JSON.parse(a) } catch (d) { HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, message: "JSON-RPC parsing error in response." }) }, 0); return } HoneywellBarcodeReaderUtils.hasProperty(c, "result", !0) ? HoneywellBarcodeReaderUtils.hasProperty(c.result, "scannerHandle", !0) && HoneywellBarcodeReaderUtils.hasProperty(c.result, "interface", !0) && HoneywellBarcodeReaderUtils.hasProperty(c.result, "modelName", !0) ? (e.scannerHandle = c.result.scannerHandle,
                        e.scannerInterface = c.result.interface, e.scannerModelName = c.result.modelName, win10ScannerBridge.removeEventListener("barcodedataready", window["dataReadyEventHandler" + e.scannerHandle]), e.barcodeDataReadyHandlersRegistered[e.scannerHandle] = !1, HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: 0, message: e.MSG_OPERATION_COMPLETED }) }, 0)) : HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: HoneywellBarcodeReaderErrors.FUNCTION_FAILED, message: "Missing scanner handle or interface or modelName in response." }) },
                            0) : HoneywellBarcodeReaderUtils.hasJsonRpcError(c) ? HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: c.error.code, message: c.error.message }) }, 0) : HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, message: "JSON-RPC parsing error in response." }) }, 0)
            } else HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: HoneywellBarcodeReaderErrors.FUNCTION_FAILED, message: "Null or empty response." }) },
                0)
        }))
    }; HoneywellBarcodeReaderSwiftWin.prototype = {
        version: "1.20.00.0334", scannerName: null, scannerHandle: null, scannerInterface: null, scannerModelName: null, barcodeDataReadyListeners: [], barcodeDataReadyHandlersRegistered: [], MSG_OPERATION_COMPLETED: "Operation completed successfully.", MSG_READER_CLOSED: "Barcode reader already closed.", batchSetBuffer: [], activate: function (a, b) {
            var e = this, c; this.verifyActiveConnection(b) && HoneywellBarcodeReaderUtils.stdParamCheck(a, "on", "boolean", b) && (c = HoneywellBarcodeReaderUtils.getRandomInt(1E4,
                99999), win10ScannerBridge.activateAsync(c, this.scannerHandle, a).then(function (a) {
                    if (a) { e.logVar("win10ScannerBridge.activateAsync response", a, !1); var c; try { c = JSON.parse(a) } catch (g) { HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, message: "JSON-RPC parsing error in response." }) }, 0); return } HoneywellBarcodeReaderUtils.stdErrorCheck(c, b) } else HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () {
                        b({
                            status: HoneywellBarcodeReaderErrors.FUNCTION_FAILED,
                            message: "Null or empty response."
                        })
                    }, 0)
                }))
        }, addEventListener: function (a, b, e) {
            if ("barcodedataready" === a && this.scannerHandle) {
                var c = this, d = "dataReadyEventHandler" + c.scannerHandle; "undefined" === typeof c.barcodeDataReadyListeners[c.scannerHandle] && (c.barcodeDataReadyListeners[c.scannerHandle] = []); a = !1; e = c.barcodeDataReadyListeners[c.scannerHandle]; for (var f = 0, g = e.length; f < g; f++)if (e[f] === b) { a = !0; break } a || e.push(b); window[d] = function (a) {
                    var b, e = null, f = null; if (a) {
                        try { b = JSON.parse(a) } catch (g) {
                            c.log("Failed to parse event data: " +
                                a)
                        } if (b && HoneywellBarcodeReaderUtils.hasProperty(b.params, "scannerHandle", !0)) if (b.params.scannerHandle === c.scannerHandle) {
                            if (HoneywellBarcodeReaderUtils.hasProperty(b.params, "data", !0) && (HoneywellBarcodeReaderUtils.hasProperty(b.params, "symbology", !0) && (e = b.params.symbology), HoneywellBarcodeReaderUtils.hasProperty(b.params, "timestamp", !0) && (f = b.params.timestamp), c.barcodeDataReadyListeners[c.scannerHandle] instanceof Array)) {
                                a = c.barcodeDataReadyListeners[c.scannerHandle]; for (var n = 0, q = a.length; n <
                                    q; n++)a[n](b.params.data, e, f)
                            }
                        } else c.log(d + " receives Unexpected scanner handle: " + b.params.scannerHandle)
                    }
                }
            } !1 === c.barcodeDataReadyHandlersRegistered[c.scannerHandle] && (win10ScannerBridge.addEventListener("barcodedataready", window[d]), c.barcodeDataReadyHandlersRegistered[c.scannerHandle] = !0)
        }, clearBuffer: function () { this.batchSetBuffer.length = 0 }, close: function (a) {
            var b = this, e; this.scannerHandle ? (e = HoneywellBarcodeReaderUtils.getRandomInt(1E4, 99999), win10ScannerBridge.closeAsync(e, this.scannerHandle).then(function (c) {
                if (c) {
                    b.logVar("win10ScannerBridge.closeAsync response",
                        c, !1); var e; try { e = JSON.parse(c) } catch (f) { HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, message: "JSON-RPC parsing error in response." }) }, 0); return } HoneywellBarcodeReaderUtils.hasProperty(e, "result", !1) ? (!0 === b.barcodeDataReadyHandlersRegistered[b.scannerHandle] && (win10ScannerBridge.removeEventListener("barcodedataready", window["dataReadyEventHandler" + b.scannerHandle]), b.barcodeDataReadyHandlersRegistered[b.scannerHandle] = !1),
                            HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: 0, message: b.MSG_OPERATION_COMPLETED }) }, 0)) : HoneywellBarcodeReaderUtils.hasJsonRpcError(e) ? HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: e.error.code, message: e.error.message }) }, 0) : HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, message: "JSON-RPC parsing error in response." }) }, 0)
                } else HoneywellBarcodeReaderUtils.isFunction(a) &&
                    setTimeout(function () { a({ status: HoneywellBarcodeReaderErrors.FUNCTION_FAILED, message: "Null or empty response." }) }, 0)
            })) : setTimeout(function () { a({ status: 0, message: this.MSG_READER_CLOSED }) }, 0)
        }, commitBuffer: function (a) {
            function b(a, b) {
                for (var c, d = 0 <= e.scannerInterface.toUpperCase().indexOf("USB") ? "USB" : "Internal", d = '\x3c?xml version\x3d"1.0"?\x3e\r\n\x3cConfigDoc name\x3d"Data Collection Profiles"\x3e\r\n' + ('  \x3cSection name\x3d"' + b + '"\x3e\r\n') + ('    \x3cKey cmd\x3d"DEVICE" desc\x3d"Specifies the scanner type" list\x3d"Internal,USB" name\x3d"Device Type"\x3e' +
                    d + "\x3c/Key\x3e\r\n"), d = d + '    \x3cKey cmd\x3d"TYPE"\x3eIncremental\x3c/Key\x3e\r\n', d = d + '    \x3cKey cmd\x3d"APPLY"\x3etrue\x3c/Key\x3e\r\n', f = 0, g = a.length; f < g; f++) {
                        var h = a[f], d = d + ('    \x3cKey cmd\x3d"' + h.command + '"'); if (HoneywellBarcodeReaderUtils.hasProperty(h, "valueType", !0)) if ("map" === h.valueType) {
                            if (HoneywellBarcodeReaderUtils.hasProperty(h, "valueMap", !0) && h.valueMap instanceof Array && 0 < h.valueMap.length) {
                                d += ' list\x3d"'; c = !0; for (var k = 0, l = h.valueMap.length; k < l; k++)for (var m in h.valueMap[k]) c ?
                                    (d += h.valueMap[k][m], c = !1) : d += "," + h.valueMap[k][m]; d += '"'
                            }
                        } else if ("int" === h.valueType) { if (HoneywellBarcodeReaderUtils.hasProperty(h, "valueRange", !0) && h.valueRange instanceof Array && 0 < h.valueRange.length) for (k = 0, c = h.valueRange.length; k < c; k++)for (m in h.valueRange[k]) d += " " + m + '\x3d"' + h.valueRange[k][m] + '"' } else if ("list" === h.valueType && HoneywellBarcodeReaderUtils.hasProperty(h, "values", !0) && h.values instanceof Array && 0 < h.values.length) {
                            d += ' list\x3d"'; c = !0; k = 0; for (l = h.values.length; k < l; k++)c ? (d += h.values[k],
                                c = !1) : d += "," + h.values[k]; d += '"'
                        } d += "\x3e" + h.value + "\x3c/Key\x3e\r\n"
                } d += "  \x3c/Section\x3e\r\n\x3c/ConfigDoc\x3e\r\n"; e.logVar("EXM string", d, !1); return d
            } var e = this, c = [], d = [], f; if (null === this.scannerHandle) HoneywellBarcodeReaderUtils.isFunction(a) && (f = {}, f.status = HoneywellBarcodeReaderErrors.NO_CONNECTION, f.message = "No scanner connection", f.method = null, f.family = null, f.key = null, f.option = null, d.push(f), setTimeout(function () { a(d) }, 0)); else if (0 === e.batchSetBuffer.length) HoneywellBarcodeReaderUtils.isFunction(a) &&
                (f = {}, f.status = HoneywellBarcodeReaderErrors.EMPTY_COMMIT_BUFFER, f.message = "The commit buffer is empty, nothing to commit.", f.method = null, f.family = null, f.key = null, f.option = null, d.push(f), setTimeout(function () { a(d) }, 0)); else {
                    for (var g = 0, p = e.batchSetBuffer.length; g < p; g++) { var l = e.batchSetBuffer[g]; 0 === l.status ? c.push(l) : (f = { method: "setBuffered" }, f.family = l.family, f.key = l.key, f.option = l.option, f.status = l.status, f.message = l.message, d.push(f)) } 0 < d.length ? HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a(d) },
                        0) : (f = b(c, "WebSDKConfig"), c = HoneywellBarcodeReaderUtils.getRandomInt(1E4, 99999), win10ScannerBridge.writeExmFileAsync(c, e.scannerHandle, f, "HoneywellDecoderSettingsV2.exm", "WebSDKConfig").then(function (c) {
                            var b = { method: "setBuffered", family: null, key: null, option: null }; if (c) {
                                e.logVar("scanner.writeExmFile response", c, !1); var f; try { f = JSON.parse(c) } catch (g) {
                                    HoneywellBarcodeReaderUtils.isFunction(a) && (b.status = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, b.message = "JSON-RPC parsing error in response.", d.push(b),
                                        setTimeout(function () { a(d) }, 0)); return
                                } HoneywellBarcodeReaderUtils.hasProperty(f, "result", !1) ? (b.status = 0, b.message = e.MSG_OPERATION_COMPLETED) : HoneywellBarcodeReaderUtils.hasJsonRpcError(f) ? (b.status = f.error.code, b.message = f.error.message) : (b.status = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, b.message = "JSON-RPC parsing error in response.")
                            } else b.status = HoneywellBarcodeReaderErrors.FUNCTION_FAILED, b.message = "Null or empty response."; HoneywellBarcodeReaderUtils.isFunction(a) && (d.push(b), setTimeout(function () { a(d) },
                                0))
                        }))
            }
        }, enableTrigger: function (a, b) {
            var e = this, c; this.verifyActiveConnection(b) && HoneywellBarcodeReaderUtils.stdParamCheck(a, "enabled", "boolean", b) && (c = HoneywellBarcodeReaderUtils.getRandomInt(1E4, 99999), win10ScannerBridge.enableHardwareTriggerAsync(c, this.scannerHandle, a).then(function (a) {
                if (a) {
                    e.logVar("win10ScannerBridge.enableHardwareTriggerAsync response", a, !1); var c; try { c = JSON.parse(a) } catch (g) {
                        HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () {
                            b({
                                status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR,
                                message: "JSON-RPC parsing error in response."
                            })
                        }, 0); return
                    } HoneywellBarcodeReaderUtils.stdErrorCheck(c, b)
                } else HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: HoneywellBarcodeReaderErrors.FUNCTION_FAILED, message: "Null or empty response." }) }, 0)
            }))
        }, log: function (a) { typeof HoneywellBarcodeReaderUtils.log === typeof Function && HoneywellBarcodeReaderUtils.log(a) }, logVar: function (a, b, e) {
            if (typeof HoneywellBarcodeReaderUtils.log === typeof Function) {
                var c = typeof b; "object" === c ? null !==
                    b ? "[object Array]" === Object.prototype.toString.call(b) ? (a = a + "\x3d" + b.toString(), e && (a += ", type\x3dArray")) : (a = a + "\x3d" + JSON.stringify(b, null, " "), e && (a += ", type\x3dobject")) : (a += "\x3dnull", e && (a += ", type\x3dobject")) : "undefined" === c ? (a += "\x3dundefined", e && (a += ", type\x3dundefined")) : (a = a + "\x3d" + b.toString(), e && (a += ", type\x3d" + c)); HoneywellBarcodeReaderUtils.log(a)
            }
        }, removeEventListener: function (a, b) {
            if ("barcodedataready" === a && this.scannerHandle && this.barcodeDataReadyListeners[this.scannerHandle] instanceof
                Array) for (var e = this.barcodeDataReadyListeners[this.scannerHandle], c = 0, d = e.length; c < d; c++)if (e[c] === b) { e.splice(c, 1); break }
        }, setBuffered: function (a, b, e, c, d) {
            var f = 0 <= this.scannerInterface.toUpperCase().indexOf("USB"), g; g = {}; g.family = a; g.key = b; g.option = e; "undefined" === typeof HowneywellBarcodeReaderSwiftSettings || "undefined" === typeof HowneywellBarcodeReaderRingSettings ? HoneywellBarcodeReaderUtils.isFunction(d) && (g.status = HoneywellBarcodeReaderErrors.MISSING_SETTINGS_DEF, g.message = "Missing settings definition HowneywellBarcodeReaderSwiftSettings or HowneywellBarcodeReaderRingSettings.",
                setTimeout(function () { d(g) }, 0)) : null === this.scannerHandle ? HoneywellBarcodeReaderUtils.isFunction(d) && (g.status = HoneywellBarcodeReaderErrors.NO_CONNECTION, g.message = "No scanner connection", setTimeout(function () { d(g) }, 0)) : HoneywellBarcodeReaderUtils.stdParamCheckResult(a, "family", "string", g, d) && (HoneywellBarcodeReaderUtils.stdParamCheckResult(b, "key", "string", g, d) && HoneywellBarcodeReaderUtils.stdParamCheckResult(e, "option", "string", g, d) && HoneywellBarcodeReaderUtils.stdParamCheckResult(c, "value", "string",
                    g, d)) && (a = HoneywellBarcodeReaderUtils.getSettingDef(f ? HowneywellBarcodeReaderRingSettings : HowneywellBarcodeReaderSwiftSettings, a, b, e, c, !0), this.logVar("setBuffered settingDef", a, !1), this.batchSetBuffer.push(a), 0 === a.status ? HoneywellBarcodeReaderUtils.isFunction(d) && (g.status = 0, g.message = "Set request successfully buffered.", setTimeout(function () { d(g) }, 0)) : HoneywellBarcodeReaderUtils.isFunction(d) && (g.status = a.status, g.message = a.message, setTimeout(function () { d(g) }, 0)))
        }, verifyActiveConnection: function (a) {
            return null ===
                this.scannerHandle ? (HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: HoneywellBarcodeReaderErrors.NO_CONNECTION, message: "No scanner connection" }) }, 0), !1) : !0
        }
    }; HoneywellBarcodeReadersSwiftWin = function (a) { HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: 0, message: HoneywellBarcodeReaderUtils.MSG_OPERATION_COMPLETED }) }, 0) }; HoneywellBarcodeReadersSwiftWin.prototype = {
        version: "1.20.00.0334", getAvailableBarcodeReaders: function (a) {
            function b(b, d) {
                if (b) {
                    var e;
                    try { e = JSON.parse(b) } catch (g) { if (d) { setTimeout(function () { a([]) }, 0); return } return [] } if (HoneywellBarcodeReaderUtils.hasProperty(e, "result", !0)) if (HoneywellBarcodeReaderUtils.hasProperty(e.result, "deviceInfoList", !0)) if (d) setTimeout(function () { a(e.result.deviceInfoList) }, 0); else return e.result.deviceInfoList; else if (d) setTimeout(function () { a([]) }, 0); else return []; else if (d) setTimeout(function () { a([]) }, 0); else return []
                } else if (d) setTimeout(function () { a([]) }, 0); else return []
            } var e; e = HoneywellBarcodeReaderUtils.getRandomInt(1E4,
                99999); if (HoneywellBarcodeReaderUtils.isFunction(a)) return win10ScannerBridge.getAvailableBarcodeReadersAsync(e).then(function (a) { b(a, !0) }), []; e = win10ScannerBridge.getAvailableBarcodeReaders(e); return b(e, !1)
        }
    }
})();
;/**
* BarcodeReader-SwiftSettings.js
* @file This file defines the mappings between the scanning API symbology
* settings and Honeywell swift decoder settings. It is dynamically loaded
* depending on the running platform and scanner type. It is used for the
* following platforms and scanners:
* - Dolphin CT50 Android with internal scanner
* - Dolphin D75e Android with internal scanner
* - Dolphin D75e Android with ring scanner
* - CN51 Android 6.0 with internal scanner
* - Dolphin CT50 Win10 IoT Mobile with internal scanner
* - Dolphin D75e Win10 IoT Mobile with internal scanner
*
* @version 1.00.00.0
*/
var HowneywellBarcodeReaderSwiftSettings =
    [
        {
            "family": "Symbology",
            "key": "AustralianPost",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": "australia" }, { "false": "none" }],
            "reverseValueMap": [{ "australia": "true" }, { "*": "false" }],
            "command": "DEC_POSTAL_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Aztec",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_AZTEC_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "BPO",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": "bpo" }, { "false": "none" }],
            "reverseValueMap": [{ "bpo": "true" }, { "*": "false" }],
            "command": "DEC_POSTAL_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "CanadaPost",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": "canada" }, { "false": "none" }],
            "reverseValueMap": [{ "canada": "true" }, { "*": "false" }],
            "command": "DEC_POSTAL_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Codabar",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_CODABAR_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "CodablockA",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_CODABLOCK_A_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "CodablockF",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_CODABLOCK_F_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Code11",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_CODE11_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Code39",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_CODE39_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Code39",
            "option": "EnableTriopticCode39",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_TRIOPTIC_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Code93",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_CODE93_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Code128",
            "option": "EnableCode128",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_CODE128_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Code128",
            "option": "EnableGS1_128",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_GS1_128_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Code128",
            "option": "EnableISBT_128",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_C128_ISBT_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "DataMatrix",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_DATAMATRIX_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "DutchPost",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": "dutch" }, { "false": "none" }],
            "reverseValueMap": [{ "dutch": "true" }, { "*": "false" }],
            "command": "DEC_POSTAL_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EnableUPCA",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_UPCA_ENABLE"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EnableUPCE",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_UPCE0_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EnableEAN8",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_EAN8_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EnableEAN13",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_EAN13_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EnableUPC_E1",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_UPCE1_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "GS1Composite",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_COMPOSITE_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "GS1DataBarExpanded",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_RSS_EXPANDED_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "GS1DataBarLimited",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_RSS_LIMITED_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "GS1DataBarOmniDirectional",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_RSS_14_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Infomail",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": "infomail" }, { "false": "none" }],
            "reverseValueMap": [{ "infomail": "true" }, { "*": "false" }],
            "command": "DEC_POSTAL_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "IntelligentMail",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": "usps" }, { "false": "none" }],
            "reverseValueMap": [{ "usps": "true" }, { "*": "false" }],
            "command": "DEC_POSTAL_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Interleaved2Of5",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_I25_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "JapanPost",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": "japan" }, { "false": "none" }],
            "reverseValueMap": [{ "japan": "true" }, { "*": "false" }],
            "command": "DEC_POSTAL_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Matrix2Of5",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_M25_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Maxicode",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_MAXICODE_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "MicroPDF417",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_MICROPDF_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "MSI",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_MSI_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "PDF417",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_PDF417_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Planet",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": "planet" }, { "false": "none" }],
            "reverseValueMap": [{ "planet": "true" }, { "*": "false" }],
            "command": "DEC_POSTAL_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Postnet",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": "postnet" }, { "false": "none" }],
            "reverseValueMap": [{ "postnet": "true" }, { "*": "false" }],
            "command": "DEC_POSTAL_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "QRCode",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_QR_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Standard2Of5",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_S25_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "SwedenPost",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": "sweden" }, { "false": "none" }],
            "reverseValueMap": [{ "sweden": "true" }, { "*": "false" }],
            "command": "DEC_POSTAL_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Telepen",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_TELEPEN_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "TLC39",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_TLC39_ENABLED"
        },


        {
            "family": "Symbology",
            "key": "Aztec",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 3852 }],
            "command": "DEC_AZTEC_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Aztec",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 3852 }],
            "command": "DEC_AZTEC_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "Codabar",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 48 }],
            "command": "DEC_CODABAR_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Codabar",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 48 }],
            "command": "DEC_CODABAR_MAX_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Codabar",
            "option": "CheckDigitMode",
            "valueType": "list",
            "values": ["noCheck", "check", "checkAndStrip"],
            "command": "DEC_CODABAR_CHECK_DIGIT_MODE"
        },
        {
            "family": "Symbology",
            "key": "Codabar",
            "option": "StartStopTransmit",
            "valueType": "map",
            "valueMap": [{ "A,B,C,D": true }, { "Disable": false }],
            "command": "DEC_CODABAR_START_STOP_TRANSMIT"
        },

        {
            "family": "Symbology",
            "key": "CodablockA",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 2048 }],
            "command": "DEC_CODABLOCK_A_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "CodablockA",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 2048 }],
            "command": "DEC_CODABLOCK_A_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "CodablockF",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 2048 }],
            "command": "DEC_CODABLOCK_F_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "CodablockF",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 2048 }],
            "command": "DEC_CODABLOCK_F_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "Code11",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 48 }],
            "command": "DEC_CODE11_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Code11",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 48 }],
            "command": "DEC_CODE11_MAX_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Code11",
            "option": "CheckDigitMode",
            "valueType": "list",
            "values": ["doubleDigitCheck", "singleDigitCheck",
                "doubleDigitCheckAndStrip", "singleDigitCheckAndStrip"],
            "command": "DEC_CODE11_CHECK_DIGIT_MODE"
        },

        {
            "family": "Symbology",
            "key": "Code39",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 48 }],
            "command": "DEC_CODE39_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Code39",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 48 }],
            "command": "DEC_CODE39_MAX_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Code39",
            "option": "CheckDigitMode",
            "valueType": "list",
            "values": ["noCheck", "check", "checkAndStrip"],
            "command": "DEC_CODE39_CHECK_DIGIT_MODE"
        },
        {
            "family": "Symbology",
            "key": "Code39",
            "option": "FullAsciiEnabled",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_CODE39_FULL_ASCII_ENABLED"
        },
        {
            "family": "Symbology",
            "key": "Code39",
            "option": "StartStopTransmission",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_CODE39_START_STOP_TRANSMIT"
        },

        {
            "family": "Symbology",
            "key": "Code93",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 80 }],
            "command": "DEC_CODE93_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Code93",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 80 }],
            "command": "DEC_CODE93_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "Code128",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 80 }],
            "command": "DEC_CODE128_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Code128",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 80 }],
            "command": "DEC_CODE128_MAX_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Code128",
            "option": "GS1_128_MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 80 }],
            "command": "DEC_GS1_128_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Code128",
            "option": "GS1_128_MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 80 }],
            "command": "DEC_GS1_128_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "DataMatrix",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 3166 }],
            "command": "DEC_DATAMATRIX_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "DataMatrix",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 3166 }],
            "command": "DEC_DATAMATRIX_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "UPCACheckDigit",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_UPCA_CHECK_DIGIT_TRANSMIT"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "UPCECheckDigit",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_UPCE_CHECK_DIGIT_TRANSMIT"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EAN8CheckDigit",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_EAN8_CHECK_DIGIT_TRANSMIT"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EAN13CheckDigit",
            "valueType": "map",
            "valueMap": [{ "true": true }, { "false": false }],
            "command": "DEC_EAN13_CHECK_DIGIT_TRANSMIT"
        },

        {
            "family": "Symbology",
            "key": "GS1DataBarExpanded",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 80 }],
            "command": "DEC_RSS_EXPANDED_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "GS1DataBarExpanded",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 80 }],
            "command": "DEC_RSS_EXPANDED_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "Interleaved2Of5",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 48 }],
            "command": "DEC_I25_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Interleaved2Of5",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 48 }],
            "command": "DEC_I25_MAX_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Interleaved2Of5",
            "option": "CheckDigitMode",
            "valueType": "list",
            "values": ["noCheck", "check", "checkAndStrip"],
            "command": "DEC_I25_CHECK_DIGIT_MODE"
        },

        {
            "family": "Symbology",
            "key": "Matrix2Of5",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 4 }, { "max": 80 }],
            "command": "DEC_M25_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Matrix2Of5",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 4 }, { "max": 80 }],
            "command": "DEC_M25_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "Maxicode",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 150 }],
            "command": "DEC_MAXICODE_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Maxicode",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 150 }],
            "command": "DEC_MAXICODE_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "MicroPDF417",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 2750 }],
            "command": "DEC_MICROPDF_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "MicroPDF417",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 2750 }],
            "command": "DEC_MICROPDF_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "MSI",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 48 }],
            "command": "DEC_MSI_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "MSI",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 0 }, { "max": 48 }],
            "command": "DEC_MSI_MAX_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "MSI",
            "option": "CheckDigitMode",
            "valueType": "list",
            "values": ["noCheck", "singleMod10Check", "singleMod10PlusMod10Check",
                "doubleMod10Check", "singleMod10CheckAndStrip", "doubleMod10CheckAndStrip"],
            "command": "DEC_MSI_CHECK_DIGIT_MODE"
        },

        {
            "family": "Symbology",
            "key": "PDF417",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 2750 }],
            "command": "DEC_PDF417_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "PDF417",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 2750 }],
            "command": "DEC_PDF417_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "QRCode",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 7089 }],
            "command": "DEC_QR_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "QRCode",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 7089 }],
            "command": "DEC_QR_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "Standard2Of5",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 4 }, { "max": 48 }],
            "command": "DEC_S25_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Standard2Of5",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 4 }, { "max": 48 }],
            "command": "DEC_S25_MAX_LENGTH"
        },

        {
            "family": "Symbology",
            "key": "Telepen",
            "option": "MinLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 60 }],
            "command": "DEC_TELEPEN_MIN_LENGTH"
        },
        {
            "family": "Symbology",
            "key": "Telepen",
            "option": "MaxLen",
            "valueType": "int",
            "valueRange": [{ "min": 1 }, { "max": 60 }],
            "command": "DEC_TELEPEN_MAX_LENGTH"
        }
    ];

;/**
* BarcodeReader-WinRingSettings.js
* @file This file defines the mappings between the scanning API symbology
* settings and Honeywell ring scanner decoder settings. It is dynamically
* loaded depending on the running platform and scanner type. It is used for
* the following platforms and scanners:
* - Dolphin D75e Win10 IoT Mobile with ring scanner
*
* @version 1.00.00.0
*/
var HowneywellBarcodeReaderRingSettings =
    [
        {
            "family": "Symbology",
            "key": "AustralianPost",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "reverseValueMap": [{ 1: "true" }, { "*": "false" }],
            "command": "POSTAL"
        },
        {
            "family": "Symbology",
            "key": "Aztec",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "AZTENA"
        },
        {
            "family": "Symbology",
            "key": "BPO",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 7 }, { "false": 0 }],
            "reverseValueMap": [{ 7: "true" }, { "*": "false" }],
            "command": "POSTAL"
        },
        {
            "family": "Symbology",
            "key": "CanadaPost",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 30 }, { "false": 0 }],
            "reverseValueMap": [{ 30: "true" }, { "*": "false" }],
            "command": "POSTAL"
        },
        {
            "family": "Symbology",
            "key": "Codabar",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "CBRENA"
        },
        {
            "family": "Symbology",
            "key": "CodablockA",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "CBAENA"
        },
        {
            "family": "Symbology",
            "key": "CodablockF",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "CBFENA"
        },
        {
            "family": "Symbology",
            "key": "Code11",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "C11ENA"
        },
        {
            "family": "Symbology",
            "key": "Code39",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "C39ENA"
        },
        {
            "family": "Symbology",
            "key": "Code39",
            "option": "EnableTriopticCode39",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "TRIENA"
        },
        {
            "family": "Symbology",
            "key": "Code93",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "C93ENA"
        },
        {
            "family": "Symbology",
            "key": "Code128",
            "option": "EnableCode128",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "128ENA"
        },
        {
            "family": "Symbology",
            "key": "Code128",
            "option": "EnableGS1_128",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "GS1ENA"
        },
        {
            "family": "Symbology",
            "key": "Code128",
            "option": "EnableISBT_128",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "ISBENA"
        },
        {
            "family": "Symbology",
            "key": "DataMatrix",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "IDMENA"
        },
        {
            "family": "Symbology",
            "key": "DutchPost",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 4 }, { "false": 0 }],
            "reverseValueMap": [{ 4: "true" }, { "*": "false" }],
            "command": "POSTAL"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EnableUPCA",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "UPAENA"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EnableUPCE",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "UPEEN0"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EnableEAN8",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "EA8ENA"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EnableEAN13",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "E13ENA"
        },
        {
            "family": "Symbology",
            "key": "EANUPC",
            "option": "EnableUPC_E1",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "UPEEN1"
        },
        {
            "family": "Symbology",
            "key": "GS1DataBarExpanded",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "RSEENA"
        },
        {
            "family": "Symbology",
            "key": "GS1DataBarLimited",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "RSLENA"
        },
        {
            "family": "Symbology",
            "key": "GS1DataBarOmniDirectional",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "RSSENA"
        },
        {
            "family": "Symbology",
            "key": "Infomail",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 2 }, { "false": 0 }],
            "reverseValueMap": [{ 2: "true" }, { "*": "false" }],
            "command": "POSTAL"
        },
        {
            "family": "Symbology",
            "key": "IntelligentMail",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 10 }, { "false": 0 }],
            "reverseValueMap": [{ 10: "true" }, { "*": "false" }],
            "command": "POSTAL"
        },
        {
            "family": "Symbology",
            "key": "Interleaved2Of5",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "I25ENA"
        },
        {
            "family": "Symbology",
            "key": "JapanPost",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 3 }, { "false": 0 }],
            "reverseValueMap": [{ 3: "true" }, { "*": "false" }],
            "command": "POSTAL"
        },
        {
            "family": "Symbology",
            "key": "Matrix2Of5",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "X25ENA"
        },
        {
            "family": "Symbology",
            "key": "Maxicode",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "MAXENA"
        },
        {
            "family": "Symbology",
            "key": "MicroPDF417",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "MPDENA"
        },
        {
            "family": "Symbology",
            "key": "MSI",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "MSIENA"
        },
        {
            "family": "Symbology",
            "key": "PDF417",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "PDFENA"
        },
        {
            "family": "Symbology",
            "key": "Planet",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 5 }, { "false": 0 }],
            "reverseValueMap": [{ 5: "true" }, { "*": "false" }],
            "command": "POSTAL"
        },
        {
            "family": "Symbology",
            "key": "Postnet",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 6 }, { "false": 0 }],
            "reverseValueMap": [{ 6: "true" }, { "*": "false" }],
            "command": "POSTAL"
        },
        {
            "family": "Symbology",
            "key": "QRCode",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "QRCENA"
        },
        {
            "family": "Symbology",
            "key": "Standard2Of5",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "R25ENA"
        },
        {
            "family": "Symbology",
            "key": "Telepen",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "TELENA"
        },
        {
            "family": "Symbology",
            "key": "TLC39",
            "option": "Enable",
            "valueType": "map",
            "valueMap": [{ "true": 1 }, { "false": 0 }],
            "command": "T39ENA"
        },
    ];
;var HoneywellBarcodeReaderUtils = {
    BRIDGE_TYPE_AJAX: "AJAX", BRIDGE_TYPE_NATIVE_WINRT_OBJECT: "NativeWinRTObject", BRIDGE_TYPE_NPAPI: "NPAPI", BRIDGE_TYPE_NONE: "None", DECODER_TYPE_SWIFT: "Swift", DECODER_TYPE_INTERMEC: "In2Decode", MSG_OPERATION_COMPLETED: "Operation completed successfully.", embedNode: null, bridgeType: null, bcrPlugin: null, barcodeReaderObjName: null, checkNpapiPlugin: function () {
        if (!this.embedNode) try {
            this.embedNode = document.createElement("embed"), this.embedNode.setAttribute("id", "bcrPlugin"), this.embedNode.setAttribute("width",
                "0"), this.embedNode.setAttribute("height", "0"), this.embedNode.setAttribute("type", "application/x-npBarcodeReaderPlugin"), document.body.appendChild(this.embedNode), this.bcrPlugin = document.getElementById("bcrPlugin"), this.bcrPlugin.ITCLogString("Found bcrPlugin element"), this.bridgeType = this.BRIDGE_TYPE_NPAPI
        } catch (a) { return !1 } return !0
    }, convertScannerSettingValue: function (a, d, e) {
        var g = !1; if (e && this.hasProperty(a, "valueType", !0)) if ("map" === a.valueType) if (this.hasProperty(a, "reverseValueMap", !0) && a.reverseValueMap instanceof
            Array) { for (var c, h = 0, b = a.reverseValueMap.length; h < b; h++)for (var l in a.reverseValueMap[h]) if (l === d) { e.value = a.reverseValueMap[h][l]; g = !0; break } else "*" === l && (c = a.reverseValueMap[h][l]); g || "undefined" === typeof c || (e.value = c, g = !0) } else { if (this.hasProperty(a, "valueMap", !0) && a.valueMap instanceof Array) for (h = 0, b = a.valueMap.length; h < b; h++)for (l in a.valueMap[h]) if (a.valueMap[h][l] === d) { e.value = l; g = !0; break } } else "int" === a.valueType ? (e.value = d.toString(), g = !0) : "string" === typeof d && (e.value = d, g = !0); return g
    },
    getRandomInt: function (a, d) { return Math.floor(Math.random() * (d - a + 1)) + a }, getSettingDef: function (a, d, e, g, c, h) {
        var b = {}, l = !1; b.status = 0; b.message = this.MSG_OPERATION_COMPLETED; b.family = d; b.key = e; b.option = g; if (a && a instanceof Array) {
            for (var n = 0, m = a.length; n < m && 0 === b.status; n++) {
                var f = a[n]; if (this.hasProperty(f, "family", !0) && f.family === d && (l || (l = !0), this.hasProperty(f, "key", !0) && f.key === e && this.hasProperty(f, "option", !0) && f.option === g)) {
                    if (this.hasProperty(f, "command", !0)) b.command = f.command; else {
                        b.status =
                            HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF; b.message = "Setting definition missing command property."; break
                    } if (this.hasProperty(f, "valueType", !0)) if (b.valueType = f.valueType, "map" === f.valueType) {
                        if (this.hasProperty(f, "valueMap", !0)) if (f.valueMap instanceof Array) {
                            if (b.valueMap = f.valueMap, h) if ("undefined" !== typeof c) {
                                for (var k = 0, p = f.valueMap.length; k < p; k++)if (this.hasProperty(f.valueMap[k], c, !0)) { b.value = f.valueMap[k][c]; break } "undefined" === typeof b.value && (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE,
                                    b.message = "Invalid setting value.")
                            } else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, b.message = "Invalid setting value."
                        } else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Settings definition has invalid valueMap property, not an array."; else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Settings definition missing valueMap property for map type."; this.hasProperty(f, "reverseValueMap", !0) && (f.reverseValueMap instanceof Array ? b.reverseValueMap =
                            f.reverseValueMap : (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Settings definition has invalid reverseValueMap property, not an array."))
                    } else if ("int" === f.valueType) this.hasProperty(f, "valueRange", !0) ? f.valueRange instanceof Array ? (b.valueRange = f.valueRange, h && (c && !isNaN(c) ? b.value = parseInt(c) : (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, b.message = "Invalid setting value, not a number."))) : (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message =
                        "Setting definition has invalid valueRange property, not an array.") : (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Setting definition missing valueRange property for int type."); else if ("string" === f.valueType) h && (b.value = c); else if ("list" === f.valueType) if (this.hasProperty(f, "values", !0)) if (f.values instanceof Array) {
                            if (b.values = f.values, h) if ("undefined" !== typeof c) {
                                k = 0; for (p = f.values.length; k < p; k++)if (f.values[k] === c) { b.value = c; break } "undefined" === typeof b.value && (b.status =
                                    HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, b.message = "Invalid setting value.")
                            } else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, b.message = "Invalid setting value."
                        } else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Setting definition has invalid values property, not an array."; else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Setting definition missing values property for list type."; else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF,
                            b.message = "Unsupported setting value data type: " + f.valueType; else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Setting definition missing valueType property."
                }
            } 0 !== b.status || b.command || (l ? (b.status = HoneywellBarcodeReaderErrors.UNSUPPORTED_KEY_OR_OPTION, b.message = "Unsupported key or option name") : (b.status = HoneywellBarcodeReaderErrors.UNSUPPORTED_FAMILY_NAME, b.message = "Unsupported family name: " + d))
        } else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message =
            "Invalid settings definition object, needs to be an array."; return b
    }, getSymbologyName: function (a, d) { var e = "", g = HoneywellSymbologyIDTable.length, c, h = 0; if (!a) return e; for (c = 0; c < g; c++)if (a === HoneywellSymbologyIDTable[c].honeywellId) { e = HoneywellSymbologyIDTable[c].name; h = c; break } if (e && d && "j" === a) for (c = h; c < g; c++)if (1 === d.indexOf(HoneywellSymbologyIDTable[c].aimId, 1)) { e = HoneywellSymbologyIDTable[c].name; break } return e }, hasJsonRpcError: function (a) {
        return "object" === typeof a && a.hasOwnProperty("error") && a.error ?
            a.error.hasOwnProperty("code") && a.error.hasOwnProperty("message") : !1
    }, hasProperty: function (a, d, e) { return "object" === typeof a && a.hasOwnProperty(d) ? e ? null !== a[d] : !0 : !1 }, isFunction: function (a) { return typeof a == typeof Function }, sendJsonRpcRequestSubSys: function (a, d, e) {
        var g = this, c, h =
            this.getRandomInt(1E4, 99999); d.id = h; d.jsonrpc = "2.0"; if (window.XMLHttpRequest) c = new XMLHttpRequest, c.onreadystatechange = function () {
                if (4 == c.readyState) if (200 == c.status) { var b; try { b = JSON.parse(c.responseText) } catch (a) { g.isFunction(e) && (b = { jsonrpc: "2.0" }, b.id = h, b.error = {}, b.error.code = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, b.error.message = "JSON-RPC parsing error in response.", setTimeout(function () { e(b) }, 0)); return } h == b.id && g.isFunction(e) && setTimeout(function () { e(b) }, 0) } else g.isFunction(e) && (b =
                    { jsonrpc: "2.0" }, b.id = h, b.error = {}, b.error.code = HoneywellBarcodeReaderErrors.WEB_SERVICE_NOT_RESPONDING, b.error.message = "Web service not responding.", setTimeout(function () { e(b) }, 0))
            }, c.open("POST", "http://127.0.0.1:8080/jsonrpc/" + a, !0), c.send(JSON.stringify(d)); else if (g.isFunction(e)) { var b = { jsonrpc: "2.0" }; b.id = h; b.error = {}; b.error.code = HoneywellBarcodeReaderErrors.AJAX_NOT_SUPPORTED; b.error.message = "Browser does not support XMLHttpRequest"; setTimeout(function () { e(b) }, 0) }
    }, setup: function () {
        var a = this;
        a.bridgeType || ("undefined" !== typeof win10EnterpriseBrowserInfo ? (a.bridgeType = a.BRIDGE_TYPE_NATIVE_WINRT_OBJECT, a.barcodeReaderObjName = "HoneywellBarcodeReaderSwiftWin") :
            !1 == a.checkNpapiPlugin() && a.sendJsonRpcRequestSubSys("datacollection", {
                method: "scanner.getInfo"
            }, function (d) {
                if (a.hasProperty(d, "result", !0) || a.hasJsonRpcError(d)) a.bridgeType = a.BRIDGE_TYPE_AJAX, a.barcodeReaderObjName = "HoneywellBarcodeReaderAjax"
            }))
    }, stdParamCheck: function (a, d, e, g) {
        if (typeof a ===
            e) return !0; this.isFunction(g) && setTimeout(function () { g({ status: HoneywellBarcodeReaderErrors.INVALID_PARAMETER, message: "Invalid parameter: " + d + ", must be " + e }) }, 0); return !1
    }, stdParamCheckResult: function (a, d, e, g, c) {
        if (typeof a === e) return !0; this.isFunction(c) && (g ? (g.status = HoneywellBarcodeReaderErrors.INVALID_PARAMETER, g.message = "Invalid parameter: " + d + ", must be " + e, setTimeout(function () { c(g) }, 0)) : setTimeout(function () {
            c({
                status: HoneywellBarcodeReaderErrors.INVALID_PARAMETER, message: "Invalid parameter: " +
                    d + ", must be " + e
            })
        }, 0)); return !1
    }, stdErrorCheck: function (a, d) { var e = this; if (this.hasProperty(a, "result", !1)) return this.isFunction(d) && setTimeout(function () { d({ status: 0, message: e.MSG_OPERATION_COMPLETED }) }, 0), !0; this.hasJsonRpcError(a) ? this.isFunction(d) && setTimeout(function () { d({ status: a.error.code, message: a.error.message }) }, 0) : this.isFunction(d) && setTimeout(function () { d({ status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, message: "JSON-RPC parsing error in response." }) }, 0); return !1 }
}, HoneywellBarcodeReaderErrors =
    {
        JS_BARCODE_READER_FACILITY_CODE: 2337, ERROR_CODE_BASE: 16500, JSON_PARSE_ERROR: -32700, FEATURE_NOT_SUPPORTED: -1994391502, FUNCTION_FAILED: -1994389925, INVALID_PARAMETER: -1994391465, INSUFFICIENT_BUFFER_SIZE: -1994391430, OUT_OF_MEMORY: -1994391544, INVALID_SETTING_VALUE: -1994326003, SCANNER_NOT_FOUND: -1994375551, SETTING_VALUE_EXCEED_MAX_LEN: -1994309986, SETTING_VALUE_OUT_OF_RANGE: -1994309985, UNSUPPORTED_FAMILY_NAME: -1994309984, UNSUPPORTED_KEY_OR_OPTION: -1994309983, CHAR_CONVERSION_ERROR: -1994309982, get NO_CONNECTION() { return this.formatError(1229) },
        get NO_AVAILABLE_BRIDGE() { return this.formatError(this.ERROR_CODE_BASE + 1) }, get AJAX_NOT_SUPPORTED() { return this.formatError(this.ERROR_CODE_BASE + 2) }, get WEB_SERVICE_NOT_RESPONDING() { return this.formatError(this.ERROR_CODE_BASE + 3) }, get MISSING_SETTINGS_DEF() { return this.formatError(this.ERROR_CODE_BASE + 4) }, get INVALID_SETTINGS_DEF() { return this.formatError(this.ERROR_CODE_BASE + 5) }, get EMPTY_COMMIT_BUFFER() { return this.formatError(this.ERROR_CODE_BASE + 6) }, formatError: function (a) {
            var d = 0; 0 != a && 0 == (a &
                4294901760) && (d = 2147483648 | this.JS_BARCODE_READER_FACILITY_CODE << 16 | a); return d
        }
    }, HoneywellSymbologyIDTable = [{ name: "AUSTRALIAPOST", honeywellId: "A", aimId: "X0" }, { name: "AZTEC", honeywellId: "z", aimId: "z3" }, { name: "BPO", honeywellId: "B", aimId: "X0" }, { name: "CANADAPOST", honeywellId: "C", aimId: "X0" }, { name: "CODABAR", honeywellId: "a", aimId: "F0" }, { name: "CodablockA", honeywellId: "V", aimId: "O6" }, { name: "CodablockF", honeywellId: "q", aimId: "O4" }, { name: "Code11", honeywellId: "h", aimId: "H1" }, { name: "Code39", honeywellId: "b", aimId: "A0" },
    { name: "Code93", honeywellId: "i", aimId: "G0" }, { name: "Code128", honeywellId: "j", aimId: "C0" }, { name: "GS1_128", honeywellId: "I", aimId: "C1" }, { name: "ISBT128", honeywellId: "j", aimId: "C4" }, { name: "DATAMATRIX", honeywellId: "w", aimId: "d1" }, { name: "EAN8", honeywellId: "D", aimId: "E4" }, { name: "EAN13", honeywellId: "d", aimId: "E0" }, { name: "CHINAPOST", honeywellId: "Q", aimId: "X0" }, { name: "DUTCHPOST", honeywellId: "K", aimId: "X0" }, { name: "GS1EX", honeywellId: "}", aimId: "e0" }, { name: "GS1LI", honeywellId: "{", aimId: "e0" }, {
        name: "GS1OD", honeywellId: "y",
        aimId: "e0"
    }, { name: "HANXIN", honeywellId: "H", aimId: "X0" }, { name: "INFOMAIL", honeywellId: ",", aimId: "X0" }, { name: "INTELLIGENTMAIL", honeywellId: "M", aimId: "X0" }, { name: "ITF", honeywellId: "e", aimId: "I0" }, { name: "ITFMatrix", honeywellId: "m", aimId: "X0" }, { name: "ITFStandard", honeywellId: "f", aimId: "S0" }, { name: "JAPANPOST", honeywellId: "J", aimId: "X0" }, { name: "KOREANPOST", honeywellId: "?", aimId: "X0" }, { name: "MAXICODE", honeywellId: "x", aimId: "U0" }, { name: "MICROPDF", honeywellId: "R", aimId: "L0" }, { name: "MSI", honeywellId: "g", aimId: "M0" },
    { name: "PDF417", honeywellId: "r", aimId: "L0" }, { name: "PLANET", honeywellId: "L", aimId: "X0" }, { name: "POSTNET", honeywellId: "P", aimId: "X0" }, { name: "QR", honeywellId: "s", aimId: "Q1" }, { name: "SWEDENPOST", honeywellId: "[", aimId: "X0" }, { name: "TELEPEN", honeywellId: "t", aimId: "B1" }, { name: "TLC39", honeywellId: "T", aimId: "L2" }, { name: "TRIOPTIC", honeywellId: "\x3d", aimId: "X0" }, { name: "UPCA", honeywellId: "c", aimId: "E0" }, { name: "UPCE", honeywellId: "E", aimId: "E0" }], HoneywellBarcodeReaderWebEventDispatcher = {
        defaultScannerName: "dcs.scanner.imager",
        create: function (a) {
            function d(b, g) { if (typeof HoneywellBarcodeReaderUtils.log === typeof Function) { var a = b ? b + " " : ""; "object" === typeof g ? HoneywellBarcodeReaderUtils.log(a + JSON.stringify(g)) : HoneywellBarcodeReaderUtils.log(a + g) } } var e = "http://127.0.0.1:8080/jsonrpc/" + a + "/events", g = !1, c = null, h = null, b = 1, l = function () { }, n = function () { }, m, f, k, p = function () {
                f || ("undefined" !== typeof document.webkitHidden ? (f = "webkitHidden", k = "webkitvisibilitychange") : "undefined" !== typeof document.hidden && (f = "hidden", k = "visibilitychange"));
                f && "undefined" !== typeof document.addEventListener && !m && (m = function () { document[f] || (g = !0, q(), d("handleDocVisibilityChangeEvent", "requestEvents")) }, document.addEventListener(k, m, !1))
            }, r = function (b) { b != g && (g = b) && q(); b ? p() : m && (document.removeEventListener(k, m), m = null) }, q = function () {
                var a = new XMLHttpRequest; a.open("POST", e, !0); a.setRequestHeader("Content-Type", "application/json"); a.onreadystatechange = function () {
                    var b; if (4 == a.readyState) if (200 == a.status) try {
                        if (b = JSON.parse(a.responseText), HoneywellBarcodeReaderUtils.hasProperty(b,
                            "result", !0)) { var e = b.result.session; e && (c = e); if (HoneywellBarcodeReaderUtils.hasProperty(b.result, "events", !0)) { 0 < b.result.events.length && d("Barcode event response:", b); var f, k; for (f = 0; f < b.result.events.length; f++)k = b.result.events[f], l(k.method, k.params, h) } g && q() } else b.error && (n(b.error.code, b.error.message), d("events.getNext error response:", "code: " + b.error.code + " message: " + b.error.message))
                    } catch (m) { d("Failed to handle response", a.responseText), n(-1, m.message), g = !1 } else d("HTTP error", "status " +
                        a.status + " " + a.statusText), n(a.status, a.statusText), g = !1
                }; var f = { id: b++, jsonrpc: "2.0", method: "events.getNext", params: { timeout: s.eventTimeout } }; c && (f.params.session = c); null !== h && (f.params.filter = h); try { a.send(JSON.stringify(f)) } catch (k) { n(a.status, a.statusText), g = !1 }
            }, s = {
                eventTimeout: 60, startSession: function (b) {
                    l = HoneywellBarcodeReaderUtils.hasProperty(b, "event", !0) ? b.event : function () { }; n = HoneywellBarcodeReaderUtils.hasProperty(b, "error", !0) ? b.error : function () { }; h = HoneywellBarcodeReaderUtils.hasProperty(b,
                        "filter", !0) ? b.filter : null; r(!0); d(null, "Event session started")
                }, stopSession: function () { r(!1); d(null, "Event session stopped") }
            }; return s
        }
    };
(function (a) {
    var d = 0; HoneywellBarcodeReaderUtils.setup(); var e = function (a) { HoneywellBarcodeReaderUtils.barcodeReaderObjName ? setTimeout(function () { a() }, 0) : 5E3 > d ? (d += 100, setTimeout(function () { e(a) }, 100)) : setTimeout(function () { a() }, 0) }; a.BarcodeReader = function (a, c) {
        var d = this; e(function () {
            HoneywellBarcodeReaderUtils.barcodeReaderObjName ? "HoneywellBarcodeReaderSwiftWin" === HoneywellBarcodeReaderUtils.barcodeReaderObjName ? d.barcodeReader = new HoneywellBarcodeReaderSwiftWin(a, c) : "HoneywellBarcodeReaderAjax" ===
                HoneywellBarcodeReaderUtils.barcodeReaderObjName ? d.barcodeReader = new HoneywellBarcodeReaderAjax(a, c) : HoneywellBarcodeReaderUtils.isFunction(c) && setTimeout(function () { c({ status: HoneywellBarcodeReaderErrors.NO_AVAILABLE_BRIDGE, message: "No available JavaScript to Native bridge found." }) }, 0) : HoneywellBarcodeReaderUtils.isFunction(c) && setTimeout(function () { c({ status: HoneywellBarcodeReaderErrors.NO_AVAILABLE_BRIDGE, message: "No available JavaScript to Native bridge found." }) }, 0)
        })
    }; a.BarcodeReader.prototype =
        {
            version: "1.20.00.0334", barcodeReader: null, activate: function (a, c) { this.barcodeReader && "undefined" !== typeof this.barcodeReader.activate ? this.barcodeReader.activate(a, c) : HoneywellBarcodeReaderUtils.isFunction(c) && setTimeout(function () { c({ status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED, message: "Method is not supported" }) }, 0) }, addEventListener: function (a, c, d) { this.barcodeReader && "undefined" !== typeof this.barcodeReader.addEventListener && this.barcodeReader.addEventListener(a, c, d) }, clearBuffer: function () {
                this.barcodeReader &&
                    "undefined" !== typeof this.barcodeReader.clearBuffer && this.barcodeReader.clearBuffer()
            }, close: function (a) { this.barcodeReader && "undefined" !== typeof this.barcodeReader.close ? this.barcodeReader.close(a) : HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED, message: "Method is not supported" }) }, 0) }, commitBuffer: function (a) {
                this.barcodeReader && "undefined" !== typeof this.barcodeReader.commitBuffer ? this.barcodeReader.commitBuffer(a) : HoneywellBarcodeReaderUtils.isFunction(a) &&
                    setTimeout(function () { a({ status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED, message: "Method is not supported" }) }, 0)
            }, directIO: function (a, c) { this.barcodeReader && "undefined" !== typeof this.barcodeReader.directIO ? this.barcodeReader.directIO(a, c) : HoneywellBarcodeReaderUtils.isFunction(c) && setTimeout(function () { c({ status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED, message: "Method is not supported" }) }, 0) }, enableTrigger: function (a, c) {
                this.barcodeReader && "undefined" !== typeof this.barcodeReader.enableTrigger ?
                    this.barcodeReader.enableTrigger(a, c) : HoneywellBarcodeReaderUtils.isFunction(c) && setTimeout(function () { c({ status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED, message: "Method is not supported" }) }, 0)
            }, get: function (a, c, d, b) { this.barcodeReader && "undefined" !== typeof this.barcodeReader.get ? this.barcodeReader.get(a, c, d, b) : HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED, message: "Method is not supported" }) }, 0) }, getBuffered: function (a,
                c, d, b) { this.barcodeReader && "undefined" !== typeof this.barcodeReader.getBuffered ? this.barcodeReader.getBuffered(a, c, d, b) : HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function () { b({ status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED, message: "Method is not supported" }) }, 0) }, getLicenseInfo: function (a) {
                    this.barcodeReader && "undefined" !== typeof this.barcodeReader.getLicenseInfo ? this.barcodeReader.getLicenseInfo(a) : HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () {
                        a({
                            status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                            message: "Method is not supported"
                        })
                    }, 0)
                }, removeEventListener: function (a, c) { this.barcodeReader && "undefined" !== typeof this.barcodeReader.removeEventListener && this.barcodeReader.removeEventListener(a, c) }, set: function (a, c, d, b, e) { this.barcodeReader && "undefined" !== typeof this.barcodeReader.set ? this.barcodeReader.set(a, c, d, b, e) : HoneywellBarcodeReaderUtils.isFunction(e) && setTimeout(function () { e({ status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED, message: "Method is not supported" }) }, 0) }, setBuffered: function (a,
                    c, d, b, e) { this.barcodeReader && "undefined" !== typeof this.barcodeReader.setBuffered ? this.barcodeReader.setBuffered(a, c, d, b, e) : HoneywellBarcodeReaderUtils.isFunction(e) && setTimeout(function () { e({ status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED, message: "Method is not supported" }) }, 0) }
        }; a.BarcodeReaders = function (a) {
            var c = this; e(function () {
                HoneywellBarcodeReaderUtils.barcodeReaderObjName ? "HoneywellBarcodeReaderSwiftWin" === HoneywellBarcodeReaderUtils.barcodeReaderObjName ? c.barcodeReaders = new HoneywellBarcodeReadersSwiftWin(a) :
                    "HoneywellBarcodeReaderAjax" === HoneywellBarcodeReaderUtils.barcodeReaderObjName ? c.barcodeReaders = new HoneywellBarcodeReadersAjax(a) : HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: HoneywellBarcodeReaderErrors.NO_AVAILABLE_BRIDGE, message: "No available JavaScript to Native bridge found." }) }, 0) : HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a({ status: HoneywellBarcodeReaderErrors.NO_AVAILABLE_BRIDGE, message: "No available JavaScript to Native bridge found." }) },
                        0)
            })
        }; a.BarcodeReaders.prototype = { version: "1.20.00.0334", barcodeReaders: null, getAvailableBarcodeReaders: function (a) { var c; this.barcodeReaders && "undefined" !== typeof this.barcodeReaders.getAvailableBarcodeReaders ? c = this.barcodeReaders.getAvailableBarcodeReaders(a) : (c = [], HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function () { a(c) }, 0)); return c } }
})(this);
;
//# sourceMappingURL=scripts.js.map