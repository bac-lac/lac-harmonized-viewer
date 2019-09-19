import { Component } from "./component";
import { MDCDrawer } from "@material/drawer";

export class DrawerComponent extends Component {

    drawer: MDCDrawer;

    create(): HTMLElement {

        const element = document.createElement('aside');
        element.className = 'mdc-drawer mdc-drawer--dismissible';

        const content = document.createElement('div');
        content.className = 'mdc-drawer__content';
        element.append(content);

        return element;
    }

    init() {
        if (this.element) {
            this.drawer = new MDCDrawer(this.element);
        }
    }

    bind() {
        this.drawer.listen('MDCDrawer:opened', () => {

        });
        this.drawer.listen('MDCDrawer:closed', () => {

        });
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