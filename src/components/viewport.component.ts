import "manifesto.js";
import { Component } from "./component";
import { ManifestLoad, ManifestError, GoToPage, PageLoad, ZoomChange, GoToPrevious, GoToNext } from "../events/event";
import { MDCRipple } from "@material/ripple";

const openseadragon = require('openseadragon');

export class ViewportComponent extends Component {

    zoom: number;

    private openseadragon: any;
    private manifest: Manifesto.Manifest;

    async init() {

        this.showSpinner();

        this.on('manifest-load', () => this.createViewport);
        this.on('manifest-error', (event: ManifestError) => this.createError(event.error));

        this.on('page-load', (event: PageLoad) => this.hideSpinner());
        
        this.on('goto-page', (event: GoToPage) => this.goTo(event.page));

        this.on('goto-prev', (event: GoToPrevious) => this.previous());
        this.on('goto-next', (event: GoToNext) => this.next());

        this.initNavButtons();

        try {
            this.manifest = manifesto.create(
                await manifesto.loadManifest(this.options.manifestUrl)) as Manifesto.Manifest;
        }
        catch (err) {
            this.publish(new ManifestError(err));
        }

        this.publish(new ManifestLoad(this.manifest));
    }

    private initNavButtons() {

        const back = this.element.querySelector('.hv-button__prev');
        if (back) {
            MDCRipple.attachTo(back);
            back.addEventListener('click', () => {
                this.publish(new GoToPrevious())
            });
        }

        const next = this.element.querySelector('.hv-button__next');
        if (next) {
            MDCRipple.attachTo(next);
            next.addEventListener('click', () => {
                this.publish(new GoToNext())
            });
        }

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

        if (!this.manifest) {
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
            tileSources: sources
        });

        this.openseadragon.addHandler('open', (event) => {
            const page = event.eventSource.currentPage();
            const canvas = sequence.getCanvasByIndex(page);

            this.whenFullyLoaded(this.openseadragon.world.getItemAt(0), () => {
                this.publish(new PageLoad(page, canvas));
            });
        });

        this.openseadragon.addHandler('animation', (event) => {
            const zoom = event.eventSource.viewport.getZoom(false);
            if (this.zoom != zoom) {

                const minZoom = event.eventSource.viewport.getMinZoom();
                const maxZoom = event.eventSource.viewport.getMaxZoom();

                //const imageZoom = event.eventSource.viewport.viewportToImageZoom(zoom);
                const percentage = Math.round((zoom - minZoom) * 100 / (maxZoom - minZoom));

                this.zoom = zoom;
                this.publish(new ZoomChange(zoom, percentage));
            }
        });
    }

    private whenFullyLoaded(tiledImage: any, callback: () => any) {
        if (tiledImage.getFullyLoaded()) {
            setTimeout(callback, 1); // So both paths are asynchronous
        } else {
            tiledImage.addOnceHandler('fully-loaded-change', function () {
                callback(); // Calling it this way keeps the arguments consistent (if we passed callback into addOnceHandler it would get an event on this path but not on the setTimeout path above)
            });
        }
    }

    private getSpinner(): HTMLElement {

        let spinner: HTMLElement = this.element.querySelector('.hv-spinner');

        if (!spinner) {
            spinner = document.createElement('div');
            spinner.classList.add('hv-spinner');
            this.element.append(spinner);
        }

        return spinner;
    }

    private showSpinner() {
        let spinner = this.getSpinner();
        spinner.classList.remove('hv-spinner--hidden');
    }

    private hideSpinner() {
        let spinner = this.getSpinner();
        spinner.classList.add('hv-spinner--hidden');
    }

    goTo(page: number) {
        if (!this.openseadragon) {
            return undefined;
        }
        this.showSpinner();
        this.openseadragon.goToPage(page);
    }

    previous() {
        if (!this.openseadragon) {
            return undefined;
        }
        const page = this.page();
        return this.goTo((page > 0) ? page - 1 : 0);
    }

    next() {
        if (!this.openseadragon || !this.manifest) {
            return undefined;
        }

        const sequence = this.manifest.getSequenceByIndex(0);

        const page = this.page();
        const pageCount = sequence.getTotalCanvases();

        return this.goTo((page < pageCount) ? page + 1 : pageCount - 1);
    }

    private createError(err: Error) {

        if (!err) {
            return undefined;
        }

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