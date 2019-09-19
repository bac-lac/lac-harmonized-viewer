import "manifesto.js";
import { Component, BaseComponent } from "./component";
import { MDCRipple } from "@material/ripple";
import { HarmonizedViewer } from "..";
import { ViewportOptions } from "../options/viewport.options";
import { ManifestLoad } from "../events/manifest-load.event";
import { PageLoad } from "../events/page-load.event";
import { PageRequest } from "../events/page-request.event";
import { ZoomChange } from "../events/zoom-change.event";

const openseadragon = require('openseadragon');

export class ViewportComponent extends BaseComponent implements Component {

    page: number = 1;
    totalPages: number;

    zoom: number;

    manifest: string;
    options: ViewportOptions;

    protected openseadragon: any;
    protected openseadragonId: string;

    constructor(instance: HarmonizedViewer, manifest: string, options: ViewportOptions) {
        super(instance);
        this.manifest = manifest;
        this.options = options;
        this.openseadragonId = this.uniqueid();
    }

    create() {

        const container = document.createElement('div');
        container.className = 'mdc-drawer-app-content mdc-top-app-bar--fixed-adjust';

        const main = document.createElement('main');
        main.className = 'hv-content main-content';
        container.append(main);

        const viewport = document.createElement('div');
        viewport.id = this.openseadragonId;
        viewport.className = 'hv-viewport';
        main.append(viewport);

        return container;
    }

    init() {
        this.showSpinner();
    }

    bind() {
        this.on('manifest-load', (event: ManifestLoad) => this.createViewport(event.manifest));
        //this.on('manifest-error', (event: ManifestError) => this.createError(event.error));
        //this.on('page-load', (event: PageLoad) => this.hideSpinner());
        //this.on('page-page', (event: GoToPage) => this.goToHandler(event));
        //this.on('goto-prev', (event: GoToPrevious) => this.previous());
        //this.on('goto-next', (event: GoToNext) => this.next());
    }

    async load() {

        try {

            const manifest = manifesto.create(
                await manifesto.loadManifest(this.manifest)) as Manifesto.Manifest;

            this.publish('manifest-load', new ManifestLoad(manifest));
        }
        catch (err) {
            //this.publish(new ManifestError(err));
        }
        this.initNavButtons();
        //this.createViewport();
    }

    private initNavButtons() {

        const back = this.element.querySelector('.hv-button__prev');
        if (back) {
            MDCRipple.attachTo(back);
            back.addEventListener('click', () => this.publish('page-previous'));
        }

        const next = this.element.querySelector('.hv-button__next');
        if (next) {
            MDCRipple.attachTo(next);
            next.addEventListener('click', () => this.publish('page-next'));
        }

    }

    currentPage() {
        if (!this.openseadragon) {
            return -1;
        }
        else {
            return this.openseadragon.currentPage();
        }
    }

    goto(page: number) {
        this.publish('page-request', page);
    }

    protected createViewport(manifest: Manifesto.Manifest) {

        if (!manifest) {
            return undefined;
        }

        if (this.openseadragon) {
            this.openseadragon.destroy();
        }

        const sequence = manifest.getSequences()[0];

        const sources = sequence.getCanvases().map(function (canvas) {
            var images = canvas.getImages();
            return images[0].getResource().getServices()[0].id + "/info.json";
        });

        this.openseadragon = openseadragon({
            id: this.openseadragonId,
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
                this.publish('page-load', new PageLoad(page));
            });
        });

        this.openseadragon.addHandler('animation', (event) => {
            const zoom = event.eventSource.viewport.getZoom(false) as number;
            if (this.zoom != zoom) {

                this.zoom = zoom;

                const minZoom = event.eventSource.viewport.getMinZoom();
                const maxZoom = event.eventSource.viewport.getMaxZoom();

                //const imageZoom = event.eventSource.viewport.viewportToImageZoom(zoom);
                const percentage = Math.round((zoom - minZoom) * 100 / (maxZoom - minZoom));

                this.publish('zoom-change', zoom, percentage);
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

    private onPageLoad(event: PageLoad) {
        if (!event || !this.openseadragon) {
            return undefined;
        }
        this.showSpinner();
        this.openseadragon.goToPage(event.page);
    }

    previous() {
        return this.goto((this.page > 0) ? this.page - 1 : 0);
    }

    next() {
        return this.goto((this.page < this.totalPages) ? this.page + 1 : this.totalPages - 1);
    }

    private showError(err: Error) {

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

        this.getElement().append(alert);
    }
}

export interface IViewportOptions {
    element: HTMLElement;
    manifest: Manifesto.Manifest;
}