import { Component, Element, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { getInstance } from '../../utils/utils';
import openseadragon from 'openseadragon';
import '../../utils/manifest';
import { Locale } from '../../services/locale';
import { ManifestExtensions } from '../../utils/manifest';

@Component({
    tag: 'hv-viewport',
    styleUrls: ['viewport-component.scss', '../../../node_modules/animate.css/animate.min.css']
})
export class ViewportComponent {

    @Element() el: HTMLElement;

    @Prop() page: number = 0;
    @Prop() totalPages: number = 0;

    @Prop() manifest: string;
    @Prop() openseadragon: any;

    @Event() manifestLoaded: EventEmitter;
    @Event() canvasLoaded: EventEmitter;
    @Event() pageLoaded: EventEmitter;

    private buttonPrevious: HTMLButtonElement;
    private buttonNext: HTMLButtonElement;

    private locale: Locale = new Locale();

    componentDidLoad() {

        if (this.openseadragon) {
            this.openseadragon.destroy();
            this.openseadragon = null;
        }

        const topbar = getInstance(this.el).querySelector('.hv-topbar') as HTMLHvTopbarElement;
        const instance = this.el.querySelector('.hv-openseadragon');

        manifesto.loadManifest(this.manifest)
            .then((manifestJson: string) => {

                const manifest = manifesto.create(manifestJson) as Manifesto.IManifest;

                this.manifestLoaded.emit(manifest);

                //console.log(manifest);

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

    private drawShadow() {

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
        return (
            <div class="hv-viewport">
                <button type="button" class="bx--btn bx--btn--secondary bx--btn--icon-only hv-navigation__prev" onClick={(e) => this.previous()} ref={elem => this.buttonPrevious = elem}>
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 16L20 6l1.4 1.4-8.6 8.6 8.6 8.6L20 26z"></path><title>Chevron left</title></svg>
                </button>
                <div class="hv-openseadragon">
                </div>
                <button type="button" class="bx--btn bx--btn--secondary bx--btn--icon-only hv-navigation__next" onClick={(e) => this.next()} ref={elem => this.buttonNext = elem}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        );
    }
}