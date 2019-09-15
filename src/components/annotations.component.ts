import { DrawerComponent } from "./drawer.component";

export class AnnotationsDrawerComponent extends DrawerComponent {

    async init() {
        await super.init();
        this.on('annotations-toggle', () => this.toggle());
    }

}