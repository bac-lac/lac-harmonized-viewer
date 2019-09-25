import { BaseComponent, Component } from "./base.component";
import { ZoomChange } from "../events/zoom-change.event";
import { ManifestLoad } from "../events/manifest-load.event";
import { PageLoad } from "../events/page-load.event";
import { PageRequest } from "../events/page-request.event";
import noUiSlider = require("nouislider");

export class ToolbarComponent extends BaseComponent implements Component {

    private totalPages: number;

    create() {

        const element = document.createElement('div');
        element.className = 'hv-toolbar';

        const inner = document.createElement('div');
        inner.className = 'hv-toolbar__inner';
        element.append(inner);

        const left = document.createElement('div');
        left.className = 'hv-toolbar__cell mdc-layout-grid__cell--span-10';
        inner.append(left);

        const right = document.createElement('div');
        right.className = 'hv-toolbar__cell hv-toolbar__cell--right mdc-layout-grid__cell--align-middle mdc-layout-grid__cell--span-2';
        inner.append(right);

        const buttonNavigationToggle = this.createButtonNavigationToggle();
        left.append(buttonNavigationToggle);

        const buttonDownload = this.createButtonDownloadPDFButton();
        left.append(buttonDownload);

        const buttonNavigationPrev = this.createButtonNavigationPrevious();
        right.append(buttonNavigationPrev);

        const buttonNavigationNext = this.createButtonNavigationNext();
        right.append(buttonNavigationNext);

        // const buttonFullscreen = this.createButtonFullscreen();
        // right.append(buttonFullscreen);

        return element;
    }

    async bind() {

        this.instance.on('manifest-load', (event: ManifestLoad) => this.manifestLoad(event));
        this.instance.on('page-request', (event: PageRequest) => this.pageRequest(event));
        this.instance.on('page-load', (event: PageLoad) => this.pageLoad(event));
        this.instance.on('zoom-change', (event: ZoomChange) => {

            const buttonZoom = this.element.querySelector('.hv-zoom-button');
            if (buttonZoom) {

                const label = buttonZoom.querySelector('span');
                if (label) {
                    label.textContent = Math.round(event.percentage) + '%';
                }
            }

        });

    }

    protected manifestLoad(event: ManifestLoad) {
        if (!event || !event.manifest) {
            return undefined;
        }
        this.totalPages = event.manifest.getSequenceByIndex(0).getTotalCanvases();

        //this.createPageSlider(this.totalPages);
    }

    protected pageLoad(event: PageLoad) {
        if (!event) {
            return undefined;
        }
        //this.updateStatus(event.page);
        //this.updatePageSlider(event.page);
    }

    protected pageRequest(event: PageRequest) {
        if (!event) {
            return undefined;
        }
        //this.updateStatus(event.page);
        //this.updatePageSlider(event.page);
    }

    // private createButtonDisplayMode() {

    //     const button = document.createElement('button');
    //     button.type = 'button';
    //     button.className = 'mdc-button';

    //     const icon = document.createElement('span');
    //     icon.className = 'mdc-button__icon iconify';
    //     icon.setAttribute('data-icon', 'mdi:monitor');
    //     //icon.textContent = 'desktop_windows';
    //     button.append(icon);

    //     const label = document.createElement('span');
    //     label.className = 'mdc-button__label';
    //     label.textContent = 'Display mode';
    //     button.append(label);

    //     return button;
    // }

    private createButtonDownloadPDFButton() {

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mdc-button';

        const icon = document.createElement('i');
        icon.className = 'mdc-button__icon iconify';
        icon.setAttribute('data-icon', 'mdi:cloud-download');
        //icon.textContent = 'cloud_download';
        button.append(icon);

        const label = document.createElement('span');
        label.className = 'mdc-button__label';
        label.textContent = 'Download PDF';
        button.append(label);

        return button;
    }

    private createButtonFullscreen() {

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mdc-button';
        button.setAttribute('data-tippy-content', 'Fullscreen');

        const icon = document.createElement('i');
        icon.className = 'mdc-button__icon material-icons';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = 'fullscreen';
        button.append(icon);

        return button;
    }

    private createButtonNavigationPrevious() {

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mdc-button hv-button--icon';
        //button.setAttribute('data-tippy-content', 'Previous');

        const icon = document.createElement('i');
        icon.className = 'mdc-button__icon iconify';
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('data-icon', 'mdi:menu-left');
        button.append(icon);

        return button;
    }

    private createButtonNavigationNext() {

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mdc-button hv-button--icon';
        //button.setAttribute('data-tippy-content', 'Previous');

        const icon = document.createElement('i');
        icon.className = 'mdc-button__icon iconify';
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('data-icon', 'mdi:menu-right');
        button.append(icon);

        return button;
    }

    private createButtonNavigationToggle() {

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mdc-button';
        //button.setAttribute('data-tippy-content', 'Previous');

        const icon = document.createElement('i');
        icon.className = 'mdc-button__icon iconify';
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('data-icon', 'mdi:arrow-collapse-left');
        button.append(icon);

        const label = document.createElement('span');
        label.className = 'mdc-button__label';
        label.textContent = 'Close navigation';
        button.append(label);

        return button;

    }

}