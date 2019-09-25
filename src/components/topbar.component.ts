import { Component, BaseComponent } from "./base.component";
import { ManifestLoad } from "../events/manifest-load.event";
import { LanguageChange } from "../events/language-change.event";
import { FormatChange } from "../events/format-change.event";
import { ToolbarComponent } from "./toolbar.component";

export class TopbarComponent extends BaseComponent implements Component {

    title: string;

    private buttonNavigation: HTMLElement;
    private buttonContentType: HTMLElement;

    private titleElement: HTMLElement;

    private buttonSettings: HTMLElement;
    //private menuSettings: HTMLElement;

    private pdf: string;

    create() {

        const topbar = document.createElement('header');
        topbar.className = 'hv-topbar mdc-top-app-bar mdc-top-app-bar--prominent mdc-top-app-bar--dense';

        const top = document.createElement('div');
        top.className = 'mdc-top-app-bar__row hv-topbar__header';
        topbar.append(top);

        const start = document.createElement('div');
        start.className = 'mdc-top-app-bar__section mdc-top-app-bar__section--align-start';
        top.append(start);

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
        end.setAttribute('role', 'toolbar');
        top.append(end);

        // const tabs = document.createElement('div');
        // tabs.className = 'mdc-tab-bar';
        // tabs.setAttribute('role', 'tablist');
        // end.append(tabs);

        // const tabScroller = document.createElement('div');
        // tabScroller.className = 'mdc-tab-scroller';
        // tabs.append(tabScroller);

        // const tabScrollerArea = document.createElement('div');
        // tabScrollerArea.className = 'mdc-tab-scroller__scroll-area';
        // tabScroller.append(tabScrollerArea);

        // const tabsScrollerContent = document.createElement('div');
        // tabsScrollerContent.className = 'mdc-tab-scroller__scroll-content';
        // tabScrollerArea.append(tabsScrollerContent);

        // const tabImage = document.createElement('button');
        // tabImage.type = 'button';
        // tabImage.className = 'mdc-tab mdc-tab--active';
        // tabImage.setAttribute('role', 'tab');
        // tabImage.setAttribute('aria-selected', 'true');
        // tabImage.setAttribute('tabindex', '0');
        // tabsScrollerContent.append(tabImage);

        // const tabImageContent = document.createElement('span');
        // tabImageContent.className = 'mdc-tab__content';
        // tabImage.append(tabImageContent);

        // const tabImageLabel = document.createElement('span');
        // tabImageLabel.className = 'mdc-tab__text-label';
        // tabImageLabel.textContent = 'PDF';
        // tabImageContent.append(tabImageLabel);

        // const tabImageIndicator = document.createElement('span');
        // tabImageIndicator.className = 'mdc-tab-indicator mdc-tab-indicator--active';
        // tabImage.append(tabImageIndicator);

        // const tabImageIndicatorContent = document.createElement('span');
        // tabImageIndicatorContent.className = 'mdc-tab-indicator__content mdc-tab-indicator__content--underline';
        // tabImageIndicator.append(tabImageIndicatorContent);

        // const tabImageRipple = document.createElement('span');
        // tabImageRipple.className = 'mdc-tab__ripple';
        // tabImage.append(tabImageRipple);

        this.buttonContentType = document.createElement('button');
        //this.buttonContentType.type = 'button';
        this.buttonContentType.className = 'mdc-icon-button mdc-top-app-bar__action-item material-icons';
        this.buttonContentType.addEventListener('click', () => this.instance.publish('format-change', new FormatChange('pdf')));
        this.buttonContentType.textContent = 'image';
        end.append(this.buttonContentType);

        this.buttonSettings = document.createElement('button');
        this.buttonSettings.className = 'mdc-icon-button mdc-top-app-bar__action-item material-icons';
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

        const bottom = document.createElement('div');
        bottom.className = 'mdc-top-app-bar__row hv-topbar__bottom';
        topbar.append(bottom);

        const toolbar = new ToolbarComponent(this.instance);
        bottom.append(toolbar.getElement());

        return topbar;
    }

    async bind() {

        this.instance.on('manifest-load', (event: ManifestLoad) => this.manifestLoad(event));
        this.instance.on('format-change', (event: FormatChange) => this.formatChange(event));
        this.instance.on('language-change', (event: LanguageChange) => this.languageChange());

        if (this.buttonNavigation) {

            this.buttonNavigation.addEventListener('click', () =>
                this.instance.publish('navigation-toggle'));
        }

        if (this.buttonSettings) {

            this.buttonSettings.addEventListener('click', () =>
                this.instance.publish('settings-open'));
        }
    }

    private manifestLoad(event: ManifestLoad) {

        if (!event || !event.manifest) {
            return undefined;
        }

        this.titleElement.textContent = event.manifest.getDefaultLabel();

        const renderingPDF = event.manifest.getRendering('application/pdf');
        if(renderingPDF) {
            this.pdf = renderingPDF.id;
        }
    }

    private formatChange(event: FormatChange) {
        if (!event) {
            return undefined;
        }
        this.instance.root.switch(event.contentType, this.pdf);
    }

    private languageChange() {
        this.buttonSettings.setAttribute('data-tippy-content', this.t('settings'));
    }

}