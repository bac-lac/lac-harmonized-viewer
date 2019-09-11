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
var base_component_1 = require("./base.component");
var drawer_1 = require("@material/drawer");
var list_event_1 = require("../events/list.event");
var DrawerComponent = /** @class */ (function (_super) {
    __extends(DrawerComponent, _super);
    function DrawerComponent(element) {
        var _this = _super.call(this, element) || this;
        _this.drawer = new drawer_1.MDCDrawer(element);
        return _this;
    }
    DrawerComponent.prototype.bindEvents = function () {
        var _this = this;
        list_event_1.events.onClick.on(function () {
            var foundation = _this.drawer.getDefaultFoundation();
            if (foundation.isOpen() || foundation.isOpening()) {
                foundation.close();
            }
            else {
                foundation.open();
            }
        });
    };
    return DrawerComponent;
}(base_component_1.Component));
exports.DrawerComponent = DrawerComponent;
//# sourceMappingURL=drawer.component.js.map