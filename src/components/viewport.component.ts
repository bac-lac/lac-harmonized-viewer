import "manifesto.js";
import { Component, BaseComponent } from "./base.component";
import { MDCRipple } from "@material/ripple";
import { HarmonizedViewer } from "..";
import { ViewportOptions } from "../options/viewport.options";
import { ManifestLoad } from "../events/manifest-load.event";
import { PageLoad } from "../events/page-load.event";
import { PageRequest } from "../events/page-request.event";
import { ZoomChange } from "../events/zoom-change.event";
import { ManifestError } from "../events/manifest-error.event";
import { PagePrevious } from "~/events/page-previous.event";
import { PageNext } from "~/events/page-next.event";
import { ToolbarComponent } from "./toolbar.component";
import { PageSliderComponent } from "./pageslider.component";

const openseadragon = require('openseadragon');

export class ViewportComponent extends BaseComponent implements Component {

    page: number = 1;
    totalPages: number;

    zoom: number;

    manifest: string;
    options: ViewportOptions;

    protected openseadragon: any;
    protected openseadragonId: string;

    private mainElement: HTMLElement;

    constructor(instance: HarmonizedViewer, manifest: string, options: ViewportOptions) {
        super(instance);
        this.manifest = manifest;
        this.options = options;
        this.openseadragonId = this.uniqueid();
    }

    create() {

        const container = document.createElement('div');
        container.className = 'mdc-drawer-app-content mdc-top-app-bar--fixed-adjust';

        const toolbar = new ToolbarComponent(this.instance);
        container.append(toolbar.getElement());

        this.mainElement = document.createElement('main');
        this.mainElement .className = 'hv-content main-content';
        container.append(this.mainElement );

        const viewport = document.createElement('div');
        viewport.id = this.openseadragonId;
        viewport.className = 'hv-viewport';
        this.mainElement.append(viewport);

        const pageSlider = new PageSliderComponent(this.instance);
        container.append(pageSlider.getElement());

        return container;
    }

    async init() {
        this.showProgressBar();
    }

    async bind() {
        this.on('manifest-load', (event: ManifestLoad) => this.createViewport(event.manifest));
        this.on('manifest-error', (event: ManifestError) => this.createAlert(event.error));
        this.on('page-load', (event: PageLoad) => this.pageLoad(event));
        this.on('page-request', (event: PageRequest) => this.pageRequest(event));
        this.on('page-prev', (event: PagePrevious) => this.previous());
        this.on('page-next', (event: PageNext) => this.next());
    }

    async load() {

        try {
            const manifest = manifesto.create(
                await manifesto.loadManifest(this.manifest)) as Manifesto.Manifest;

            this.publish('manifest-load', new ManifestLoad(manifest));
        }
        catch (err) {
            this.publish('manifest-error', new ManifestError(err));
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
        this.publish('page-request', new PageRequest(page));
    }

    protected createViewport(manifest: Manifesto.Manifest) {

        console.log(manifest);

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

                this.publish('zoom-change', new ZoomChange(zoom, percentage));
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

    private getProgressBar(): HTMLElement {

        let progressBar = this.element.querySelector('.hv-progress-bar') as HTMLElement;

        if (!progressBar) {

            progressBar = document.createElement('div');
            progressBar.setAttribute('role', 'progressbar');
            progressBar.className = 'hv-progress-bar mdc-linear-progress mdc-linear-progress--indeterminate';

            const bufferDots = document.createElement('div');
            bufferDots.className = 'mdc-linear-progress__buffering-dots';
            progressBar.append(bufferDots);

            const buffer = document.createElement('div');
            buffer.className = 'mdc-linear-progress__buffer';
            progressBar.append(buffer);

            const primaryBar = document.createElement('div');
            primaryBar.className = 'mdc-linear-progress__bar mdc-linear-progress__primary-bar';
            progressBar.append(primaryBar);

            const primaryBarInner = document.createElement('span');
            primaryBarInner.className = 'mdc-linear-progress__bar-inner';
            primaryBar.append(primaryBarInner);

            const secondaryBar = document.createElement('div');
            secondaryBar.className = 'mdc-linear-progress__bar mdc-linear-progress__secondary-bar';
            progressBar.append(secondaryBar);

            const secondaryBarInner = document.createElement('span');
            secondaryBarInner.className = 'mdc-linear-progress__bar-inner';
            secondaryBar.append(secondaryBarInner);

            this.mainElement.prepend(progressBar);
        }

        return progressBar;
    }

    private showProgressBar() {
        let spinner = this.getProgressBar();
        spinner.classList.remove('mdc-linear-progress--closed');
    }

    private hideProgressBar() {
        let spinner = this.getProgressBar();
        spinner.classList.add('mdc-linear-progress--closed');
    }

    private pageRequest(event: PageRequest) {
        if (!event) {
            return undefined;
        }
        this.showProgressBar();
        this.openseadragon.goToPage(event.page);
    }

    private pageLoad(event: PageLoad) {
        if (!event) {
            return undefined;
        }
        this.hideProgressBar();
    }

    previous() {
        return this.goto((this.page > 0) ? this.page - 1 : 0);
    }

    next() {
        return this.goto((this.page < this.totalPages) ? this.page + 1 : this.totalPages - 1);
    }

    protected createAlert(error: Error) {

        if (!error) {
            return undefined;
        }

        const alert = document.createElement('div');
        alert.className = 'hv-error';

        const elementIcon = document.createElement('span');
        elementIcon.className = 'hv-error-icon material-icons';
        elementIcon.textContent = 'error_outline';
        alert.append(elementIcon);

        const elementText = document.createElement('span');
        elementText.innerHTML = 'An unexpected error happened.<br>Please try again later.';
        alert.append(elementText);

        this.getElement().append(alert);
    }
}