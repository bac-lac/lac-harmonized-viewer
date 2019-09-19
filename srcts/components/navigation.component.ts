import { DrawerComponent } from "./drawer.component";
import { CanvasListComponent } from "./canvaslist.component";

export class NavigationComponent extends DrawerComponent {

    create(): HTMLElement {

        const element = super.create();

        if (this.options.navigation.enabled && this.options.navigation.opened) {
            element.classList.add('mdc-drawer--open');
        }

        const content = element.querySelector('.mdc-drawer__content');

        content.classList.add('hv-navigation');
        content.classList.add('mdc-top-app-bar--fixed-adjust');

        const canvasList = new CanvasListComponent(this.options);
        this.children.push(canvasList);
        content.append(canvasList.create());

        return element;
    }

    bind() {

        if (this.options.navigation.enabled) {
            this.on('navigation-toggle', () => this.toggle());
        }

        console.log('bind');

    }

}