import { Component } from "~/components/base.component";

export class ComponentService {

    private components: Component[] = [];

    register(component: Component) {
        if (!component) {
            return undefined;
        }
        this.components.push(component);
    }

    async execute() {
        await this.executeInit();
        await this.executeBind();
        await this.executeLoad();
    }

    async executeInit(): Promise<void> {
        await Promise.all(
            this.components
                .filter((component) => component.init)
                .map((component) => component.init()));
    }

    async executeBind(): Promise<void> {
        await Promise.all(
            this.components
                .filter((component) => component.bind)
                .map((component) => component.bind()));
    }

    async executeLoad(): Promise<void> {
        await Promise.all(
            this.components
                .filter((component) => component.load)
                .map((component) => component.load()));
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