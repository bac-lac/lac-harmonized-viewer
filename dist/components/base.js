var Component = /** @class */ (function () {
    function Component(element) {
        this.element = element;
    }
    Component.prototype.add = function (component) {
        if (component == null) {
            throw new ArgumentNullError();
        }
        else {
            var componentElement = component.getElement();
            if (componentElement != null) {
                this.element.append(componentElement);
            }
        }
    };
    // public prepend(child: HTMLElement) {
    //     if (child == null) throw new ArgumentNullError("child");
    //     this.element.prepend(child);
    // }
    Component.prototype.getElement = function () {
        return this.element;
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
//# sourceMappingURL=base.js.map