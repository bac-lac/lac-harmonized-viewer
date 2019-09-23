import { Component, BaseComponent } from "./base.component";
import { MDCDrawer } from "@material/drawer";
import { SidebarOptions } from "../options/sidebar.options";
import { HarmonizedViewer } from "..";

const OverlayScrollbars = require('overlayscrollbars');

export class SidebarComponent extends BaseComponent implements Component {

    options: SidebarOptions;

    protected drawer: MDCDrawer;

    constructor(instance: HarmonizedViewer, options: SidebarOptions) {
        super(instance);
        this.options = options;
    }

    create(): HTMLElement {

        const aside = document.createElement('aside');
        aside.className = 'mdc-drawer mdc-drawer--dismissible';

        if (this.options && this.options.enable && this.options.open) {
            aside.classList.add('mdc-drawer--open');
        }

        const content = document.createElement('div');
        content.className = 'mdc-drawer__content';
        aside.append(content);

        return aside;
    }

    async init() {
        if (this.getElement()) {
            this.drawer = new MDCDrawer(this.getElement());
        }
    }

    async bind() {
        if (this.drawer) {
            this.drawer.listen('MDCDrawer:opened', () => this.instance.publish('sidebar-open'));
            this.drawer.listen('MDCDrawer:closed', () => this.instance.publish('sidebar-close'));
        }
    }

    open() {
        if (this.drawer) {
            const foundation = this.drawer.getDefaultFoundation();
            foundation.open();
        }
    }

    close() {
        if (this.drawer) {
            const foundation = this.drawer.getDefaultFoundation();
            foundation.close();
        }
    }

    toggle() {
        if (this.drawer) {
            const foundation = this.drawer.getDefaultFoundation();
            if (foundation.isOpen() || foundation.isOpening()) {
                foundation.close();
            }
            else {
                foundation.open();
            }
        }
    }

}