import { h } from "@stencil/core";
export class HVToolbar {
    render() {
        return h("div", null,
            h("button", { class: "bx--btn bx--btn--ghost bx--btn--sm", type: "button", title: "Fullscreen" },
                h("svg", { focusable: "false", preserveAspectRatio: "xMidYMid meet", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 32 32", "aria-hidden": "true" },
                    h("path", { d: "M21 2v2h5.59L17 13.58 18.41 15 28 5.41V11h2V2h-9zm-6 16.42L13.59 17 4 26.59V21H2v9h9v-2H5.41L15 18.42z" }),
                    h("title", null, "Fullscreen"))));
    }
    static get is() { return "hv-toolbar"; }
    static get originalStyleUrls() { return {
        "$": ["toolbar-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["toolbar-component.css"]
    }; }
}
