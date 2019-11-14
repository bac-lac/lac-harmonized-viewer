import { h, Host } from "@stencil/core";
import { setPage } from '../../store/actions/document';
import { isNumber } from 'util';
import tippy, { sticky } from 'tippy.js';
export class ImageComponent {
    constructor() {
        this.preload = false;
        this.loading = false;
        this.loaded = false;
        this.failed = false;
    }
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { setPage });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { page: page } } = state;
            return {
                currentPage: page
            };
        });
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    handleLoad(ev) {
        this.loading = false;
        this.loaded = true;
        this.failed = false;
        this.createTooltip();
        this.imageLoad.emit(ev);
    }
    handleError() {
        this.loading = false;
        this.loaded = false;
        this.failed = true;
    }
    handleClick() {
        if (isNumber(this.page)) {
            this.setPage(this.page);
        }
    }
    componentDidRender() {
        this.imageAdded.emit(this.el);
    }
    createTooltip() {
        if (!this.showTooltip) {
            return undefined;
        }
        if (this.loaded && this.caption) {
            if (this.tooltip) {
                this.tooltip.destroy();
                this.tooltip = null;
            }
            return this.tooltip = tippy(this.el, {
                appendTo: 'parent',
                theme: 'harmonized-light',
                placement: 'bottom',
                distance: -5,
                animation: 'shift-toward',
                arrow: false,
                sticky: true,
                plugins: [sticky],
                content: this.caption
            });
        }
    }
    render() {
        let className = 'mdc-image-list__item';
        if (this.loading) {
            className += ' is-loading';
        }
        else if (this.loaded) {
            className += ' is-loaded';
        }
        else if (this.failed) {
            className += ' is-error';
        }
        else {
            className += ' is-ghost';
        }
        if (this.page === this.currentPage) {
            className += ' is-active';
        }
        const labelId = `label-page-${this.page}`;
        return h(Host, { role: "button", class: className, onClick: this.loaded && this.handleClick.bind(this), title: this.loaded && "Go to page " + (this.page + 1), tabindex: this.loaded && '0' },
            h("div", { class: "mdc-image-list__image-aspect-container" },
                h("img", { "data-lazy-load": true, src: (this.preload && this.src), "data-src": this.src, 
                    //srcset={(this.preload && this.srcset)}
                    class: "mdc-image-list__image", onLoad: this.handleLoad.bind(this), onError: this.handleError.bind(this), "aria-labelledby": labelId, style: {
                        opacity: (this.loaded) ? '1' : '0'
                    } })),
            this.showCaption &&
                h("div", { class: "mdc-image-list__supporting" },
                    h("span", { id: labelId, class: "mdc-image-list__label" }, this.loaded ? this.caption : h("span", { innerHTML: "\u00A0" }))));
    }
    static get is() { return "harmonized-image"; }
    static get originalStyleUrls() { return {
        "$": ["image-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["image-component.css"]
    }; }
    static get properties() { return {
        "src": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "src",
            "reflect": false
        },
        "srcset": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "srcset",
            "reflect": false
        },
        "preload": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "preload",
            "reflect": false,
            "defaultValue": "false"
        },
        "page": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "page",
            "reflect": true
        },
        "caption": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "caption",
            "reflect": false
        },
        "showCaption": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "show-caption",
            "reflect": false
        },
        "showTooltip": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "show-tooltip",
            "reflect": false
        }
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "loading": {},
        "loaded": {},
        "failed": {},
        "currentPage": {}
    }; }
    static get events() { return [{
            "method": "imageAdded",
            "name": "imageAdded",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "imageLoad",
            "name": "imageLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
}
