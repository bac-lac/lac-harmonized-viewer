import { h } from "@stencil/core";
export class SpinnerComponent {
    render() {
        return (h("div", { role: "progressbar", class: "progress-bar" },
            h("div", { class: "mdc-linear-progress__buffering-dots" }),
            h("div", { class: "mdc-linear-progress__buffer" }),
            h("div", { class: "mdc-linear-progress__bar mdc-linear-progress__primary-bar" },
                h("span", { class: "mdc-linear-progress__bar-inner" })),
            h("div", { class: "mdc-linear-progress__bar mdc-linear-progress__secondary-bar" },
                h("span", { class: "mdc-linear-progress__bar-inner" }))));
    }
    static get is() { return "harmonized-spinner"; }
    static get originalStyleUrls() { return {
        "$": ["spinner-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["spinner-component.css"]
    }; }
}
