import { DrawerComponent } from "./drawer.component";
import { CanvasListComponent } from "./canvaslist.component";

export class NavigationComponent extends DrawerComponent {

    create(): HTMLElement {

        const element = super.create();
        //const content = element.querySelector('.mdc-drawer__content');

        element.classList.add('hv-navigation');
        element.classList.add('mdc-top-app-bar--fixed-adjust');

        if (this.options.navigation.enabled && this.options.navigation.opened) {
            element.classList.add('mdc-drawer--open');
        }

        const canvasList = new CanvasListComponent(this.options);
        this.append(canvasList);
        //content.append(canvasList.create());

        return element;
    }

    bind() {

        if (this.options.navigation.enabled) {
            this.on('navigation-toggle', () => this.toggle());
        }

    }

}