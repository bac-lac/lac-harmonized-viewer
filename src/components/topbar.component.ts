import { MDCMenu } from '@material/menu';
import { NavigationToggle } from "../events/event";
import { Component } from "./component";

const handlebars = require('handlebars');
require('./topbar/_partial.js');

export class TopbarComponent extends Component {

    text: string;

    private elementName: string = 'header';

    create() {

        const template = handlebars.templates['_partial.hbs'];

        // const element = document.createElement('header');
        // element.className = 'hv-topbar mdc-top-app-bar';

        // const row = document.createElement('div');
        // row.className = 'hv-topbar__header mdc-top-app-bar__row';
        // element.append(row);

        // const start = document.createElement('div');
        // start.className = 'mdc-top-app-bar__section mdc-top-app-bar__section--align-start';
        // row.append(start);

        // const menu = document.createElement('button');
        // menu.className = 'hv-button-icon material-icons mdc-top-app-bar__navigation-icon mdc-icon-button';
        // menu.textContent = 'menu';
        // start.append(menu);

        // menu.addEventListener('click', () => this.publish(new NavigationToggle()));

        // const title = document.createElement('span');
        // title.className = 'hv-manifest__title mdc-top-app-bar__title';
        // start.append(title);

        const element = document.createElement(this.elementName);
        element.innerHTML = template();

        return element;

        // this.addListener('click', '.hv-button-icon[data-target=navigation]', () => new NavigationToggle());
        // this.addListener('click', '.hv-button-icon[data-target=annotations]', () => new AnnotationsToggle());

        // this.on('manifest-load', (event: ManifestLoad) => {
        //     this.text = (event.manifest) ? event.manifest.getDefaultLabel() : 'Untitled';
        // });
    }

    async load() {

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