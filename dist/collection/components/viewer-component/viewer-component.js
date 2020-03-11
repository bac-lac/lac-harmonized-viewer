import { Host, h } from "@stencil/core";
import { configureStore } from "../../store";
import { addOverlay, setOptions, setLanguage, addLanguage, setConfiguration } from '../../store/actions/document';
import i18next from 'i18next';
import { AppConfig } from '../../app.config';
import { fetchManifest } from '../../store/actions/manifest';
import { viewItem, toggleFullscreen, toggleDrawer } from '../../store/actions/viewport';
import { Item } from '../../models/item';
import { t } from '../../services/i18n-service';
import { resolveViewportType } from '../../utils/viewport';
import { addEventListenerToRunOnce } from '../../utils/utils';
export class ViewerComponent {
    constructor() {
        this.navigationPlacement = "bottom";
        this.navigationCols = 16;
        this.navigationRows = 1;
        this.customVideoPlayer = false;
        this.customItemProps = [];
        this.preventLoadOnEmpty = false;
        this.deepzoomEnabled = true;
        this.suppressGallery = false;
    }
    // Currently assume that the manifest is only fetched once
    async emitItemChangeEvent(newValue, oldValue) {
        if (!this.items || newValue >= this.items.length)
            return null;
        addEventListenerToRunOnce(this.el, 'hvRender', function () {
            this.itemChanged.emit();
        }.bind(this));
    }
    async emitItemsLoadedEvent(newValue, oldValue) {
        // We avoid emitting an event on the initial componentLoad (goes from undefined => [])
        if (!oldValue && (!newValue || newValue.length === 0))
            return;
        addEventListenerToRunOnce(this.el, 'hvRender', function () {
            this.itemsLoaded.emit();
        }.bind(this));
    }
    async getCurrentItem() {
        if (!this.items || !this.items[this.currentItemIndex])
            return;
        return new Item(this.items[this.currentItemIndex]);
    }
    async setItem(index) {
        if (!this.items || index >= this.items.length || index < 0 || this.currentItemIndex == index) {
            return false;
        }
        this.viewItem(index);
        return true;
    }
    async getItems() {
        return this.items.map(item => new Item(item));
    }
    async getItemCount() {
        return this.items.length;
    }
    async getViewportType() {
        const currentItem = this.items[this.currentItemIndex];
        const viewportType = currentItem ? resolveViewportType(currentItem.contentType) : undefined;
        return viewportType;
    }
    async getTopBarElement() {
        return this.el.shadowRoot.querySelector('harmonized-topbar');
    }
    async getViewportElement() {
        return this.el.shadowRoot.querySelector('harmonized-viewport');
    }
    async getCustomVideoElement() {
        return this.el.shadowRoot.querySelector('#harmonized-viewer-custom-video');
    }
    async getNavigationElement() {
        return this.el.shadowRoot.querySelector('harmonized-navigation');
    }
    async getDrawerElement() {
        return this.el.shadowRoot.querySelector('harmonized-drawer');
    }
    /* ??? */
    async addOverlay(x, y, width, height) {
        this.addOverlayState(x, y, width, height);
    }
    handleDrawerToggle() {
        this.toggleDrawer();
    }
    handleFullscreenToggleByOther() {
        // Possibilities - fullscreenElement is null, our current element or some other element
        const documentElement = document;
        // Remove our element from fullscreen if any other element is in fullscreen
        if (documentElement.fullscreenElement === this.el ||
            this.el.contains(documentElement.msFullscreenElement) || // IE11
            documentElement.mozFullScreenElement === this.el ||
            documentElement.webkitFullscreenElement === this.el) { // or others? 
            if (!this.fullscreen) {
                this.toggleFullscreen();
            }
            return;
        }
        else if (this.fullscreen) {
            this.toggleFullscreen();
        }
    }
    // @Listen('click', { target: 'document' })
    // handleDocumentClick() {
    // 	// On any click inside the document, close all active dropdowns
    // 	// Events responsible to open dropdowns must stop propagation
    // 	const dropdowns = Array.from(this.el.shadowRoot.querySelectorAll(
    // 		'.dropdown.is-active, .navbar-item.has-dropdown.is-active'))
    // 	if (dropdowns) {
    // 		dropdowns.forEach((dropdown) => dropdown.classList.remove('is-active'))
    // 	}
    // }
    componentWillLoad() {
        this.store.setStore(configureStore({}));
        this.store.mapDispatchToProps(this, { addLanguage, addOverlay, setLanguage, setConfiguration, setOptions, fetchManifest, viewItem, toggleFullscreen, toggleDrawer });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { configuration, theme }, manifest: { error, fetching, fetched }, viewport: { itemIndex, items, fullscreen, infoShown } } = state;
            return {
                configuration,
                theme,
                manifestError: error,
                manifestFetching: fetching,
                manifestFetched: fetched,
                currentItemIndex: itemIndex,
                items,
                fullscreen,
                infoShown
            };
        });
        this.initCustomFlags();
        this.initLanguage();
        this.setConfiguration({
            language: this.language,
            customVideoPlayer: this.customVideoPlayer,
            customItemProps: this.customItemProps,
            deepzoom: this.deepzoomEnabled,
            suppressGallery: this.suppressGallery
        });
    }
    componentDidLoad() {
        // Move this into WillLoad (needs tests)
        this.fetchManifest(this.url);
    }
    componentDidUpdate() {
        if (this.manifestError) {
            this.manifestErrorOccurred.emit();
        }
        if (this.preventLoadOnEmpty) {
            // Check if manifest is loaded & empty
            if (this.manifestFetched && this.items.length === 0) {
                this.manifestIsEmpty.emit();
            }
        }
    }
    componentDidRender() {
        this.rendered.emit();
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    initCustomFlags() {
        Array.from(this.el.attributes).forEach((attr) => {
            const matches = attr.name.match(/data\-options\-([a-zA-Z0-9]+)\-([a-zA-Z0-9]+)/gi);
            if (matches) {
                matches.forEach((match) => {
                    const nodes = match.toLowerCase().split('-');
                    this.setOptions(nodes[2], nodes[3], JSON.parse(attr.value));
                });
            }
        });
    }
    initLanguage() {
        i18next
            .init({
            lng: this.language,
            fallbackLng: 'en',
            debug: false,
        }, (err, t) => {
            const language = this.language || 'en';
            this.setLanguage(language);
        });
        AppConfig.languages.forEach((language) => {
            this.addLanguage(language.code, language.name);
            i18next.addResourceBundle(language.code, 'translation', language, true, true);
        });
    }
    render() {
        if (this.manifestFetching) {
            return h("div", { class: "centered-box" },
                h("span", null, t('loadingManifest')),
                h("div", { class: "spinner-container" },
                    h("harmonized-spinner", null)));
        }
        if (this.manifestError) {
            return h("div", { class: "centered-box" },
                h("harmonized-message", { type: "error" }, t(`errors.${this.manifestError.code}`)));
        }
        if (this.preventLoadOnEmpty) {
            return;
        }
        let className = 'harmonized-viewer harmonized-viewer-theme--light';
        if (this.fullscreen) {
            className += ` harmonized-viewer-fullscreen`;
        }
        // Errors not shown - to restructure like this:
        // - Error with manifest fetching => Show here
        // - Error with item loading/showing => Show in viewport
        return h("div", { class: className },
            h("harmonized-topbar", null),
            h("harmonized-viewport", null),
            !this.suppressGallery &&
                h("harmonized-navigation", { cols: this.navigationCols, rows: this.navigationRows, "auto-resize": true, style: { backgroundColor: this.navigationBackgroundColor } }),
            h("harmonized-drawer", { headerTitle: "Details", shown: this.infoShown },
                h("harmonized-annotations", null)));
    }
    static get is() { return "harmonized-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["viewer-component.scss", "../../themes/index.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["viewer-component.css", "../../themes/index.css"]
    }; }
    static get properties() { return {
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
        "navigationPlacement": {
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
            "attribute": "navigation-placement",
            "reflect": false,
            "defaultValue": "\"bottom\""
        },
        "navigationCols": {
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
            "attribute": "navigation-cols",
            "reflect": false,
            "defaultValue": "16"
        },
        "navigationRows": {
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
            "attribute": "navigation-rows",
            "reflect": false,
            "defaultValue": "1"
        },
        "navigationBackgroundColor": {
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
            "attribute": "navigation-background-color",
            "reflect": false
        },
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
        "customVideoPlayer": {
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
            "attribute": "customvideoplayer",
            "reflect": false,
            "defaultValue": "false"
        },
        "customItemProps": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "preventLoadOnEmpty": {
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
            "attribute": "prevent-load-on-empty",
            "reflect": false,
            "defaultValue": "false"
        },
        "deepzoomEnabled": {
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
            "attribute": "deepzoom",
            "reflect": false,
            "defaultValue": "true"
        },
        "suppressGallery": {
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
            "attribute": "suppress-gallery",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "configuration": {},
        "theme": {},
        "manifestError": {},
        "manifestFetching": {},
        "manifestFetched": {},
        "currentItemIndex": {},
        "items": {},
        "fullscreen": {},
        "infoShown": {}
    }; }
    static get events() { return [{
            "method": "rendered",
            "name": "hvRender",
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
            "method": "manifestErrorOccurred",
            "name": "hvManifestError",
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
            "method": "manifestIsEmpty",
            "name": "hvManifestIsEmpty",
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
            "method": "itemChanged",
            "name": "itemChanged",
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
            "method": "itemsLoaded",
            "name": "itemsLoaded",
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
    static get methods() { return {
        "getCurrentItem": {
            "complexType": {
                "signature": "() => Promise<Item>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Item": {
                        "location": "import",
                        "path": "../../models/item"
                    }
                },
                "return": "Promise<Item>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "setItem": {
            "complexType": {
                "signature": "(index: number) => Promise<boolean>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<boolean>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "getItems": {
            "complexType": {
                "signature": "() => Promise<Item[]>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Item": {
                        "location": "import",
                        "path": "../../models/item"
                    }
                },
                "return": "Promise<Item[]>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "getItemCount": {
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
        "getViewportType": {
            "complexType": {
                "signature": "() => Promise<ViewportType>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "ViewportType": {
                        "location": "global"
                    },
                    "DocumentPage": {
                        "location": "global"
                    }
                },
                "return": "Promise<ViewportType>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "getTopBarElement": {
            "complexType": {
                "signature": "() => Promise<HTMLElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLElement>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "getViewportElement": {
            "complexType": {
                "signature": "() => Promise<HTMLElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLElement>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "getCustomVideoElement": {
            "complexType": {
                "signature": "() => Promise<HTMLElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLElement>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "getNavigationElement": {
            "complexType": {
                "signature": "() => Promise<HTMLElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLElement>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "getDrawerElement": {
            "complexType": {
                "signature": "() => Promise<HTMLElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLElement>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "addOverlay": {
            "complexType": {
                "signature": "(x: number, y: number, width: number, height: number) => Promise<void>",
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
            "propName": "currentItemIndex",
            "methodName": "emitItemChangeEvent"
        }, {
            "propName": "items",
            "methodName": "emitItemsLoadedEvent"
        }]; }
    static get listeners() { return [{
            "name": "viewerDrawerToggle",
            "method": "handleDrawerToggle",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "fullscreenchange",
            "method": "handleFullscreenToggleByOther",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "MSFullscreenChange",
            "method": "handleFullscreenToggleByOther",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "mozfullscreenchange",
            "method": "handleFullscreenToggleByOther",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "webkitfullscreenchange",
            "method": "handleFullscreenToggleByOther",
            "target": "document",
            "capture": false,
            "passive": false
        }]; }
}
