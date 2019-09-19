import { Component, BaseComponent } from "./component";
import { MDCDrawer } from "@material/drawer";
import { SidebarOpen } from "~/events/sidebar-open.event";
import { SidebarClose } from "~/events/sidebar-close.event";
import { SidebarOptions } from "~/options/sidebar.options";
import { HarmonizedViewer } from "..";

export class SidebarComponent extends BaseComponent implements Component {

    options: SidebarOptions;

    protected drawer: MDCDrawer;

    private _element: HTMLElement;

    constructor(instance: HarmonizedViewer, options: SidebarOptions) {
        super(instance);
        this.options = options;
    }

    create(): HTMLElement {

        const aside = document.createElement('aside');
        aside.className = 'mdc-drawer mdc-drawer--dismissible';

        console.log('b', this.options);

        if (this.options && this.options.enable && this.options.open) {
            aside.classList.add('mdc-drawer--open');
        }

        const content = document.createElement('div');
        content.className = 'mdc-drawer__content';
        aside.append(content);

        return aside;
    }

    init() {
        if (this.getElement()) {
            this.drawer = new MDCDrawer(this.getElement());
        }
    }

    bind() {
        if (this.drawer) {
            this.drawer.listen('MDCDrawer:opened', () => this.publish('sidebar-open'));
            this.drawer.listen('MDCDrawer:closed', () => this.publish('sidebar-close'));
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