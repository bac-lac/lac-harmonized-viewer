"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.EnsureElementId = function () {
        if (!this.element.hasAttribute("id")) {
            // Generate and assign ID to the element
            this.element.setAttribute("id", "test123");
        }
        return this.element.getAttribute("id");
    };
    Component.prototype.GetElement = function () {
        return this.element;
    };
    Component.prototype.append = function (element) {
        this.element.append(element);
    };
    return Component;
}());
exports.Component = Component;
