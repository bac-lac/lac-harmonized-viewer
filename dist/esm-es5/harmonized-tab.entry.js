import { r as registerInstance, h, c as getElement, H as Host } from './core-37f3e3a6.js';
var TabComponent = /** @class */ (function () {
    function TabComponent(hostRef) {
        registerInstance(this, hostRef);
    }
    TabComponent.prototype.render = function () {
        var className = '';
        if (this.active)
            className += ' active';
        return h(Host, { class: className });
    };
    Object.defineProperty(TabComponent.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabComponent, "style", {
        get: function () { return "harmonized-tab{width:100%;height:100%;overflow-y:auto;display:none}harmonized-tab.active{display:inline-block}"; },
        enumerable: true,
        configurable: true
    });
    return TabComponent;
}());
export { TabComponent as harmonized_tab };
