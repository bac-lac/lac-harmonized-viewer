import { Component } from "./base.component";
import { MDCDrawer } from "@material/drawer";
import { events } from "../events/list.event";

export class DrawerComponent extends Component {

    drawer: MDCDrawer;

    constructor(element: HTMLElement) {
        super(element);
        this.drawer = new MDCDrawer(element);
    }

    bindEvents() {
        events.onClick.on(() => {
            let foundation = this.drawer.getDefaultFoundation();
            if(foundation.isOpen() || foundation.isOpening()) {
                foundation.close();
            }
            else {
                foundation.open();
            }
        });
    }

}