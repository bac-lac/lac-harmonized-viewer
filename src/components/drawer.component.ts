import { Component } from "./base.component";
import { MDCDrawer } from "@material/drawer";

export class DrawerComponent extends Component {

    drawer: MDCDrawer;

    constructor(element: HTMLElement) {
        super(element);
        this.drawer = new MDCDrawer(element);
    }

    init() {
        this.events.on('toggle', () => {
            this.toggle();
        });
    }

    open(): void {
        this.drawer.getDefaultFoundation().open();
    }

    close(): void {
        this.drawer.getDefaultFoundation().close();
    }

    toggle(): void {
        let foundation = this.drawer.getDefaultFoundation();
        if (foundation.isOpen() || foundation.isOpening()) {
            foundation.close();
        }
        else {
            foundation.open();
        }
    }

}