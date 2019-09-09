"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component = /** @class */ (function () {
    function Component(controller, element) {
        if (controller == null || element == null) {
            throw new ArgumentNullError();
        }
        this.controller = controller;
        this.element = element;
    }
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
//# sourceMappingURL=index.js.map