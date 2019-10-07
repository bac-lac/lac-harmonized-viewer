import { h } from "@stencil/core";
export class HVToolbar {
    render() {
        return h("div", { class: "ui menu" },
            h("div", { class: "menu" },
                h("a", { id: "menu-toggle-navigation", class: "item" }, "About Us"),
                h("a", { class: "item" }, "Jobs"),
                h("a", { class: "item" }, "Locations")),
            h("div", { class: "menu right" },
                h("a", { class: "item" },
                    h("i", { class: "fas fa-cog" }))));
    }
    static get is() { return "hv-toolbar"; }
    static get originalStyleUrls() { return {
        "$": ["toolbar-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["toolbar-component.css"]
    }; }
}
