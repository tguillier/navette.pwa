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