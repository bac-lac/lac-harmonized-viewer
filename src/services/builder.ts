import { ComponentBase } from "../components/base.component";
import { Component } from "../components/component";

export class ElementBuilder implements Builder {

    components: Component[];
    private elementName?: string;
    private element: HTMLElement;

    constructor(elementName?: string) {
        this.components = [];
        this.elementName = elementName;
        this.reset();
    }

    reset(): this {
        this.element = document.createElement(this.elementName || 'div');
        return this;
    }

    addClass(className: string): this {
        this.element.classList.add(className);
        return this;
    }

    add(element: HTMLElement): this {
        this.element.append(element);
        return this;
    }

    addComponent(component: Component): this {
        //this.element.append(component.builder.build());
        this.components.push(component);
        return this;
    }

    build(): HTMLElement {
        const element = this.element;
        this.reset();
        return element;
    }

}

export interface Builder {
    reset(elementName?: string): this;
    addClass(className: string): this;
    add(element: HTMLElement): this;
    addComponent(component: Component): this;
    build(): HTMLElement;
}