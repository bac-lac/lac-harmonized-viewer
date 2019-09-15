import "manifesto.js";
import { Component } from "./component";
import { ManifestLoad, ManifestError, GoToPage, PageLoaded, ZoomChange } from "../events/event";

const openseadragon = require('openseadragon');

export class ViewportComponent extends Component {

    zoom: number;

    private openseadragon: any;
    private manifest: Manifesto.Manifest;

    async init() {

        this.on('manifest-load', () => this.createViewport);
        this.on('manifest-error', (event: ManifestError) => {
            this.createError(event.error);
        });
        this.on('goto-page', (event: GoToPage) => this.goTo(event.page));

        try {
            this.manifest = manifesto.create(
                await manifesto.loadManifest(this.options.manifestUrl)) as Manifesto.Manifest;
        }
        catch (err) {
            this.publish(new ManifestError(err));
        }

        this.publish(new ManifestLoad(this.manifest));
    }

    async render() {
        this.createViewport();
    }

    page() {
        if (!this.openseadragon) {
            return -1;
        }
        else {
            return this.openseadragon.currentPage();
        }
    }

    private createViewport() {

        if(!this.manifest) {
            return;
        }

        if (this.openseadragon) {
            this.openseadragon.destroy();
        }

        const sequence = this.manifest.getSequences()[0];

        const sources = sequence.getCanvases().map(function (canvas) {
            var images = canvas.getImages();
            return images[0].getResource().getServices()[0].id + "/info.json";
        });

        this.openseadragon = openseadragon({
            id: "osd",
            prefixUrl: "/dist/vendors/openseadragon/images/",
            animationTime: 0.25,
            springStiffness: 10.0,
            showNavigator: true,
            navigatorPosition: "BOTTOM_RIGHT",
            showNavigationControl: false,
            showSequenceControl: false,
            sequenceMode: true,
            placeholderFillStyle: '#dddddd',
            tileSources: sources
        });

        this.openseadragon.addHandler('open', (event) => {
            const page = event.eventSource.currentPage();
            this.publish(new PageLoaded(page));
        });

        this.openseadragon.addHandler('tile-loaded', (event) => {
            console.log(event);
        });

        this.openseadragon.addHandler('animation', (event) => {
            const zoom = event.eventSource.viewport.getZoom(false);
            if (this.zoom != zoom) {

                const minZoom = event.eventSource.viewport.getMinZoom();
                const maxZoom = event.eventSource.viewport.getMaxZoom();

                const imageZoom = event.eventSource.viewport.viewportToImageZoom(zoom);
                const percentage = Math.round((zoom - minZoom) * 100 / (maxZoom - minZoom));

                this.zoom = zoom;
                this.publish(new ZoomChange(zoom, percentage));
            }
        });
    }

    private goTo(page: number) {
        if (this.openseadragon) {
            this.openseadragon.goToPage(page);
        }
    }

    private createError(error: Error) {

        const alert = document.createElement('div');
        alert.className = 'hv-error';

        const icon = document.createElement('span');
        icon.className = 'hv-error-icon material-icons';
        icon.textContent = 'error_outline';
        alert.append(icon);

        const text = document.createElement('span');
        text.innerHTML = 'An unexpected error happened.<br>Please try again later.';
        alert.append(text);

        this.element.append(alert);

    }
}

export interface IViewportOptions {
    element: HTMLElement;
    manifest: Manifesto.Manifest;
}