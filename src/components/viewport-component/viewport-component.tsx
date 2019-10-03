import { Component, Element, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import openseadragon from 'openseadragon';
import 'manifesto.js';
import { root } from '../../utils/utils';

@Component({
    tag: 'hv-viewport',
    styleUrl: 'viewport-component.scss'
})
export class ViewportComponent {

    @Element() el: HTMLElement;

    @Prop() manifest: string;
    @Prop() openseadragon: any;

    @State() current: number = 0;

    @Event() manifestLoaded: EventEmitter;
    @Event() canvasLoaded: EventEmitter;

    componentDidLoad() {

        if (this.openseadragon) {
            this.openseadragon.destroy();
            this.openseadragon = null;
        }

        var topbar = root(this.el).querySelector('.hv-topbar') as HTMLHvTopbarElement;
        var instance = this.el.querySelector('.hv-openseadragon');

        manifesto.loadManifest(this.manifest)
            .then((manifestJson: string) => {

                const manifest = manifesto.create(manifestJson) as Manifesto.IManifest;

                this.manifestLoaded.emit(manifest);

                topbar.title = manifest.getDefaultLabel();
                topbar.publisher = manifest.getMetadata().find(x => x.getLabel() == 'Creator').getValue();
                topbar.thumbnail = manifest.getLogo();


                const tileSources = manifest.getSequences()[0].getCanvases().map(function (canvas) {
                    var images = canvas.getImages();
                    return images[0].getResource().getServices()[0].id + "/info.json";
                });

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
                    this.drawShadow();
                    this.handleCanvasLoad(this.openseadragon.world.getItemAt(0), () => {
                        this.canvasLoaded.emit(this.openseadragon.currentPage());
                    });
                });

                this.openseadragon.addHandler('close', () => {
                    //console.log('ev');
                    //this.clearOverlays();
                });

            });
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
                <button type="button" class="hv-navigation__prev" onClick={(e) => this.previous()}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="hv-openseadragon">
                </div>
                <button type="button" class="hv-navigation__next" onClick={(e) => this.next()}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        );
    }
}