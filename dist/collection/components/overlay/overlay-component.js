import { h, Host } from "@stencil/core";
import Popper from 'popper.js';
export class OverlayComponent {
    componentDidLoad() {
    }
    handleClick(ev) {
        console.log('click');
        var popper = new Popper(this.el.querySelector("overlay__content"), this.el.querySelector('.overlay-tooltip'), {
            placement: 'left',
        });
    }
    render() {
        return h(Host, { class: "overlay", onClick: this.handleClick.bind(this) },
            h("div", { class: "overlay__content" },
                h("slot", null)));
    }
    static get is() { return "harmonized-overlay"; }
    static get originalStyleUrls() { return {
        "$": ["overlay-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["overlay-component.css"]
    }; }
    static get properties() { return {
        "x": {
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
            "attribute": "x",
            "reflect": false
        },
        "y": {
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
            "attribute": "y",
            "reflect": false
        },
        "width": {
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
            "attribute": "width",
            "reflect": false
        },
        "height": {
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
            "attribute": "height",
            "reflect": false
        },
        "mouseTracker": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "mouse-tracker",
            "reflect": false
        }
    }; }
    static get elementRef() { return "el"; }
}
