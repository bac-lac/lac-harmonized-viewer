import { r as registerInstance, h } from './core-60b8aeac.js';

const HVToolbar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("div", { class: "ui menu" }, h("div", { class: "menu" }, h("a", { id: "menu-toggle-navigation", class: "item" }, "About Us"), h("a", { class: "item" }, "Jobs"), h("a", { class: "item" }, "Locations")), h("div", { class: "menu right" }, h("a", { class: "item" }, h("i", { class: "fas fa-cog" }))));
    }
    static get style() { return ".hv-toolbar .ui.menu {\n  border: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  background-color: #F0F3F9;\n}"; }
};

export { HVToolbar as hv_toolbar };
