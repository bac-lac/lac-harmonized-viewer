"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
var events = /** @class */ (function () {
    function events() {
    }
    events.onClick = new event_1.TypedEvent();
    events.onChange = new event_1.TypedEvent();
    return events;
}());
exports.events = events;
var ClickEventArgs = /** @class */ (function () {
    function ClickEventArgs() {
    }
    return ClickEventArgs;
}());
exports.ClickEventArgs = ClickEventArgs;
var ChangeEventArgs = /** @class */ (function () {
    function ChangeEventArgs() {
    }
    return ChangeEventArgs;
}());
exports.ChangeEventArgs = ChangeEventArgs;
//# sourceMappingURL=list.event.js.map