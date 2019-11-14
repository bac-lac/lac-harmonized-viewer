import { h, Host } from "@stencil/core";
import { setDocumentUrl, setDocumentPages, setDocumentTitle, setAnnotations, setZoom, setPage, setDocumentAlternateFormats, setError, setStatus, clearOverlays } from "../../store/actions/document";
import openseadragon from 'openseadragon';
import { IIIFResolver } from '../../resolvers/iiif-resolver/iiif-resolver';
import tippy, { sticky } from 'tippy.js';
export class OpenSeadragonComponent {
    handlePageChange(newValue, oldValue) {
        if (this.instance) {
            this.instance.goToPage(newValue);
        }
    }
    handleUrlChange(newValue, oldValue) {
    }
    handleZoomRequest(newValue, oldValue) {
        if (this.instance) {
            this.instance.viewport.zoomTo(newValue.value);
        }
    }
    async resolve() {
        await this.resolver.init(this.url);
        this.create();
    }
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { setError, setStatus, setDocumentUrl, setDocumentPages, setDocumentTitle, setDocumentAlternateFormats, setAnnotations, setPage, setZoom, clearOverlays });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { document: document, error: error, options: options, overlays: overlays, page: page, pages: pages, url: url, zoomRequest: zoomRequest } } = state;
            return {
                document: document,
                error: error,
                options: options,
                overlays: overlays,
                page: page,
                pages: pages,
                url: url,
                zoomRequest: zoomRequest
            };
        });
    }
    async componentDidLoad() {
        const resolver = new IIIFResolver();
        const options = this.options.filter(i => i.component && i.component === 'openseadragon');
        const optionIgnoreImageService = options.find(i => i.name && i.name === 'ignoreimageservice');
        if (optionIgnoreImageService) {
            resolver.ignoreImageService = optionIgnoreImageService.value;
        }
        this.resolver = resolver;
        await this.resolve();
    }
    // componentDidRender() {
    //     // const pageChanged = (this.page !== this.previousState['page'])
    //     // const zoomChanged = (this.zoomRequest && this.zoomRequest.value !== this.previousState['zoom'])
    //     if (this.viewer) {
    //         //if (pageChanged) {
    //         //this.viewer.goToPage(this.page)
    //         //}
    //         //if (zoomChanged) {
    //         //this.viewer.viewport.zoomTo(this.zoomRequest.value)
    //         //}
    //     }
    //     else if (this.url) {
    //         //this.load(this.url)
    //     }
    //     // Update duplicate state properties in order
    //     // to detect the next value change
    //     // this.previousState['page'] = this.page
    //     // this.previousState['zoom'] = this.zoomRequest && this.zoomRequest.value
    // }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    componentDidRender() {
        this.drawOverlays();
    }
    async openseadragon() {
        return this.instance;
    }
    async getOverlays() {
        return this.overlays;
    }
    handleOverlayClick(ev) {
        console.log('overlay click');
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
    create() {
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
        }
        const document = this.document;
        const resolver = this.resolver;
        //resolver.getTableOfContents()
        this.setDocumentTitle(resolver.title());
        // const tileSources = manifest.getSequences()[0].getCanvases().map((canvas) => {
        //     const images = canvas.getImages()
        //     const resource = images[0].getResource()
        //     //var json = '{"@context":"http://iiif.io/api/image/2/context.json","@id":"https://libimages1.princeton.edu/loris/pudl0001%2F4609321%2Fs42%2F00000004.jp2","height":7200,"width":5434,"profile":["http://iiif.io/api/image/2/level2.json"],"protocol":"http://iiif.io/api/image","tiles":[{"scaleFactors":[1,2,4,8,16,32],"width":1024}]}';
        //     //return JSON.parse(json);
        //     return resource.getServices()[0].id + '/info.json'
        // })
        this.setDocumentPages(resolver.pages());
        // Annotations
        this.setAnnotations(resolver.annotations());
        // Alternate formats
        this.setDocumentAlternateFormats(resolver.alternateFormats());
        this.instance = openseadragon({
            element: this.el.querySelector(".openseadragon"),
            prefixUrl: "/dist/vendors/openseadragon/images/",
            animationTime: 0.1,
            springStiffness: 10.0,
            showNavigator: true,
            navigatorPosition: "BOTTOM_RIGHT",
            showNavigationControl: false,
            showSequenceControl: false,
            sequenceMode: true,
            tileSources: resolver.tileSources(),
            initialPage: resolver.startPageIndex()
        });
        this.instance.addHandler('open', () => {
            this.clearOverlays();
            const page = this.instance.currentPage();
            this.setPage(page);
            this.instance.viewport.zoomTo(this.instance.viewport.getMinZoom(), null, true);
            this.instance.viewport.applyConstraints();
            this.setStatus('loaded');
            this.pageLoad.emit(this.page);
        });
        this.instance.addHandler('page', (page) => {
            this.setStatus('loading');
        });
        this.instance.addHandler('tile-loaded', (image) => {
        });
        this.instance.addHandler('zoom', (ev) => {
            if (isNaN(ev.zoom)) {
                return undefined;
            }
            const value = Number(ev.zoom);
            const min = this.instance.viewport.getMinZoom();
            const max = this.instance.viewport.getMaxZoom();
            const range = (max - min);
            let ratio = (range == 0) ? 0 : (value - min) / (max - min);
            // if (this.context) {
            //     this.context.shadowBlur = Math.round(ratio * 20 + 20)
            // }
            this.setZoom({
                min: min,
                max: max,
                ratio: ratio,
                value: ev.zoom
            });
        });
    }
    drawShadow() {
        // const canvas = this.el.querySelector('.openseadragon .openseadragon-canvas > canvas') as HTMLCanvasElement
        // if (canvas) {
        //     this.context = canvas.getContext('2d')
        //     if (this.context) {
        //         this.context.rect(188, 40, 200, 100)
        //         this.context.shadowColor = '#777'
        //         this.context.shadowBlur = 20
        //         this.context.shadowOffsetX = 5
        //         this.context.shadowOffsetY = 5
        //         this.context.fill()
        //         this.context.clearRect(188, 40, 200, 100)
        //         const image = this.openseadragonInstance.world.getItemAt(0)
        //         let bounds = image.getBounds(true)
        //         bounds = this.openseadragonInstance.viewport.viewportToViewerElementRectangle(bounds)
        //     }
        // }
    }
    // clearOverlays() {
    //     this.clearOverlays()
    //     // const elements = Array.from(this.el.querySelectorAll('.overlay'))
    //     // elements.forEach((elem) => elem.parentElement.removeChild(elem))
    // }
    drawOverlays() {
        // if (!this.instance) {
        //     this.create()
        // }
        const container = this.el.querySelector('.overlays');
        if (!container) {
            return undefined;
        }
        this.overlays.forEach((overlay) => {
            const element = container.querySelector(`#overlay-${overlay.id}`);
            if (element) {
                const bounds = this.instance.viewport.imageToViewportRectangle(overlay.x, overlay.y, overlay.width, overlay.height);
                this.instance.addOverlay(element, bounds, 'TOP_LEFT');
                if (overlay.text) {
                    tippy(element, {
                        appendTo: 'parent',
                        theme: 'harmonized-light',
                        placement: 'bottom',
                        animation: 'shift-toward',
                        arrow: false,
                        sticky: true,
                        plugins: [sticky],
                        content: overlay.text
                    });
                }
                // Required in order to prevent click propagation to OpenSeadragon
                new openseadragon.MouseTracker({
                    element: element, clickHandler: () => this.overlayClick.emit(overlay)
                });
            }
        });
    }
    render() {
        return h(Host, null,
            h("div", { class: "openseadragon" }),
            h("div", { class: "overlays" }, this.overlays.map((overlay) => h("harmonized-overlay", { id: "overlay-" + overlay.id, class: "overlay", tabindex: "-1" }))));
    }
    static get is() { return "harmonized-openseadragon"; }
    static get originalStyleUrls() { return {
        "$": ["openseadragon-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["openseadragon-component.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "document": {},
        "error": {},
        "url": {},
        "options": {},
        "overlays": {},
        "page": {},
        "pages": {},
        "zoomRequest": {}
    }; }
    static get events() { return [{
            "method": "overlayClick",
            "name": "overlayClick",
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
            "method": "pageLoad",
            "name": "pageLoad",
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
        "openseadragon": {
            "complexType": {
                "signature": "() => Promise<any>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<any>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "getOverlays": {
            "complexType": {
                "signature": "() => Promise<DocumentOverlay[]>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "DocumentOverlay": {
                        "location": "global"
                    }
                },
                "return": "Promise<DocumentOverlay[]>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "page",
            "methodName": "handlePageChange"
        }, {
            "propName": "url",
            "methodName": "handleUrlChange"
        }, {
            "propName": "zoomRequest",
            "methodName": "handleZoomRequest"
        }]; }
    static get listeners() { return [{
            "name": "overlayClick",
            "method": "handleOverlayClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
