import { h, Host } from "@stencil/core";
import { MDCDrawer } from "@material/drawer";
import iconClose from '../../assets/material-design-icons/ic_close_18px.svg';
export class DrawerComponent {
    constructor() {
        this.placement = 'left';
        this.toolbar = false;
        this.visible = false;
    }
    componentDidLoad() {
        this.drawer = MDCDrawer.attachTo(this.el);
    }
    componentDidUnload() {
        this.drawer.destroy();
    }
    async open() {
        this.drawer.open = true;
    }
    render() {
        let className = 'mdc-drawer mdc-drawer--dismissible';
        if (this.placement === 'right') {
            className += ' mdc-drawer--right';
        }
        else {
            className += ' mdc-drawer--left';
        }
        if (this.visible) {
            className += ' mdc-drawer--open';
        }
        return h(Host, { class: className },
            h("div", { class: "mdc-drawer__content" },
                this.toolbar && h("div", { class: "drawer-toolbar", role: "toolbar" },
                    h("div", { class: "drawer-button drawer-button__close" },
                        h("button", { type: "button", "aria-label": "" },
                            h("div", { class: "mdc-button__ripple" }),
                            h("div", { class: "mdc-button__icon", innerHTML: iconClose }),
                            h("div", { class: "mdc-button__touch" })))),
                h("slot", null)));
    }
    static get is() { return "harmonized-drawer"; }
    static get originalStyleUrls() { return {
        "$": ["drawer-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["drawer-component.css"]
    }; }
    static get properties() { return {
        "placement": {
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
            "attribute": "placement",
            "reflect": false,
            "defaultValue": "'left'"
        },
        "toolbar": {
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
            "attribute": "toolbar",
            "reflect": false,
            "defaultValue": "false"
        },
        "visible": {
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
            "attribute": "visible",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get methods() { return {
        "open": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
