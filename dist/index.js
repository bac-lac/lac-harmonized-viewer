"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_factory_1 = require("./factories/component.factory");
var HarmonizedViewer = /** @class */ (function () {
    function HarmonizedViewer(id) {
        this.element = document.getElementById(id);
        this.factory = new component_factory_1.ComponentFactory();
        this.parse(this.element);
        this.factory.components.forEach(function (component) { return component.render(); });
    }
    HarmonizedViewer.prototype.parse = function (element) {
        var _this = this;
        if (this.factory.isComponent(element)) {
            this.factory.create(element);
        }
        Array
            .from(element.children)
            .forEach(function (child) {
            _this.parse(child);
        });
    };
    return HarmonizedViewer;
}());
exports.HarmonizedViewer = HarmonizedViewer;
function harmonizedViewer(id) {
    return new HarmonizedViewer(id);
}
exports.harmonizedViewer = harmonizedViewer;
//# sourceMappingURL=index.js.map