import { h } from "@stencil/core";
import 'manifesto.js';
import { configureStore } from "../../store";
import { setDocumentUrl, setDocumentContentType, setStatus, addOverlay, setOptions, setLocale, addLocale } from '../../store/actions/document';
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
export class ViewerComponent {
    constructor() {
        this.backgroundColor = '#181818';
    }
    async getPage() {
        return this.page;
    }
    async addOverlay(x, y, width, height, text) {
        this.addOverlayState(x, y, width, height, text);
    }
    handleUrlChange() {
        this.setDocumentUrl(this.documentUrl);
    }
    handleDocumentClick() {
        // On any click inside the document, close all active dropdowns
        // Events responsible to open dropdowns must stop propagation
        const dropdowns = Array.from(this.el.shadowRoot.querySelectorAll('.dropdown.is-active, .navbar-item.has-dropdown.is-active'));
        if (dropdowns) {
            dropdowns.forEach((dropdown) => dropdown.classList.remove('is-active'));
        }
    }
    handleLanguageChange() {
        console.log('lang chan');
        this.setLocale(this.language);
    }
    componentWillLoad() {
        this.store.setStore(configureStore({}));
        this.store.mapDispatchToProps(this, { addLocale, addOverlay, setDocumentContentType, setDocumentUrl, setLocale, setOptions, setStatus });
        this.store.mapStateToProps(this, (state) => {
            const { document: { locale: locale, page: page, url: url, status: status, viewport: viewport } } = state;
            return {
                locale: locale,
                page: page,
                status: status,
                url: url,
                viewport: viewport
            };
        });
        //let options: Options[] = []
        Array.from(this.el.attributes).forEach((attr) => {
            const matches = attr.name.match(/data\-options\-([a-zA-Z0-9]+)\-([a-zA-Z0-9]+)/gi);
            if (matches) {
                matches.forEach((match) => {
                    //const namePath = `{${matches.groups[1]}: { component: '${matches.groups[2]}' }}`
                    // const option: Options = {
                    // 	component: matches.groups[1],
                    // 	name: matches.groups[2],
                    // 	value: JSON.parse(attr.value)
                    // }
                    const nodes = match.toLowerCase().split('-');
                    this.setOptions(nodes[2], nodes[3], JSON.parse(attr.value));
                });
            }
        });
        this.configure();
        this.setDocumentUrl(this.documentUrl);
    }
    componentDidLoad() {
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    configure() {
        this.addLocale('en');
        this.addLocale('fr');
        i18next
            .use(i18nextXHRBackend)
            .use(i18nextBrowserLanguageDetector)
            .init({
            lng: 'en',
            fallbackLng: 'en',
            debug: true,
            // ns: ['common'],
            // defaultNS: 'common',
            backend: {
                loadPath: './locales/{{lng}}.json?ns={{ns}}'
            }
        }, (err, t) => {
            i18next.on('languageChanged', (language) => {
                console.log(language);
                this.setLocale(language);
            });
        });
    }
    render() {
        return h("div", { class: "harmonized-viewer", style: { backgroundColor: this.backgroundColor } },
            h("harmonized-topbar", null),
            this.status.error &&
                h("harmonized-message", { type: "error" },
                    h("p", null,
                        h("strong", null, this.status.error.code),
                        h("span", null, "\u00A0\u2013\u00A0"),
                        h("span", null, this.status.error.message))),
            h("harmonized-viewport", { "navigation-enable": this.navigationEnable, "navigation-placement": this.viewport.navigationPlacement, "annotations-enable": this.annotationsEnable }),
            h("slot", { name: "footer" }));
    }
    static get is() { return "harmonized-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["viewer-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["viewer-component.css"]
    }; }
    static get properties() { return {
        "language": {
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
            "attribute": "language",
            "reflect": false
        },
        "navigationEnable": {
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
            "attribute": "navigation-enable",
            "reflect": false
        },
        "navigationHeight": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "navigation-height",
            "reflect": false
        },
        "navigationLocation": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "PlacementType",
                "resolved": "\"bottom\" | \"left\" | \"right\" | \"top\"",
                "references": {
                    "PlacementType": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "navigation-location",
            "reflect": false
        },
        "annotationsEnable": {
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
            "attribute": "annotations-enable",
            "reflect": false
        },
        "backgroundColor": {
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
            "attribute": "background-color",
            "reflect": false,
            "defaultValue": "'#181818'"
        },
        "documentUrl": {
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
        }
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "locale": {},
        "page": {},
        "url": {},
        "status": {},
        "viewport": {}
    }; }
    static get methods() { return {
        "getPage": {
            "complexType": {
                "signature": "() => Promise<number>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<number>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "addOverlay": {
            "complexType": {
                "signature": "(x: number, y: number, width: number, height: number, text: string) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
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
    static get watchers() { return [{
            "propName": "documentUrl",
            "methodName": "handleUrlChange"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleDocumentClick",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "languageChanged",
            "method": "handleLanguageChange",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
