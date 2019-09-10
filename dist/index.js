"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var HarmonizedViewer = /** @class */ (function () {
    function HarmonizedViewer(id) {
        this.element = document.getElementById(id);
        this.events = new events_1.EventEmitter();
        window.customElements.define("car-component", Car);
    }
    return HarmonizedViewer;
}());
exports.HarmonizedViewer = HarmonizedViewer;
function harmonizedViewer(id) {
    //var element = document.getElementById(id);
    return new HarmonizedViewer(id);
}
exports.harmonizedViewer = harmonizedViewer;
//(window as any).HarmonizedViewer = HarmonizedViewer;
//# sourceMappingURL=index.js.map