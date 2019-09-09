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
var Openseadragon = require("openseadragon");
var base_1 = require("./base");
var Viewport = /** @class */ (function (_super) {
    __extends(Viewport, _super);
    function Viewport(controller, element) {
        return _super.call(this, controller, element) || this;
    }
    Viewport.prototype.render = function () {
        var openseadragon = new Openseadragon({
            id: "osd",
            tileSources: "https://openseadragon.github.io/example-images/pnp/pan/6a32000/6a32400/6a32487.dzi"
        });
    };
    return Viewport;
}(base_1.Component));
exports.Viewport = Viewport;
//# sourceMappingURL=viewport.js.map