import { HarmonizedViewer } from "..";

export interface Component {
    element: HTMLElement;
    root: HTMLElement;
    viewer: HarmonizedViewer;
    viewerId: string;

    build(): HTMLElement;
    bind();
    render(componentName: string, templateName: string): HTMLElement;

    executeBuild(element: HTMLElement): void;
    executeBind(element: HTMLElement): void;
    executeRender(element: HTMLElement): void;
}