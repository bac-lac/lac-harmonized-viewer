import { h, Host } from "@stencil/core";
export class TabComponent {
    render() {
        let className = '';
        if (this.active)
            className += ' active';
        return h(Host, { class: className });
    }
    static get is() { return "harmonized-tab"; }
    static get originalStyleUrls() { return {
        "$": ["tab-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tab-component.css"]
    }; }
    static get properties() { return {
        "icon": {
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
            "attribute": "icon",
            "reflect": false
        },
        "label": {
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
            "attribute": "label",
            "reflect": false
        },
        "active": {
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
            "attribute": "active",
            "reflect": false
        }
    }; }
    static get elementRef() { return "el"; }
}
