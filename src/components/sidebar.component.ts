import { Component } from "./base.component";
import { MDCDrawer } from "@material/drawer";
import { events } from "../events/list.event";

export class SidebarComponent extends Component {

    drawer: MDCDrawer;

    constructor(element: HTMLElement) {
        super(element);
        this.drawer = MDCDrawer.attachTo(element);
    }

    bindEvents() {
        events.onClick.on(() => {
            this.drawer.getDefaultFoundation().open();
        });
    }

}