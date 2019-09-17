import { DrawerComponent } from "./drawer.component";
import { ImageListComponent } from "./imagelist.component";

export class NavigationComponent extends DrawerComponent {

    create(): HTMLElement {

        const drawer = super.create();

        drawer.classList.add('hv-navigation');
        drawer.classList.add('mdc-top-app-bar--fixed-adjust');

        if (this.options.navigation.enabled && this.options.navigation.opened) {
            drawer.classList.add('mdc-drawer--open');
        }

        const images = this.add(new ImageListComponent(this.options));
        drawer.append(images.create());

        return drawer;

    }

    bind() {

        if (this.options.navigation.enabled) {
            this.on('navigation-toggle', () => this.toggle());
        }

    }

}