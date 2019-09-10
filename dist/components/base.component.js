"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var ripple_1 = require("@material/ripple");
var Component = /** @class */ (function () {
    function Component(element) {
        this.element = element;
        this.events = new events_1.EventEmitter();
        this.bindEvents();
    }
    Component.prototype.bindEvents = function () {
    };
    Component.prototype.listen = function (event, callback) {
        this.events.on(event, callback);
    };
    Component.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.events.emit(event, args);
    };
    Component.prototype.render = function () {
    };
    Component.prototype.enableRipple = function () {
        if (this.rippleState) {
            this.rippleState.activate();
        }
        else {
            if (this.element.matches(".hv-button")) {
                this.rippleState = new ripple_1.MDCRipple(this.element);
            }
            this.rippleState.activate();
        }
    };
    Component.prototype.disableRipple = function () {
        if (this.rippleState) {
            this.rippleState.deactivate();
        }
        else {
            if (this.element.matches(".hv-button")) {
                this.rippleState = new ripple_1.MDCRipple(this.element);
            }
            this.rippleState.deactivate();
        }
    };
    Component.prototype.generateId = function () {
        var id = null;
        var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        while (true) {
            var id_1 = "hv-";
            for (var i = 0; i < 4; i++) {
                id_1 += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            var isUnique = (document.getElementById(id_1) == null);
            if (isUnique) {
                this.element.id = id_1;
                break;
            }
        }
        return id;
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=base.component.js.map