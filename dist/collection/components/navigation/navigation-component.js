import { h } from "@stencil/core";
import 'manifesto.js';
export class NavigationComponent {
    constructor() {
        this.page = 0;
    }
    getItems() {
        if (!this.manifest) {
            return [];
        }
        return this.manifest
            .getSequenceByIndex(0)
            .getCanvases()
            .map(canvas => {
            let imageUrl;
            if (canvas.getThumbnail()) {
                imageUrl = canvas.getThumbnail().id;
            }
            else if (!imageUrl) {
                let baseUrl = canvas.getImages()[0].getResource().getServices()[0].id;
                imageUrl = baseUrl + '/full/90,/0/default.jpg';
            }
            return {
                title: canvas.getDefaultLabel(),
                thumbnailUrl: imageUrl
            };
        });
    }
    // @Watch('items')
    // watchItemsHandler() {
    //   console.log('watch');
    //   var lazyImages = this.el.querySelectorAll('img.hv-lazy');
    //   lazyload(lazyImages);
    // }
    gotoHandler(event) {
        this.page = event.detail;
        const items = Array
            .from(this.el.querySelectorAll('.hv-navigation li'))
            .map(child => child);
        // Apply active CSS class
        items.forEach((item, index) => (this.page == index) ? item.classList.add('active') : item.classList.remove('active'));
        // Make sure the canvas thumbnail is visible
        // by scrolling to its corresponding element
        items[this.page].scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
    onClick(event, page) {
        this.goto.emit(page);
    }
    render() {
        return (h("ul", { class: "hv-navigation__list" }, this.getItems().map((item, index) => h("li", { class: (this.page == index) ? "active" : "" },
            h("a", { href: "javascript:;", onClick: (e) => this.onClick(e, index) },
                h("img", { src: item.thumbnailUrl, class: "hv-lazy", alt: item.title }))))));
    }
    static get is() { return "hv-navigation"; }
    static get originalStyleUrls() { return {
        "$": ["navigation-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["navigation-component.css"]
    }; }
    static get properties() { return {
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
            "reflect": false,
            "defaultValue": "0"
        },
        "manifest": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Manifesto.IManifest",
                "resolved": "IManifest",
                "references": {
                    "Manifesto": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get events() { return [{
            "method": "goto",
            "name": "goto",
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
    static get listeners() { return [{
            "name": "goto",
            "method": "gotoHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
