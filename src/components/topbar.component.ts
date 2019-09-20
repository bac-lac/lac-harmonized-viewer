import { Component, BaseComponent } from "./base.component";
import { ManifestLoad } from "../events/manifest-load.event";

export class TopbarComponent extends BaseComponent implements Component {

    title: string;

    private buttonNavigation: HTMLElement;
    private titleElement: HTMLElement;

    create() {

        const header = document.createElement('header');
        header.className = 'hv-topbar mdc-top-app-bar';

        const row = document.createElement('div');
        row.className = 'hv-topbar__header mdc-top-app-bar__row';
        header.append(row);

        const start = document.createElement('div');
        start.className = 'mdc-top-app-bar__section mdc-top-app-bar__section--align-start';
        row.append(start);

        this.buttonNavigation = document.createElement('button');
        this.buttonNavigation.className = 'hv-button-icon material-icons mdc-top-app-bar__navigation-icon mdc-icon-button';
        this.buttonNavigation.textContent = 'menu';
        start.append(this.buttonNavigation);

        this.titleElement = document.createElement('span');
        this.titleElement.className = 'hv-manifest__title mdc-top-app-bar__title';
        this.titleElement.textContent = this.title;
        start.append(this.titleElement);

        return header;
    }

    async bind() {

        if (this.buttonNavigation) {
            this.buttonNavigation.addEventListener('click', () => this.publish('navigation-toggle'));
        }

        this.on('manifest-load', (event: ManifestLoad) => this.manifestLoaded(event));

    }

    private manifestLoaded(event: ManifestLoad) {
        if(!event) {
            return undefined;
        }
        this.titleElement.textContent = event.manifest.getDefaultLabel();
    }

}