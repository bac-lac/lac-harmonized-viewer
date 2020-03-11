import { h, Host } from "@stencil/core";
import { viewItem } from '../../store/actions/viewport';
import { isNumber } from 'util';
import { resolveViewportType } from '../../utils/viewport';
import tippy, { sticky } from 'tippy.js';
import { t } from '../../services/i18n-service';
export class ImageComponent {
    constructor() {
        this.preload = false;
        this.caption = ""; // also title
        this.loading = false;
        this.loaded = false;
        this.failed = false;
        this.props = [];
    }
    async addImageProperty(value) {
        if (!this.props.find(prop => prop == value)) {
            this.props = [...this.props, value];
        }
    }
    async removeImageProperty(value) {
        if (this.props.find(prop => prop == value)) {
            this.props = this.props.filter(prop => prop != value);
        }
    }
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { viewItem });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { viewport: { itemIndex } } = state;
            return {
                currentItemIndex: itemIndex
            };
        });
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    handleLoad(ev) {
        this.loading = false;
        this.loaded = true;
        this.createTooltip();
        this.imageLoad.emit(ev);
    }
    handleError(ev) {
        this.failed = true;
        this.loading = false;
        this.loaded = false;
    }
    handleClick() {
        if (isNumber(this.page)) {
            this.viewItem(this.page);
        }
    }
    componentDidRender() {
        this.imageAdded.emit(this.el);
    }
    createTooltip() {
        if (!this.showTooltip) {
            return undefined;
        }
        if (this.loaded && this.caption) {
            if (this.tooltip) {
                this.tooltip.destroy();
                this.tooltip = null;
            }
            return this.tooltip = tippy(this.el, {
                appendTo: 'parent',
                theme: 'harmonized-dark',
                placement: 'bottom',
                distance: -5,
                animation: 'shift-toward',
                arrow: false,
                sticky: true,
                plugins: [sticky],
                content: this.caption
            });
        }
    }
    // Temporary thumbnail placeholder solution for pdf, audio and video content types.
    determineThumbnail(viewportType) {
        // Replace links with CDN hosted images pre-prod
        //console.log(`Rendering thumbnail for page ${this.page} with content type=${this.contentType} and src=${this.src}`);
        // No thumbnail placeholders
        if (this.src === null || this.src === '' || this.failed)
            return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-unavailable.jpeg';
        switch (viewportType) {
            case 'image':
                return this.src;
            case 'pdf':
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-pdf.jpeg';
            case 'video':
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-video.jpeg';
            case 'audio':
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-audio.jpeg';
            default:
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-unavailable.jpeg';
        }
    }
    render() {
        let className = 'mdc-image-list__item';
        if (this.loading) {
            className += ' is-loading';
        }
        else if (this.loaded) {
            className += ' is-loaded';
        }
        else if (this.failed) {
            className += ' is-error';
        }
        else {
            className += ' is-ghost';
        }
        if (this.page === this.currentItemIndex) {
            className += ' is-active';
        }
        const labelId = `label-page-${this.page}`;
        const viewportType = resolveViewportType(this.contentType);
        const thumbnailSrc = this.determineThumbnail(viewportType);
        return h(Host, { role: "button", class: className, onClick: this.loaded && this.handleClick.bind(this), title: this.caption == "" ? t('untitled') : this.caption },
            h("div", { class: "mdc-image-list__image-aspect-container", role: "list" },
                h("img", { "data-lazy-load": true, src: (this.preload && thumbnailSrc), "data-src": thumbnailSrc, alt: this.caption == "" ? t('untitled') : this.caption, 
                    //srcset={(this.preload && this.srcset)}
                    class: "mdc-image-list__image mdc-elevation--z2", onLoad: this.handleLoad.bind(this), onError: this.handleError.bind(this), 
                    //aria-labelledby={labelId}
                    style: {
                        opacity: (this.loaded) ? '1' : '0'
                    }, role: "listitem" }),
                h("ul", { class: "inv", role: "listitem" }, this.props.map((prop) => h("li", null, prop)))));
    }
    static get is() { return "harmonized-image"; }
    static get originalStyleUrls() { return {
        "$": ["image-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["image-component.css"]
    }; }
    static get properties() { return {
        "src": {
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
            "attribute": "src",
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
        },
        "srcset": {
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
            "attribute": "srcset",
            "reflect": false
        },
        "preload": {
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
            "attribute": "preload",
            "reflect": false,
            "defaultValue": "false"
        },
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
            "reflect": true
        },
        "caption": {
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
            "attribute": "caption",
            "reflect": false,
            "defaultValue": "\"\""
        },
        "showCaption": {
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
            "attribute": "show-caption",
            "reflect": false
        },
        "showTooltip": {
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
            "attribute": "show-tooltip",
            "reflect": false
        }
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "loading": {},
        "loaded": {},
        "failed": {},
        "props": {},
        "currentItemIndex": {}
    }; }
    static get events() { return [{
            "method": "imageAdded",
            "name": "imageAdded",
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
            "method": "imageLoad",
            "name": "imageLoad",
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
        "addImageProperty": {
            "complexType": {
                "signature": "(value: string) => Promise<void>",
                "parameters": [{
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
        },
        "removeImageProperty": {
            "complexType": {
                "signature": "(value: string) => Promise<void>",
                "parameters": [{
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
}
