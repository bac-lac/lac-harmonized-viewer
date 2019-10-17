import { Component, Element, h, Prop, Event, EventEmitter, Watch, Method, Listen } from '@stencil/core';
import openseadragon from 'openseadragon';
import '../../utils/manifest';
import { Overlay } from '../../overlay';
import { id } from '../../utils/utils';

@Component({
    tag: 'hv-viewport',
    styleUrls: [
        'viewport-component.scss',
        '../../../node_modules/animate.css/animate.min.css']
})
export class ViewportComponent {

    @Element() el: HTMLElement;

    @Prop() page: number = 0;
    @Prop() totalPages: number = 0;

    @Prop() url: string;

    @Prop() openseadragon: any;

    @Event() manifestLoaded: EventEmitter;
    @Event() canvasLoaded: EventEmitter;
    @Event() pageLoaded: EventEmitter;
    @Event() overlayClick: EventEmitter;

    @Listen('nextLoad')
    onNextLoad(event: CustomEvent) {
        console.log('nextload');
    }

    @Prop() overlays: Overlay[] = [];

    private buttonPrevious: HTMLButtonElement;
    private buttonNext: HTMLButtonElement;

    @Method()
    async addOverlay(x: number, y: number) {

    }

    @Method()
    async getOverlays(): Promise<Overlay[]> {
        return Promise.resolve(this.overlays);
    }

    @Listen('overlayClick')
    overlayClickHandler(event: MouseEvent) {
        console.log('overlay click');
    }

    componentDidLoad() {

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

        const instance = this.el.querySelector('.hv-openseadragon');

        manifesto.loadManifest(this.url)
            .then((manifestJson: string) => {

                const manifest = manifesto.create(manifestJson) as Manifesto.IManifest;

                this.manifestLoaded.emit(manifest);

                //console.log(manifest);

                // var manifestLanguage = Locale.resolve(manifest.options.locale, this.locale.all());
                // manifest.options.locale = manifestLanguage;

                // const document = new ManifestExtensions(manifest);

                // topbar.title = document.label();
                // topbar.publisher = document.creator();
                // topbar.thumbnail = manifest.getLogo();

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

                    this.drawOverlays();
                    //this.drawShadow();

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

    @Watch('page')
    pageHandler() {
        this.buttonPrevious.disabled = (this.page === 0);
        this.buttonNext.disabled = (this.page === this.totalPages - 1);
    }

    private handleCanvasLoad(tiledImage: any, callback: () => any) {
        if (tiledImage.getFullyLoaded()) {
            setTimeout(callback, 1); // So both paths are asynchronous
        } else {
            tiledImage.addOnceHandler('fully-loaded-change', function () {
                callback(); // Calling it this way keeps the arguments consistent (if we passed callback into addOnceHandler it would get an event on this path but not on the setTimeout path above)
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

    private drawShadow() {

        var shadow = document.createElement('div');
        shadow.style.backgroundColor = 'transparent';

        var bounds = this.openseadragon.world.getItemAt(0).getBounds();

        shadow.style.width = bounds.width.toString() + 'px';
        shadow.style.height = bounds.height.toString() + 'px';
        shadow.style.boxShadow = '5px 5px 12px 3px rgba(76, 86, 106, 0.3)';

        this.openseadragon.addOverlay(shadow, bounds, 'CENTER');

    }

    previous(event: MouseEvent) {
        const page = this.openseadragon.currentPage();
        if (page > 0) {
            this.openseadragon.goToPage(page - 1);
        }
    }

    next(event: MouseEvent) {
        const page = this.openseadragon.currentPage();
        const totalPages = this.openseadragon.tileSources.length;
        if (page < (totalPages - 1)) {
            this.openseadragon.goToPage(page + 1);
        }
    }

    render() {
        return (
            <div class="hv-viewport">
                <button type="button" class="bx--btn bx--btn--secondary bx--btn--icon-only hv-navigation__prev" onClick={(ev) => this.previous(ev)} ref={elem => this.buttonPrevious = elem}>
                    <slot name="viewport-previous">
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 16L20 6l1.4 1.4-8.6 8.6 8.6 8.6L20 26z"></path><title>Chevron left</title></svg>
                    </slot>
                </button>
                <div class="hv-openseadragon">
                </div>
                <button type="button" class="bx--btn bx--btn--secondary bx--btn--icon-only hv-navigation__next" onClick={(ev) => this.next(ev)} ref={elem => this.buttonNext = elem}>
                    <slot name="viewport-next">
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M22 16L12 26l-1.4-1.4 8.6-8.6-8.6-8.6L12 6z"></path><title>Chevron right</title></svg>
                    </slot>
                </button>
            </div>
        );
    }
}