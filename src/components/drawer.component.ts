import { Component } from "./component";
import { MDCDrawer } from "@material/drawer";

export class DrawerComponent extends Component {

    drawer: MDCDrawer;

    async init() {
        this.drawer = new MDCDrawer(this.element);

        this.drawer.listen('MDCDrawer:opened', () => {
            
        });

        this.drawer.listen('MDCDrawer:closed', () => {
            
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