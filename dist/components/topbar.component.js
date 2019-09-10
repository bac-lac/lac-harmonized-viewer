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
var list_event_1 = require("../events/list.event");
var TopbarComponent = /** @class */ (function (_super) {
    __extends(TopbarComponent, _super);
    function TopbarComponent(element) {
        var _this = _super.call(this, element) || this;
        _this.text = "OK";
        return _this;
    }
    TopbarComponent.prototype.bindEvents = function () {
        this.element.addEventListener('click', function () {
            list_event_1.events.onClick.emit(new list_event_1.ClickEventArgs());
        });
    };
    TopbarComponent.prototype.click = function () {
        console.log('workeroni');
    };
    TopbarComponent.prototype.render = function () {
        this.element.querySelector(".mdc-top-app-bar__title").textContent = this.text;
    };
    return TopbarComponent;
}(base_component_1.Component));
exports.TopbarComponent = TopbarComponent;
//# sourceMappingURL=topbar.component.js.map