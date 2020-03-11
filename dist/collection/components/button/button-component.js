import { h, Host } from "@stencil/core";
import iconChevronDown from "../../assets/material-icons/chevron-down.svg";
export class ButtonComponent {
    componentDidLoad() {
        const element = this.el.querySelector("button");
        if (element) {
            /*
            const ripple = new MDCRipple(element)
            if (ripple) {
                ripple.unbounded = true
            }*/
        }
    }
    render() {
        let className = null;
        let buttonClassName = null;
        className = "-target-wrapper";
        if (this.icon && !this.label) {
            buttonClassName = 'mdc-icon-button';
        }
        else {
            buttonClassName = 'mdc-button';
        }
        if (this.size == 'lg')
            buttonClassName += ` ${buttonClassName}--lg`;
        else if (this.size == 'md')
            buttonClassName += ` ${buttonClassName}--md`;
        else if (this.size == 'sm')
            buttonClassName += ` ${buttonClassName}--sm`;
        buttonClassName += " mdc-button--touch";
        if (this.raised)
            buttonClassName += ' mdc-button--raised';
        if (this.outline)
            buttonClassName += ' mdc-button--outlined';
        if (this.fullWidth)
            className += ' full-width';
        return h(Host, { class: className },
            h("button", { type: "button", class: buttonClassName, disabled: this.disabled, title: this.tooltip, "aria-label": this.tooltip },
                h("div", { class: "mdc-button__ripple" }),
                this.icon && h("span", { class: this.iconClassName, "aria-hidden": true, innerHTML: this.icon }),
                this.label && h("span", { class: "mdc-button__label" }, this.label),
                this.dropdown && h("span", { class: "dropdown-arrow", innerHTML: iconChevronDown }),
                h("div", { class: "mdc-button__touch" })),
            h("slot", null));
    }
    static get is() { return "harmonized-button"; }
    static get originalStyleUrls() { return {
        "$": ["button-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["button-component.css"]
    }; }
    static get properties() { return {
        "disabled": {
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
            "attribute": "disabled",
            "reflect": false
        },
        "dropdown": {
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
            "attribute": "dropdown",
            "reflect": false
        },
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
        "iconClassName": {
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
            "attribute": "icon-class-name",
            "reflect": false
        },
        "size": {
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
            "attribute": "size",
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
        "tooltip": {
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
            "attribute": "tooltip",
            "reflect": false
        },
        "fullWidth": {
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
            "attribute": "full-width",
            "reflect": false
        },
        "raised": {
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
            "attribute": "raised",
            "reflect": false
        },
        "outline": {
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
            "attribute": "outline",
            "reflect": false
        }
    }; }
    static get elementRef() { return "el"; }
}
