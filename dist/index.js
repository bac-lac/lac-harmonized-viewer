"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var navbar_1 = require("./components/navbar/navbar");
var component_1 = require("./base/component");
var Viewer = /** @class */ (function (_super) {
    __extends(Viewer, _super);
    //manifest: Manifesto.Manifest;
    function Viewer(selector, manifestUrl) {
        var _this = _super.call(this) || this;
        _this.element = document.querySelector(selector);
        _this.manifestUrl = manifestUrl;
        var topbar = new navbar_1.Navbar();
        _this.append(topbar.GetElement());
        return _this;
    }
    return Viewer;
}(component_1.Component));
exports.Viewer = Viewer;
function HarmonizedViewer(selector, manifest) {
    return new Viewer(selector, manifest);
}
window.HarmonizedViewer = HarmonizedViewer;
