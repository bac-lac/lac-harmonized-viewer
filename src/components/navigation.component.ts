import { DrawerComponent } from "./drawer.component";

export class NavigationDrawerComponent extends DrawerComponent {

    async init() {
        await super.init();
        
        if(this.options.navigation.enabled) {

            if(this.options.navigation.opened) {
                this.element.classList.add('mdc-drawer--open');
            }

            this.on('navigation-toggle', () => this.toggle());
        }
    }

}