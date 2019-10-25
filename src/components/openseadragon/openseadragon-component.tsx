import { Component, h, Element, Event, EventEmitter, Method, Listen, State, Prop } from '@stencil/core';
import openseadragon from 'openseadragon';
import { id } from '../../utils/utils';
import { Overlay } from '../../overlay';
import { Store, Unsubscribe } from "@stencil/redux";
import { setDocumentUrl } from "../../store/actions/document";
import { FetchService, CorsMode } from '../../services/fetch-service';

@Component({
    tag: 'harmonized-viewer-openseadragon',
    styleUrl: 'openseadragon-component.scss'
})
export class OpenSeadragonComponent {

    @Element() el: HTMLElement;

    @Event() overlayClick: EventEmitter;

    private openseadragon: any;
    private overlays: Overlay[] = [];

    setDocumentUrl: typeof setDocumentUrl;
    storeUnsubscribe: Unsubscribe;

    @State() url: MyAppState["document"]["url"];

    @Prop({ context: "store" }) store: Store;

    private fetch: FetchService = new FetchService();

    componentWillLoad() {
        this.store.mapDispatchToProps(this, { setDocumentUrl });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { url: url }
            } = state;
            return {
                url: url
            };
        });
    }

    componentWillRender() {
        if (this.url) {
            this.load(this.url);
        }
    }

    componentDidUnload() {
        this.storeUnsubscribe();
    }

    @Method()
    async getOverlays(): Promise<Overlay[]> {
        return Promise.resolve(this.overlays);
    }

    @Listen('overlayClick')
    handleOverlayClick(ev: MouseEvent) {
        console.log('overlay click');
    }

    load(url: string) {

        if (this.openseadragon) {
            this.openseadragon.destroy();
            this.openseadragon = null;
        }

        this.overlays.push({
            x: 50,
            y: 80,
            width: 500,
            height: 500,
            text: "test overlay"
        });

        //console.log("manifest fetch", this.stateUrl);

        if (url) {

            manifesto.loadManifest(url)
                .then((manifestJson: string) => {

                    const manifest = manifesto.create(manifestJson) as Manifesto.IManifest;

                    const tileSources = manifest.getSequences()[0].getCanvases().map(function (canvas) {
                        var images = canvas.getImages();
                        var resource = images[0].getResource();
                        var json = '{"@context":"http://iiif.io/api/image/2/context.json","@id":"https://libimages1.princeton.edu/loris/pudl0001%2F4609321%2Fs42%2F00000004.jp2","height":7200,"width":5434,"profile":["http://iiif.io/api/image/2/level2.json"],"protocol":"http://iiif.io/api/image","tiles":[{"scaleFactors":[1,2,4,8,16,32],"width":1024}]}';
                        return JSON.parse(json);
                        //return resource.getServices()[0].id + "/info.json";
                    });
                    //this.totalPages = tileSources.length;

                    this.openseadragon = openseadragon({
                        element: this.el.querySelector(".openseadragon"),
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

                        //this.page = this.openseadragon.currentPage();

                        //this.drawOverlays();
                        //this.drawShadow();

                        // this.handleCanvasLoad(this.openseadragon.world.getItemAt(0), () => {
                        //     //this.canvasLoaded.emit(this.page);
                        //     this.el.querySelector('.hv-openseadragon');
                        // });

                        //this.pageLoaded.emit(this.page);
                    });

                    // this.openseadragon.addHandler('close', () => {

                    // });
                });
        }

    }



    private drawOverlays() {

        this.overlays.forEach((overlay) => {

            const elementId = "hv-overlay-" + id();

            const element = document.createElement("a");
            element.id = elementId;
            element.href = "javascript:;";
            element.classList.add("hv-overlay", "bx--tooltip__trigger", "bx--tooltip--a11y", "bx--tooltip--bottom");

            const tooltip = document.createElement("span");
            tooltip.classList.add("bx--assistive-text");
            tooltip.innerHTML = overlay.text;
            element.appendChild(tooltip);

            const bounds = this.openseadragon.viewport.imageToViewportRectangle(overlay.x, overlay.y, overlay.width, overlay.height);

            this.openseadragon.addOverlay(element, bounds, "TOP_LEFT");

            // Required in order to prevent click propagation to OpenSeadragon
            overlay.mouseTracker = new openseadragon.MouseTracker({
                element: element,
                clickHandler: () => this.overlayClick.emit(element)
            });
        });
    }

    render() {
        return <div class="openseadragon"></div>;
    }
}
