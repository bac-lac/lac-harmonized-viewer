import { h } from "@stencil/core";
import openseadragon from 'openseadragon';
import { root } from '../../utils/utils';
import '../../utils/utils.manifest';
import { Locale } from '../../utils/utils.locale';
import { ManifestExtensions } from '../../utils/utils.manifest';
export class ViewportComponent {
    constructor() {
        this.page = 0;
        this.totalPages = 0;
        this.locale = new Locale();
    }
    componentDidLoad() {
        if (this.openseadragon) {
            this.openseadragon.destroy();
            this.openseadragon = null;
        }
        var topbar = root(this.el).querySelector('.hv-topbar');
        var instance = this.el.querySelector('.hv-openseadragon');
        manifesto.loadManifest(this.manifest)
            .then((manifestJson) => {
            const manifest = manifesto.create(manifestJson);
            this.manifestLoaded.emit(manifest);
            console.log(manifest);
            // var manifestLanguage = Locale.resolve(manifest.options.locale, this.locale.all());
            // manifest.options.locale = manifestLanguage;
            const document = new ManifestExtensions(manifest);
            topbar.title = document.label();
            topbar.publisher = document.creator();
            topbar.thumbnail = manifest.getLogo();
            const tileSources = manifest.getSequences()[0].getCanvases().map(function (canvas) {
                var images = canvas.getImages();
                return images[0].getResource().getServices()[0].id + "/info.json";
            });
            this.totalPages = tileSources.length;
            this.openseadragon = openseadragon({
                element: instance,
                prefixUrl: "/dist/vendors/openseadragon/images/",
                animationTime: 0.25,
                springStiffness: 10.0,
                showNavigator: true,
                navigatorPosition: "BOTTOM_RIGHT",
                showNavigationControl: false,
                showSequenceControl: false,
                sequenceMode: true,
                tileSources: tileSources
            });
            this.openseadragon.addHandler('open', () => {
                this.page = this.openseadragon.currentPage();
                this.drawShadow();
                this.handleCanvasLoad(this.openseadragon.world.getItemAt(0), () => {
                    this.canvasLoaded.emit(this.page);
                    this.el.querySelector('.hv-openseadragon').classList.add('animated', 'fadeIn', 'fast');
                });
                //this.pageHandler();
                this.pageLoaded.emit(this.page);
            });
            this.openseadragon.addHandler('close', () => {
                //console.log('ev');
                //this.clearOverlays();
            });
        });
    }
    pageHandler() {
        this.buttonPrevious.disabled = (this.page === 0);
        this.buttonNext.disabled = (this.page === this.totalPages - 1);
    }
    handleCanvasLoad(tiledImage, callback) {
        if (tiledImage.getFullyLoaded()) {
            setTimeout(callback, 1); // So both paths are asynchronous
        }
        else {
            tiledImage.addOnceHandler('fully-loaded-change', function () {
                callback(); // Calling it this way keeps the arguments consistent (if we passed callback into addOnceHandler it would get an event on this path but not on the setTimeout path above)
            });
        }
    }
    drawShadow() {
        var shadow = document.createElement('div');
        shadow.style.backgroundColor = 'transparent';
        var bounds = this.openseadragon.world.getItemAt(0).getBounds();
        shadow.style.width = bounds.width.toString() + 'px';
        shadow.style.height = bounds.height.toString() + 'px';
        shadow.style.boxShadow = '5px 5px 12px 3px rgba(76, 86, 106, 0.3)';
        this.openseadragon.addOverlay(shadow, bounds, 'CENTER');
    }
    previous() {
        var page = this.openseadragon.currentPage();
        if (page > 0) {
            this.openseadragon.goToPage(page - 1);
        }
    }
    next() {
        var page = this.openseadragon.currentPage();
        var totalPages = this.openseadragon.tileSources.length;
        if (page < (totalPages - 1)) {
            this.openseadragon.goToPage(page + 1);
        }
    }
    render() {
        return (h("div", { class: "hv-viewport" },
            h("button", { type: "button", class: "bx--btn bx--btn--secondary bx--btn--icon-only hv-navigation__prev", onClick: (e) => this.previous(), ref: elem => this.buttonPrevious = elem },
                h("svg", { focusable: "false", preserveAspectRatio: "xMidYMid meet", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 32 32", "aria-hidden": "true" },
                    h("path", { d: "M10 16L20 6l1.4 1.4-8.6 8.6 8.6 8.6L20 26z" }),
                    h("title", null, "Chevron left"))),
            h("div", { class: "hv-openseadragon" }),
            h("button", { type: "button", class: "bx--btn bx--btn--secondary bx--btn--icon-only hv-navigation__next", onClick: (e) => this.next(), ref: elem => this.buttonNext = elem },
                h("i", { class: "fas fa-chevron-right" }))));
    }
    static get is() { return "hv-viewport"; }
    static get originalStyleUrls() { return {
        "$": ["viewport-component.scss", "../../../node_modules/animate.css/animate.min.css"]
    }; }
    static get styleUrls() { return {
        "$": ["viewport-component.css", "../../../node_modules/animate.css/animate.min.css"]
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
        "totalPages": {
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
            "attribute": "total-pages",
            "reflect": false,
            "defaultValue": "0"
        },
        "manifest": {
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
            "attribute": "manifest",
            "reflect": false
        },
        "openseadragon": {
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
            "attribute": "openseadragon",
            "reflect": false
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
            "method": "canvasLoaded",
            "name": "canvasLoaded",
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
            "method": "pageLoaded",
            "name": "pageLoaded",
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
    static get watchers() { return [{
            "propName": "page",
            "methodName": "pageHandler"
        }]; }
}
