import { HarmonizedViewer } from "..";
import { Component } from "./component";
import { isNullOrUndefined } from "util";

const templates = require('../templates/templates.precompiled');

export class BuilderComponent implements Component {

    element: HTMLElement;
    root: HTMLElement;
    viewer: HarmonizedViewer;
    viewerId: string;

    constructor(element?: HTMLElement) {
        //this.element = document.createElement('div');
        this.element = element;
        this.element.setAttribute('data-viewer-component', '');
    }

    build(): HTMLElement {
        throw new Error("Method not implemented.");
    }

    bind() {
        throw new Error("Method not implemented.");
    }

    render(componentName: string, templateName: string): HTMLElement {

        const element = document.createElement('div');
        element.innerHTML = templates[componentName][templateName]();

        return element.firstElementChild as HTMLElement;
    }

    execute(): void {
        this.element.childNodes.forEach((node) => this.executeBuild(node as HTMLElement));
        this.element.childNodes.forEach((node) => this.executeBind(node as HTMLElement));
    }

    executeBuild(element: HTMLElement): void {

        if (element.getAttribute && element.hasAttribute('data-component-id')) {

            const componentId = element.getAttribute('data-component-id');

            const component = this.viewer.components
                .find(x => x.viewerId === componentId && isNullOrUndefined(componentId) == false);

            if (component) {
                component.build();
            }

        }
        element.childNodes.forEach((node) => this.executeBuild(node as HTMLElement));
        element.childNodes.forEach((node) => this.executeBuild(node as HTMLElement));
    }
    executeBind(element: HTMLElement): void {
        //throw new Error("Method not implemented.");
    }
    executeRender(element: HTMLElement): void {
        //throw new Error("Method not implemented.");
    }

}