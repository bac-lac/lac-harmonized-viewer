import { h } from "@stencil/core";
export class HvStatusbar {
    render() {
        return h("div", null,
            h("div", { class: "bx--pagination", "data-pagination": true },
                h("div", { class: "bx--pagination__left" },
                    h("div", { "data-content-switcher": true, class: "bx--content-switcher", role: "tablist", "aria-label": "Demo switch content" },
                        h("button", { class: "bx--content-switcher-btn bx--content-switcher--selected", "data-target": ".demo--panel--opt-1", role: "tab", "aria-selected": "true" },
                            h("span", { class: "bx--content-switcher__label" }, "JPG")),
                        h("button", { class: "bx--content-switcher-btn", "data-target": ".demo--panel--opt-2", role: "tab" },
                            h("span", { class: "bx--content-switcher__label" }, "PDF")))),
                h("div", { class: "bx--pagination__left" },
                    h("label", { id: "select-id-pagination-count-label", class: "bx--pagination__text" }, "Items per page:"),
                    h("div", { class: "bx--select bx--select--inline bx--select__item-count" },
                        h("select", { class: "bx--select-input", id: "select-id-pagination-count", "aria-label": "Items per page", tabindex: "0", "data-items-per-page": true },
                            h("option", { class: "bx--select-option", value: "10" }, "10"),
                            h("option", { class: "bx--select-option", value: "20" }, "20"),
                            h("option", { class: "bx--select-option", value: "30" }, "30"),
                            h("option", { class: "bx--select-option", value: "40" }, "40"),
                            h("option", { class: "bx--select-option", value: "50" }, "50")),
                        h("svg", { focusable: "false", preserveAspectRatio: "xMidYMid meet", xmlns: "http://www.w3.org/2000/svg", class: "bx--select__arrow", width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true" },
                            h("path", { d: "M8 11L3 6l.7-.7L8 9.6l4.3-4.3.7.7z" }))),
                    h("span", { class: "bx--pagination__text" },
                        h("span", { "data-displayed-item-range": true }, "1 \u2013 10"),
                        " of",
                        h("span", { "data-total-items": true }, "40"),
                        " items")),
                h("div", { class: "bx--pagination__right" },
                    h("div", { class: "bx--select bx--select--inline bx--select__page-number" },
                        h("select", { class: "bx--select-input", id: "select-id-pagination-page", "aria-label": "page number, of 5 pages", tabindex: "0", "data-page-number-input": true },
                            h("option", { class: "bx--select-option", value: "1" }, "1"),
                            h("option", { class: "bx--select-option", value: "2" }, "2"),
                            h("option", { class: "bx--select-option", value: "3" }, "3"),
                            h("option", { class: "bx--select-option", value: "4" }, "4"),
                            h("option", { class: "bx--select-option", value: "5" }, "5")),
                        h("svg", { focusable: "false", preserveAspectRatio: "xMidYMid meet", xmlns: "http://www.w3.org/2000/svg", class: "bx--select__arrow", width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true" },
                            h("path", { d: "M8 11L3 6l.7-.7L8 9.6l4.3-4.3.7.7z" }))),
                    h("label", { id: "select-id-pagination-page-label", class: "bx--pagination__text" }, "of 5 pages"),
                    h("button", { class: "bx--pagination__button bx--pagination__button--backward ", tabindex: "0", "data-page-backward": true, "aria-label": "previous page" },
                        h("svg", { focusable: "false", preserveAspectRatio: "xMidYMid meet", xmlns: "http://www.w3.org/2000/svg", class: "bx--pagination__nav-arrow", width: "20", height: "20", viewBox: "0 0 32 32", "aria-hidden": "true" },
                            h("path", { d: "M19 23l-8-7 8-7v14z" }))),
                    h("button", { class: "bx--pagination__button bx--pagination__button--forward ", tabindex: "0", "data-page-forward": true, "aria-label": "next page" },
                        h("svg", { focusable: "false", preserveAspectRatio: "xMidYMid meet", xmlns: "http://www.w3.org/2000/svg", class: "bx--pagination__nav-arrow", width: "20", height: "20", viewBox: "0 0 32 32", "aria-hidden": "true" },
                            h("path", { d: "M13 9l8 7-8 7V9z" }))))));
    }
    static get is() { return "hv-statusbar"; }
    static get originalStyleUrls() { return {
        "$": ["statusbar-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["statusbar-component.css"]
    }; }
}
