import { Component, BaseComponent } from "./base.component";
import { ManifestLoad } from "../events/manifest-load.event";
import { LanguageChange } from "~/events/language-change.event";

export class TopbarComponent extends BaseComponent implements Component {

    title: string;

    private buttonNavigation: HTMLElement;
    //private buttonMore: HTMLElement;
    private titleElement: HTMLElement;

    private buttonSettings: HTMLElement;
    //private menuSettings: HTMLElement;

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

        const end = document.createElement('div');
        end.className = 'mdc-top-app-bar__section mdc-top-app-bar__section--align-end';
        row.append(end);

        this.buttonSettings = document.createElement('button');
        this.buttonSettings.className = 'hv-button-icon material-icons mdc-top-app-bar__navigation-icon mdc-icon-button';
        this.buttonSettings.textContent = 'settings';
        end.append(this.buttonSettings);

        // const buttonSettingsIcon = document.createElement('i');
        // buttonSettingsIcon.className = 'fas fa-cog';
        // buttonSettingsIcon.setAttribute('data-tippy-tooltip', 'Settings');
        // this.buttonSettings.append(buttonSettingsIcon);

        // this.menu = document.createElement('div');
        // this.menu.className = 'mdc-menu mdc-menu-surface';
        // end.append(this.menu);

        // const morelist = document.createElement('ul');
        // morelist.className = 'mdc-list';
        // morelist.setAttribute('role', 'menu');
        // morelist.setAttribute('aria-hidden', 'true');
        // morelist.setAttribute('aria-orientation', 'vertical');
        // morelist.setAttribute('tabindex', '-1');
        // this.menu.append(morelist);

        // this.menuSettings = document.createElement('li');
        // this.menuSettings.className = 'mdc-list-item';
        // this.menuSettings.setAttribute('role', 'menuitem');
        // this.menu.append(this.menuSettings);

        // const label = document.createElement('span');
        // label.className = 'mdc-list-item__text';
        // label.textContent = 'Settings';
        // this.menuSettings.append(label);

        return header;
    }

    async bind() {

        //const menu = new MDCMenu(this.buttonSettings);

        if (this.buttonNavigation) {

            this.buttonNavigation.addEventListener('click', () =>
                this.instance.publish('navigation-toggle'));
        }

        if (this.buttonSettings) {

            this.buttonSettings.addEventListener('click', () =>
                this.instance.publish('settings-open'));
        }

        this.instance.on('manifest-load', (event: ManifestLoad) => this.manifestLoad(event));
        this.instance.on('language-change', (event: LanguageChange) => this.languageChange());
    }

    private manifestLoad(event: ManifestLoad) {
        if (!event) {
            return undefined;
        }
        this.titleElement.textContent = event.manifest.getDefaultLabel();
    }

    private languageChange() {
        this.buttonSettings.setAttribute('data-tippy-content', this.t('settings'));
    }

}