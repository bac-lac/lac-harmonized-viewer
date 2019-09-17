import { MDCRipple } from '@material/ripple';
import { MDCMenu } from '@material/menu';
import { AnnotationsToggle, ManifestLoad, NavigationToggle } from "../events/event";
import { Component } from "./component";
import { ElementBuilder } from 'src/services/builder';

export class TopbarComponent extends Component {

    text: string;

    create(): HTMLElement {

        const header = document.createElement('header');
        header.className = 'hv-topbar mdc-top-app-bar';

        const row = document.createElement('div');
        row.className = 'hv-topbar__header mdc-top-app-bar__row';
        header.append(row);

        const start = document.createElement('div');
        start.className = 'mdc-top-app-bar__section mdc-top-app-bar__section--align-start';
        row.append(start);

        const menu = document.createElement('button');
        menu.className = 'hv-button-icon material-icons mdc-top-app-bar__navigation-icon mdc-icon-button';
        menu.textContent = 'menu';
        menu.addEventListener('click', () => this.publish(new NavigationToggle()));
        start.append(menu);

        const title = document.createElement('span');
        title.className = 'mdc-top-app-bar__title';
        start.append(title);

        return header;

        // this.addListener('click', '.hv-button-icon[data-target=navigation]', () => new NavigationToggle());
        // this.addListener('click', '.hv-button-icon[data-target=annotations]', () => new AnnotationsToggle());

        // this.on('manifest-load', (event: ManifestLoad) => {
        //     this.text = (event.manifest) ? event.manifest.getDefaultLabel() : 'Untitled';
        // });
    }

    async render() {

        Array.from(this.element.querySelectorAll('.mdc-button')).forEach(elem => {
            MDCRipple.attachTo(elem);
        });

        this.element.querySelector('.hv-manifest__title').textContent = this.text;

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