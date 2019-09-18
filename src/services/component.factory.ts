import { Component } from "../components/component";
import { TopbarComponent } from "../components/topbar.component";
import { ViewportComponent } from "../components/viewport.component";
import { CanvasListComponent } from "../components/canvaslist.component";
import { AnnotationsDrawerComponent } from "../components/annotations.component";
//import { NavigationComponent } from "../components/navigation.component";
import { ToolbarComponent } from "../components/toolbar.component";
import { Options } from "../options";

export class ComponentFactory {

    constructor() {
    }

    // createTopbar(options: Options): Component {
    //     return new TopbarComponent(options);
    // }

    // createViewport(options: Options): Component {
    //     return new ViewportComponent(options);
    // }

    // createNavigationDrawer(options: Options): Component {
    //     return new NavigationDrawerComponent(options);
    // }

    // createAnnotationsDrawer(options: Options): Component {
    //     return new AnnotationsDrawerComponent(options);
    // }

    // createImageList(options: Options): Component {
    //     return new ImageListComponent(options);
    // }

    // createToolbar(options: Options): Component {
    //     return new ToolbarComponent(options);
    // }

    // create(name: string, options: Options): Component {

    //     if (!name) {
    //         return undefined;
    //     }

    //     let component = undefined;

    //     switch (name.toLowerCase()) {
    //         case 'topbar':
    //                 component = this.createTopbar(options);
    //             break;
    //         case 'viewport':
    //                 component = this.createViewport(options);
    //             break;
    //         case 'navigation':
    //                 component = this.createNavigationDrawer(options);
    //             break;
    //         case 'annotations':
    //             this.createAnnotationsDrawer(options);
    //             break;
    //         case 'imagelist':
    //             this.createImageList(options);
    //             break;
    //         case 'imagelist':
    //             this.createImageList(options);
    //             break;
    //     }
    //     if (element) {
    //         if (element.classList.contains('hv-topbar')) {
    //             return this.createTopbar(element, options);
    //         }
    //         else if (element.classList.contains('hv-viewport')) {
    //             return this.createViewport(element, options);
    //         }
    //         else if (element.classList.contains('hv-navigation')) {
    //             return this.createNavigationDrawer(element, options);
    //         }
    //         else if (element.classList.contains('hv-annotations')) {
    //             return this.createAnnotationsDrawer(element, options);
    //         }
    //         else if (element.classList.contains('mdc-image-list')) {
    //             return this.createImageList(element, options);
    //         }
    //         else if (element.classList.contains('hv-toolbar')) {
    //             return this.createToolbar(element, options);
    //         }
    //     }
    //     return undefined;
    // }

}