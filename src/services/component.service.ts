import { Component } from "~/components/component";

export class ComponentService {

    private components: Component[] = [];

    register(component: Component) {
        if(!component) {
            return undefined;
        }
        this.components.push(component);
    }

    execute() {
        //this.executeBuild();
        this.executeBind();
    }

    private executeBuild() {
        this.components.forEach((component) => component.create());
    }

    private executeBind() {
        this.components.forEach((component) => component.bind());
    }

    // findAll(element: HTMLElement): Component[] {

    //     if(!element) {
    //         return undefined;
    //     }

    //     const nodes = element.querySelectorAll('[data-component-id]');
    //     if(nodes) {
    //         Array.from(nodes).map((node) => {

    //         });
    //     }
    // }

    // private findAllRecursive(element: HTMLElement, components: Component[] = []): Component[] {

    //     if(!element) {
    //         return undefined;
    //     }

    //     Array.from(element.children)
    //     .map(x => this.findAllRecursive(x as HTMLElement));

    //     if(this.isComponent(element)) {

    //     }

    // }

    // isComponent(element: HTMLElement): boolean {
    //     return (element && element.hasAttribute('data-component-id'));
    // }

}