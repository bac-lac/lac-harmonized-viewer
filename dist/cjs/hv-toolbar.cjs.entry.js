'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-409f6374.js');

const HVToolbar = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return core.h("div", { class: "ui menu" }, core.h("div", { class: "menu" }, core.h("a", { id: "menu-toggle-navigation", class: "item" }, "About Us"), core.h("a", { class: "item" }, "Jobs"), core.h("a", { class: "item" }, "Locations")), core.h("div", { class: "menu right" }, core.h("a", { class: "item" }, core.h("i", { class: "fas fa-cog" }))));
    }
    static get style() { return ".hv-toolbar .ui.menu{border:none;-webkit-box-shadow:none;box-shadow:none;background-color:#f0f3f9}"; }
};

exports.hv_toolbar = HVToolbar;
