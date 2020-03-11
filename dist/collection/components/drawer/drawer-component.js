import { h, Host } from "@stencil/core";
import { MDCDrawer } from "@material/drawer";
import { t } from '../../services/i18n-service';
import { isIE11 } from '../../utils/viewport';
import arrowRight from '../../assets/material-design-icons/ic_chevron_right_36px.svg';
export class DrawerComponent {
    constructor() {
        this.shown = false;
    }
    componentDidLoad() {
        this.drawer = new MDCDrawer(this.el);
    }
    componentDidUnload() {
        if (this.drawer)
            this.drawer.destroy();
    }
    handleOpen(newValue, oldValue) {
        if (newValue !== oldValue && newValue) {
            this.drawer.open = true;
        }
    }
    handleClose() {
        this.drawer.open = false;
        this.viewerDrawerToggle.emit();
    }
    // Use rtl to force material design in popping drawer from the right side (other options??)
    render() {
        return h(Host, { dir: "rtl", class: 'mdc-drawer mdc-drawer--dismissible' },
            h("div", { dir: "ltr", class: "mdc-drawer__header" },
                h("div", { class: "mdc-drawer__close" },
                    h("harmonized-button", { icon: arrowRight, title: t('closeSidebar'), "aria-label": t('closeSidebar'), onClick: this.handleClose.bind(this) })),
                h("div", { class: "mdc-drawer__title" }, this.headerTitle)),
            h("div", { dir: "ltr", class: "mdc-drawer__content" },
                h("slot", null)),
            isIE11() && h("iframe", { src: "about:blank", style: { position: 'absolute', overflow: 'hidden', top: '0', left: '0', zIndex: '-1', border: 'none', minWidth: '100%', minHeight: '100%' } }));
    }
    static get is() { return "harmonized-drawer"; }
    static get originalStyleUrls() { return {
        "$": ["drawer-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["drawer-component.css"]
    }; }
    static get properties() { return {
        "headerTitle": {
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
            "attribute": "header-title",
            "reflect": false
        },
        "shown": {
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
            "attribute": "shown",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get events() { return [{
            "method": "viewerDrawerToggle",
            "name": "viewerDrawerToggle",
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
    static get watchers() { return [{
            "propName": "shown",
            "methodName": "handleOpen"
        }]; }
}
