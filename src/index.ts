import { ComponentFactory } from "./factories/component.factory";

export class HarmonizedViewer {

    element: HTMLElement;

    private factory: ComponentFactory;

    constructor(id: string) {
        this.element = document.getElementById(id);

        this.factory = new ComponentFactory();

        this.parse(this.element);

        this.factory.components.forEach(component => component.init());
        this.factory.components.forEach(component => component.render());
    }

    parse(element: HTMLElement) {

        if (this.factory.isComponent(element)) {
            this.factory.create(element);
        }

        Array
            .from(element.children)
            .forEach(child => {
                this.parse(child as HTMLElement);
            });
    }
}

export function harmonizedViewer(id: string): HarmonizedViewer {
    return new HarmonizedViewer(id);
}