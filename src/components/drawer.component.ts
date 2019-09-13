import { Component } from "./component";
import { MDCDrawer } from "@material/drawer";
import { TopbarComponent } from "./topbar.component";

export class DrawerComponent extends Component {

    drawer: MDCDrawer;

    async init() {
        this.drawer = new MDCDrawer(this.element);
        this.on('navigation-toggle', () => this.toggle());
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