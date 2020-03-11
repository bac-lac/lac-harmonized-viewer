import { h } from "@stencil/core";
export class AudioComponent {
    render() {
        return h("audio", { controls: true },
            h("source", { src: this.url, type: this.contentType }));
    }
    static get is() { return "harmonized-audio"; }
    static get originalStyleUrls() { return {
        "$": ["audio-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["audio-component.css"]
    }; }
    static get properties() { return {
        "url": {
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
            "attribute": "url",
            "reflect": false
        },
        "contentType": {
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
            "attribute": "content-type",
            "reflect": false
        }
    }; }
    static get elementRef() { return "el"; }
}
