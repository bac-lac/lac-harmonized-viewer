import { SidebarComponent } from "./sidebar.component";
import { CanvasListComponent } from "./canvaslist.component";
import { Component } from "./base.component";
import OverlayScrollbars = require("overlayscrollbars");

export class NavigationComponent extends SidebarComponent implements Component {

    create() {

        const sidebar = super.create();

        sidebar.classList.add('hv-navigation');
        sidebar.classList.add('mdc-top-app-bar--fixed-adjust');

        const canvasList = new CanvasListComponent(this.instance);
        sidebar.firstElementChild.append(canvasList.getElement());

        return sidebar;
    }

    async bind() {
        this.instance.on('navigation-toggle', () => this.toggle());
    }

    async load () {
        OverlayScrollbars(this.element.querySelector('.mdc-drawer__content'), {});
    }

}