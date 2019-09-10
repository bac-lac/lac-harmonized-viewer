"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypedEvent = /** @class */ (function () {
    function TypedEvent() {
        var _this = this;
        this.listeners = [];
        this.listenersOncer = [];
        this.on = function (listener) {
            _this.listeners.push(listener);
            return {
                dispose: function () { return _this.off(listener); }
            };
        };
        this.once = function (listener) {
            _this.listenersOncer.push(listener);
        };
        this.off = function (listener) {
            var callbackIndex = _this.listeners.indexOf(listener);
            if (callbackIndex > -1)
                _this.listeners.splice(callbackIndex, 1);
        };
        this.emit = function (event) {
            /** Update any general listeners */
            _this.listeners.forEach(function (listener) { return listener(event); });
            /** Clear the `once` queue */
            if (_this.listenersOncer.length > 0) {
                var toCall = _this.listenersOncer;
                _this.listenersOncer = [];
                toCall.forEach(function (listener) { return listener(event); });
            }
        };
        this.pipe = function (te) {
            return _this.on(function (e) { return te.emit(e); });
        };
    }
    return TypedEvent;
}());
//# sourceMappingURL=event.js.map