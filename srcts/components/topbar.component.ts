import { MDCMenu } from '@material/menu';
import { Component } from "./component";
import { NavigationToggle, ManifestLoad, AnnotationsToggle } from '../events/event';

//const templates = require('../../templates').Handlebars.templates;

export class TopbarComponent extends Component {

    text: string;

    constructor(element: HTMLElement) {
        super(element);
        this.element = element;
    }

    create() {

        const element = document.createElement('header');
        element.className = 'hv-topbar mdc-top-app-bar';

        const row = document.createElement('div');
        row.className = 'hv-topbar__header mdc-top-app-bar__row';
        element.append(row);

        const start = document.createElement('div');
        start.className = 'mdc-top-app-bar__section mdc-top-app-bar__section--align-start';
        row.append(start);

        const toggle = document.createElement('button');
        toggle.className = 'hv-button-icon material-icons mdc-top-app-bar__navigation-icon mdc-icon-button';
        toggle.textContent = 'menu';
        start.append(toggle);

        const title = document.createElement('span');
        title.className = 'hv-manifest__title mdc-top-app-bar__title';
        start.append(title);

        const end = document.createElement('div');
        end.className = 'mdc-top-app-bar__section mdc-top-app-bar__section--align-end';
        row.append(end);

        const more = document.createElement('button');
        more.className = 'hv-button-icon material-icons mdc-top-app-bar__navigation-icon mdc-icon-button';
        more.textContent = 'more_vert';
        end.append(more);

        toggle.addEventListener('click', () => this.publish(new NavigationToggle()));

        //this.addListener('click', '.hv-button-icon[data-target=navigation]', () => new NavigationToggle());
        //this.addListener('click', '.hv-button-icon[data-target=annotations]', () => new AnnotationsToggle());        

        return element;
    }

    bind() {

        this.on('manifest-load', (event: ManifestLoad) => {
            this.text = (event.manifest) ? event.manifest.getDefaultLabel() : 'Untitled';
        });

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