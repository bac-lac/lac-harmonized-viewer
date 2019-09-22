import { SidebarComponent } from "./sidebar.component";
import { Component } from "./base.component";

export class AnnotationsComponent extends SidebarComponent implements Component {

    create() {

        const sidebar = super.create();

        sidebar.classList.add('hv-annotations');
        sidebar.classList.add('mdc-top-app-bar--fixed-adjust');

        

        return sidebar;
    }

    async bind() {
        this.instance.on('annotations-toggle', () => this.toggle());
    }

}