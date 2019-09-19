import { Component, BaseComponent } from "./component";
import { NavigationToggle } from "../common/events";

export class TopbarComponent extends BaseComponent implements Component {

    private buttonNavigation: HTMLElement;

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

        const title = document.createElement('span');
        title.className = 'hv-manifest__title mdc-top-app-bar__title';
        start.append(title);

        return header;
    }

    bind() {

        if (this.buttonNavigation) {
            this.buttonNavigation.addEventListener('click', () => this.publish('navigation-toggle'));
        }

    }

}