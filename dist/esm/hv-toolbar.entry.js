import { r as registerInstance, h } from './core-419db4a7.js';

const HVToolbar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("div", { class: "ui menu" }, h("div", { class: "menu" }, h("a", { id: "menu-toggle-navigation", class: "item" }, "About Us"), h("a", { class: "item" }, "Jobs"), h("a", { class: "item" }, "Locations")), h("div", { class: "menu right" }, h("a", { class: "item" }, h("i", { class: "fas fa-cog" }))));
    }
    static get style() { return ".hv-toolbar .ui.menu{border:none;-webkit-box-shadow:none;box-shadow:none;background-color:#f0f3f9}"; }
};

export { HVToolbar as hv_toolbar };
