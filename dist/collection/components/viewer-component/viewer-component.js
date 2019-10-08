import { h } from "@stencil/core";
import 'manifesto.js';
export class ViewerComponent {
    // private observer: IntersectionObserver;
    // componentDidLoad() {
    //   const img: HTMLImageElement =
    //     this.el.shadowRoot.querySelector('img.hv-lazy');
    //   if (img) {
    //     this.observer = new IntersectionObserver(this.onIntersection);
    //     this.observer.observe(img);
    //   }
    // }
    // private onIntersection = async (entries) => {
    //   for (const entry of entries) {
    //     if (entry.isIntersecting) {
    //       if (this.observer) {
    //         this.observer.disconnect();
    //       }
    //       if (entry.target.getAttribute('data-src')) {
    //         entry.target.setAttribute('src',
    //           entry.target.getAttribute('data-src'));
    //         entry.target.removeAttribute('data-src');
    //       }
    //     }
    //   }
    // };
    manifestLoadedHandler(event) {
        if (this.navigation) {
            this.navigation.manifest = event.detail;
        }
    }
    pageLoadedHandler(event) {
        if (this.navigation) {
            this.navigation.page = event.detail;
        }
    }
    gotoHandler(event) {
        if (this.viewport) {
            this.viewport.openseadragon.goToPage(event.detail);
        }
    }
    render() {
        return (h("div", { class: "harmonized-viewer" },
            h("hv-topbar", { ref: elem => this.topbar = elem }),
            h("div", { class: "hv-content" },
                h("hv-navigation", { class: "hv-navigation", ref: elem => this.navigation = elem }),
                h("main", { class: "hv-main" },
                    h("hv-viewport", { manifest: "https://digital.library.villanova.edu/Item/vudl:92879/Manifest", ref: elem => this.viewport = elem }),
                    h("hv-statusbar", { class: "hv-statusbar" })))));
    }
    static get is() { return "harmonized-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["viewer-component.scss", "../../../node_modules/carbon-components/css/carbon-components.css"]
    }; }
    static get styleUrls() { return {
        "$": ["viewer-component.css", "../../../node_modules/carbon-components/css/carbon-components.css"]
    }; }
    static get properties() { return {
        "topbar": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLHvTopbarElement",
                "resolved": "HTMLHvTopbarElement",
                "references": {
                    "HTMLHvTopbarElement": {
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
        },
        "navigation": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLHvNavigationElement",
                "resolved": "HTMLHvNavigationElement",
                "references": {
                    "HTMLHvNavigationElement": {
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
        },
        "viewport": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLHvViewportElement",
                "resolved": "HTMLHvViewportElement",
                "references": {
                    "HTMLHvViewportElement": {
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
            "method": "manifestLoaded",
            "name": "manifestLoaded",
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
            "name": "manifestLoaded",
            "method": "manifestLoadedHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "pageLoaded",
            "method": "pageLoadedHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "goto",
            "method": "gotoHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
