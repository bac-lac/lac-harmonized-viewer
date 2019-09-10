var Component = /** @class */ (function () {
    function Component(parent) {
        this.parent = parent;
    }
    Component.prototype.init = function () {
        if (this.children != null) {
            this.children.forEach(function (i) { return i.init(); });
        }
    };
    Component.prototype.configure = function () {
    };
    Component.prototype.render = function () {
    };
    Component.prototype.bind = function (element) {
        this.element = element;
        return this;
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
//# sourceMappingURL=index.js.map