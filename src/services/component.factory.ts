import { Component } from "../components/component";
import { TopbarComponent } from "../components/topbar.component";
import { ViewportComponent } from "../components/viewport.component";
import { ImageListComponent } from "../components/imagelist.component";
import { AnnotationsDrawerComponent } from "../components/annotations.component";
import { NavigationDrawerComponent } from "../components/navigation.component";
import { Options } from "../options";

export class ComponentFactory {

    components: Component[];

    constructor() {
        this.components = [];
    }

    createTopbar(element: HTMLElement, options: Options): Component {
        return new TopbarComponent(element, options);
    }

    createViewport(element: HTMLElement, options: Options): Component {
        return new ViewportComponent(element, options);
    }

    createNavigationDrawer(element: HTMLElement, options: Options): Component {
        return new NavigationDrawerComponent(element, options);
    }

    createAnnotationsDrawer(element: HTMLElement, options: Options): Component {
        return new AnnotationsDrawerComponent(element, options);
    }

    createImageList(element: HTMLElement, options: Options): Component {
        return new ImageListComponent(element, options);
    }

    create(element: HTMLElement, options: Options): Component {
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

    get(element: HTMLElement, options: Options): Component {
        if (element) {
            if (element.classList.contains('hv-topbar')) {
                return this.createTopbar(element, options);
            }
            else if (element.classList.contains('hv-viewport')) {
                return this.createViewport(element, options);
            }
            else if (element.classList.contains('hv-navigation')) {
                return this.createNavigationDrawer(element, options);
            }
            else if (element.classList.contains('hv-annotations')) {
                return this.createAnnotationsDrawer(element, options);
            }
            else if (element.classList.contains('mdc-image-list')) {
                return this.createImageList(element, options);
            }
        }
        return undefined;
    }

}