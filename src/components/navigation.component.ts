import { SidebarComponent } from "./sidebar.component";
import { CanvasListComponent } from "./canvaslist.component";
import { Component } from "./component";
import { HarmonizedViewer } from "..";
import { SidebarOptions } from "~/options/sidebar.options";

export class NavigationComponent extends SidebarComponent implements Component {

    create() {

        const sidebar = super.create();

        sidebar.classList.add('hv-navigation');
        sidebar.classList.add('mdc-top-app-bar--fixed-adjust');

        const canvasList = new CanvasListComponent(this.instance);
        sidebar.firstElementChild.append(canvasList.getElement());

        return sidebar;
    }

    bind() {

        this.on('navigation-toggle', () => this.toggle());

    }

}