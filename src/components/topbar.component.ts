import { MDCRipple } from '@material/ripple';
import { MDCMenu } from '@material/menu';
import { AnnotationsToggle, ManifestLoad, NavigationToggle, ZoomChange } from "../events/event";
import { Component } from "./component";


export class TopbarComponent extends Component {

    text: string;

    private btnZoomMenu: MDCMenu;

    async init() {

        this.addListener('click', '.hv-button-icon[data-target=navigation]', () => new NavigationToggle());
        this.addListener('click', '.hv-button-icon[data-target=annotations]', () => new AnnotationsToggle());

        this.on('manifest-load', (event: ManifestLoad) => {
            this.text = (event.manifest) ? event.manifest.getDefaultLabel() : 'Untitled';
        });
    }

    async render() {

        Array.from(this.element.querySelectorAll(".mdc-button")).forEach(elem => {
            MDCRipple.attachTo(elem);
        });

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