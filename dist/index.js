"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var topbar_1 = require("./components/topbar");
var Controller = /** @class */ (function () {
    function Controller(id, manifestUrl, theme) {
        if (theme === void 0) { theme = "default"; }
        this.enableRipple = true;
        this.element = document.getElementById(id);
        //this.configure();
        this.render();
    }
    // async load(): Promise<string> {
    //     return await Manifesto.Utils.loadResource(this.manifestUrl);
    // }
    Controller.prototype.configure = function () {
    };
    Controller.prototype.render = function () {
        var _this = this;
        if (this.enableRipple) {
            // this.element.querySelectorAll(".hv-button")
            //     .forEach(button => new MDCRipple(button));
        }
        this.createComponent(".hv-topbar", function (elem) { return new topbar_1.Topbar(_this, elem); });
    };
    Controller.prototype.createComponent = function (selector, callback) {
        var instances = this.element.querySelectorAll(selector);
        Array.from(instances).map(function (elem) { return callback(elem); });
    };
    return Controller;
}());
exports.Controller = Controller;
function HarmonizedViewer(selector, manifest) {
    return new Controller(selector, manifest);
}
window.HarmonizedViewer = HarmonizedViewer;
//# sourceMappingURL=index.js.map