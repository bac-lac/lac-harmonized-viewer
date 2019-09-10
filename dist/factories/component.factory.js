"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var topbar_component_1 = require("../components/topbar.component");
var viewport_component_1 = require("../components/viewport.component");
var ComponentFactory = /** @class */ (function () {
    function ComponentFactory() {
        this.components = [];
    }
    ComponentFactory.prototype.createTopbar = function (element) {
        return new topbar_component_1.TopbarComponent(element);
    };
    ComponentFactory.prototype.createViewport = function (element) {
        return new viewport_component_1.ViewportComponent(element);
    };
    ComponentFactory.prototype.create = function (element) {
        var component = this.get(element);
        if (component) {
            this.components.push(component);
            return component;
        }
        else {
            return null;
        }
    };
    ComponentFactory.prototype.isComponent = function (element) {
        if (element == null) {
            return false;
        }
        return (this.get(element) != null);
    };
    ComponentFactory.prototype.get = function (element) {
        if (element == null) {
            return null;
        }
        var component = null;
        if (element.classList.contains('hv-topbar')) {
            component = this.createTopbar(element);
        }
        else if (element.classList.contains('hv-viewport')) {
            component = this.createViewport(element);
        }
        if (component) {
            return component;
        }
        else {
            return null;
        }
    };
    return ComponentFactory;
}());
exports.ComponentFactory = ComponentFactory;
//# sourceMappingURL=component.factory.js.map