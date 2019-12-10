(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>BarcodeReader API Demo</h3>\n\n<input type=\"button\" value=\"Open Reader\" id=\"openButton\" (click)=\"openButtonClicked()\" />\n<input type=\"button\" value=\"Close Reader\" id=\"closeButton\" (click)=\"closeButtonClicked()\" disabled /><br>\n<input type=\"button\" value=\"Activate Reader\" id=\"activateButton\" (click)=\"activateButtonClicked()\" disabled />\n<input type=\"button\" value=\"Deactivate Reader\" id=\"deactivateButton\" (click)=\"deactivateButtonClicked()\" disabled />\n<input type=\"button\" value=\"Remove Listener\" id=\"addEventListenerButton\" (click)=\"addEventListenerButtonClicked()\" disabled />\n<input type=\"button\" value=\"Disable Trigger\" id=\"enableTriggerButton\" (click)=\"enableTriggerButtonClicked()\" disabled />\n<input type=\"button\" value=\"Clear log\" id=\"clearLogButton\" (click)=\"clearLogButtonClicked()\" />\n\n<div>\n  <b>Barcode Data Read</b><br>\n  <label for=\"BarcodeData\">Data:</label><input type=\"text\" id=\"BarcodeData\" size=20 /><br>\n  <label for=\"SymbType\">Symbology:</label><input type=\"text\" id=\"SymbType\" size=16 /><br>\n  <label for=\"ReadTime\">Time:</label><input type=\"text\" id=\"ReadTime\" size=24 /><br>\n</div>\n\n<div><b>Log:</b></div>\n\n<div id=\"logMsg\">\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input[type=button] {\n  /* top right bottom left */\n  margin: 5px 20px 10px 0px;\n}\n\ninput[type=text] {\n  margin: 5px 10px;\n}\n\nselect {\n  margin: 5px 20px 10px 0px;\n  padding: 1px 0px 1px 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzpcXFVzZXJzXFx0Z3VpbGxpZVxcc291cmNlXFxyZXBvc1xcbmF2ZXR0ZS5wd2Evc3JjXFxhcHBcXGFwcC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMEJBQUE7RUFDQSx5QkFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7QUNDRjs7QURFQTtFQUNFLHlCQUFBO0VBQ0Esd0JBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlucHV0W3R5cGU9XCJidXR0b25cIl0ge1xyXG4gIC8qIHRvcCByaWdodCBib3R0b20gbGVmdCAqL1xyXG4gIG1hcmdpbjogNXB4IDIwcHggMTBweCAwcHg7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJ0ZXh0XCJdIHtcclxuICBtYXJnaW46IDVweCAxMHB4O1xyXG59XHJcblxyXG5zZWxlY3Qge1xyXG4gIG1hcmdpbjogNXB4IDIwcHggMTBweCAwcHg7XHJcbiAgcGFkZGluZzogMXB4IDBweCAxcHggMHB4O1xyXG59IiwiaW5wdXRbdHlwZT1idXR0b25dIHtcbiAgLyogdG9wIHJpZ2h0IGJvdHRvbSBsZWZ0ICovXG4gIG1hcmdpbjogNXB4IDIwcHggMTBweCAwcHg7XG59XG5cbmlucHV0W3R5cGU9dGV4dF0ge1xuICBtYXJnaW46IDVweCAxMHB4O1xufVxuXG5zZWxlY3Qge1xuICBtYXJnaW46IDVweCAyMHB4IDEwcHggMHB4O1xuICBwYWRkaW5nOiAxcHggMHB4IDFweCAwcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.readerAutoClosed = false;
        // Use the component constructor to inject providers.
    }
    AppComponent.prototype.ngOnInit = function () {
        this.setup();
    };
    AppComponent.prototype.setup = function () {
        this.openButton = document.getElementById("openButton");
        this.closeButton = document.getElementById("closeButton");
        this.logMsgElement = document.getElementById("logMsg");
        this.barcodeDataText = document.getElementById("BarcodeData");
        this.symbTypeText = document.getElementById("SymbType");
        this.readTimeText = document.getElementById("ReadTime");
        // Check whether the browser supports detection of the web page visibility.
        if (typeof document.hidden !== "undefined") { // Standard HTML5 attribute
            this.hidden = "hidden";
            this.visibilityChange = "visibilitychange";
        }
        if (this.hidden && typeof document.addEventListener !== "undefined" &&
            typeof document[this.hidden] !== "undefined") {
            // Add an event listener for the visibility change of the web page.
            document.addEventListener(this.visibilityChange, this.handleVisibilityChange, false);
        }
    };
    // After BarcodeReader object is created we can configure our symbologies and add our event listener
    AppComponent.prototype.onBarcodeReaderComplete = function (result) {
        console.log(result);
        if (result.status === 0) {
            // BarcodeReader object was successfully created
            this.logMsgElement.innerHTML = "<b>Log:</b><br>BarcodeReader object successfully created";
            this.updateUI(true, true);
            // Configure the symbologies needed. Buffer the settings and commit them at once.
            this.defaultReader.setBuffered("Symbology", "Code39", "Enable", "true", this.onSetBufferedComplete);
            this.defaultReader.setBuffered("Symbology", "Code128", "EnableCode128", "true", this.onSetBufferedComplete);
            this.defaultReader.commitBuffer(this.onCommitComplete);
            // Add an event handler for the barcodedataready event
            this.defaultReader.addEventListener("barcodedataready", this.onBarcodeDataReady, false);
            // Add an event handler for the window's beforeunload event
            window.addEventListener("beforeunload", this.onBeforeUnload);
        }
        else {
            this.defaultReader = null;
            this.logMsgElement.innerHTML += "<p style=\"color:red\">Failed to create BarcodeReader, status: " + result.status + ", message: " + result.message + "</p>";
            alert('Failed to create BarcodeReader, ' + result.message);
        }
    };
    // Verify the symbology configuration
    AppComponent.prototype.onSetBufferedComplete = function (result) {
        if (result.status !== 0) {
            this.logMsgElement.innerHTML += "<p style=\"color:red\">setBuffered failed, status: " + result.status + ", message: " + result.message + "</p>";
            this.logMsgElement.innerHTML += "<p>Family=" + result.family + " Key=" + result.key + " Option=" + result.option + "</p>";
        }
    };
    AppComponent.prototype.onCommitComplete = function (resultArray) {
        if (resultArray.length > 0) {
            for (var i = 0; i < resultArray.length; i++) {
                var result = resultArray[i];
                if (result.status !== 0) {
                    this.logMsgElement.innerHTML += "<p style=\"color:red\">commitBuffer failed, status: " + result.status + ", message: " + result.message + "</p>";
                    if (result.method === "getBuffered" || result.method === "setBuffered") {
                        this.logMsgElement.innerHTML += "<p>Method=" + result.method +
                            " Family=" + result.family + " Key=" + result.key +
                            " Option=" + result.option + "</p>";
                    }
                }
            } //endfor
        }
    };
    // Handle barcode data when available
    AppComponent.prototype.onBarcodeDataReady = function (data, type, time) {
        this.barcodeDataText.value = data;
        this.symbTypeText.value = type;
        this.readTimeText.value = time;
    };
    AppComponent.prototype.updateUI = function (readerOpened, clearData) {
        this.openButton.disabled = readerOpened;
        this.closeButton.disabled = !readerOpened;
        if (clearData) {
            this.barcodeDataText.value = "";
            this.symbTypeText.value = "";
            this.readTimeText.value = "";
        }
    };
    /**
     * If the browser supports visibility change event, we can close the
     * BarcodeReader object when the web page is hidden and create a new
     * instance of the BarcodeReader object when the page is visible. This
     * logic is used to re-claim the barcode reader in case another
     * application has claimed it when this page becomes hidden.
     */
    AppComponent.prototype.handleVisibilityChange = function () {
        if (document[this.hidden]) // The web page is hidden
         {
            this.closeBarcodeReader(true);
        }
        else // The web page is visible
         {
            if (this.readerAutoClosed) {
                // Note: If you switch to another tab and quickly switch back
                // to the current tab, the following call may have no effect
                // because the BarcodeReader may not be completely closed yet.
                // Once the BarcodeReader is closed, you may use the Open Reader
                // button to create a new BarcodeReader object.
                this.openBarcodeReader();
            }
        }
    };
    AppComponent.prototype.openBarcodeReader = function () {
        var _this = this;
        if (!this.defaultReader) {
            this.defaultReader = new BarcodeReader(null, function (result) { return _this.onBarcodeReaderComplete(result); });
        }
    };
    AppComponent.prototype.closeBarcodeReader = function (isAutoClose) {
        var _this = this;
        if (this.defaultReader) {
            this.readerAutoClosed = isAutoClose;
            this.defaultReader.close(function (result) {
                if (result.status === 0) {
                    _this.logMsgElement.innerHTML += "<p style=\"color:blue\">BarcodeReader successfully closed.</p>";
                    _this.defaultReader = null;
                    _this.updateUI(false, false);
                    window.removeEventListener("beforeunload", _this.onBeforeUnload);
                }
                else {
                    _this.logMsgElement.innerHTML += "<p style=\"color:red\">Failed to close BarcodeReader, status: " + result.status + ", message: " + result.message + "</p>";
                }
            });
        }
    };
    AppComponent.prototype.openButtonClicked = function () {
        this.openBarcodeReader();
    };
    AppComponent.prototype.closeButtonClicked = function () {
        this.closeBarcodeReader(false);
    };
    AppComponent.prototype.onBeforeUnload = function (e) {
        var message = "Please close BarcodeReader before leaving this page.";
        (e || window.event).returnValue = message;
        return message;
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\tguillie\source\repos\navette.pwa\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map