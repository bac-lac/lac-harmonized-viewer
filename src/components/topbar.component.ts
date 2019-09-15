import { MDCMenu } from '@material/menu';

import { Component } from "./component";
import { NavigationToggle, ManifestLoad, ZoomChange, AnnotationsToggle } from "../events/event";

export class TopbarComponent extends Component {

    text: string;

    private btnZoomMenu: MDCMenu;

    async init() {

        this.addListener('click', '.hv-button-icon[data-target=navigation]', () => new NavigationToggle());
        this.addListener('click', '.hv-button-icon[data-target=annotations]', () => new AnnotationsToggle());

        this.on('manifest-load', (event: ManifestLoad) => {
            this.text = (event.manifest) ? event.manifest.getDefaultLabel() : 'Untitled';
        });

        this.on('zoom-change', (event: ZoomChange) => {
            const elements = this.element.querySelectorAll('[data-bind=zoom-percentage]');
            Array.from(elements).forEach((elem) => {
                elem.textContent = Math.round(event.percentage) + '%';
            });
        });
    }

    async render() {
        this.element.querySelector(".mdc-top-app-bar__title").textContent = this.text;

        const buttonZoom = document.querySelector('.hv-zoom-button');
        if (buttonZoom) {
            const menuZoom = new MDCMenu(buttonZoom.nextElementSibling as HTMLElement);
            menuZoom.quickOpen = true;
            menuZoom.setAnchorMargin({
                top: 36,
                left: 0
            });
            buttonZoom.addEventListener('click', () => {
                menuZoom.open = true;
            });
        }
    }
}