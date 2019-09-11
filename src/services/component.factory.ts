import { Component } from "../components/component";
import { TopbarComponent } from "../components/topbar.component";
import { ViewportComponent } from "../components/viewport.component";
import { DrawerComponent } from "../components/drawer.component";
import { ImageListComponent } from "../components/imagelist.component";

export class ComponentFactory {

    components: Component[];

    constructor() {
        this.components = [];
    }

    createTopbar(element: HTMLElement, options: any): Component {
        return new TopbarComponent(element, options);
    }

    createViewport(element: HTMLElement, options: any): Component {
        return new ViewportComponent(element, options);
    }

    createDrawer(element: HTMLElement, options: any): Component {
        return new DrawerComponent(element, options);
    }

    createImageList(element: HTMLElement, options: any): Component {
        return new ImageListComponent(element, options);
    }

    create(element: HTMLElement, options: any): Component {
        let component = this.get(element, options);

        if (component) {
            this.components.push(component);
            return component;
        }
        else {
            return undefined;
        }
    }

    isComponent(element: HTMLElement): boolean {
        return (element && this.get(element, undefined) ? true : false);
    }

    get(element: HTMLElement, options: any): Component {
        if (element) {
            if (element.classList.contains('hv-topbar')) {
                return this.createTopbar(element, options);
            }
            else if (element.classList.contains('hv-viewport')) {
                return this.createViewport(element, options);
            }
            else if (element.classList.contains('mdc-drawer')) {
                return this.createDrawer(element, options);
            }
            else if (element.classList.contains('mdc-image-list')) {
                return this.createImageList(element, options);
            }
        }
        return undefined;
    }

}