import { h } from "@stencil/core";
export class MessageComponent {
    className(type) {
        let className = 'message';
        switch (type) {
            case 'success':
                className += ' is-success';
                break;
            case 'error':
                className += ' is-danger';
                break;
            default:
                className += ' is-dark';
                break;
        }
        return className;
    }
    render() {
        return h("article", { class: this.className(this.type) },
            this.text &&
                h("div", { class: "message-header" },
                    h("p", null, this.text)),
            h("div", { class: "message-body" },
                h("slot", null)));
    }
    static get is() { return "harmonized-message"; }
    static get originalStyleUrls() { return {
        "$": ["message-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["message-component.css"]
    }; }
    static get properties() { return {
        "text": {
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
            "attribute": "text",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "MessageType",
                "resolved": "\"default\" | \"error\" | \"success\"",
                "references": {
                    "MessageType": {
                        "location": "import",
                        "path": "./message-options"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "type",
            "reflect": false
        }
    }; }
}
