import { ComponentFactory } from "../services/component.factory";

export class RootComponent implements IRootComponent {

    factory: ComponentFactory;

    constructor() {
        this.factory = new ComponentFactory();
    }

    build(element: HTMLElement, options: any) {

        if (this.factory.isComponent(element)) {
            this.factory.create(element, options);
        }

        Array.from(element.children)
            .forEach(child => this.build(child as HTMLElement, options));
    }

    async execute() {
        await Promise.all(this.factory.components.map(i => i.init()));
        await Promise.all(this.factory.components.map(i => i.render()));
    }

}

export interface IRootComponent {
    factory: ComponentFactory;
}