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
var openseadragon = require('openseadragon/build/openseadragon');
//import { Openseadragon } from '@modules/openseadragon/build/openseadragon';
var base_component_1 = require("./base.component");
var ViewportComponent = /** @class */ (function (_super) {
    __extends(ViewportComponent, _super);
    function ViewportComponent(element) {
        return _super.call(this, element) || this;
    }
    ViewportComponent.prototype.render = function () {
        console.log('render');
        var instance = openseadragon({
            id: "osd",
            tileSources: [
                {
                    "@context": "http://iiif.io/api/image/2/context.json",
                    "@id": "https://libimages1.princeton.edu/loris/pudl0001%2F4609321%2Fs42%2F00000001.jp2",
                    "height": 7200,
                    "width": 5233,
                    "profile": ["http://iiif.io/api/image/2/level2.json"],
                    "protocol": "http://iiif.io/api/image",
                    "tiles": [{
                            "scaleFactors": [1, 2, 4, 8, 16, 32],
                            "width": 1024
                        }]
                }
            ]
        });
    };
    return ViewportComponent;
}(base_component_1.Component));
exports.ViewportComponent = ViewportComponent;
//# sourceMappingURL=viewport.component.js.map