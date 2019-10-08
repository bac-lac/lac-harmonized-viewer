import { EventEmitter } from '../../../dist/types/stencil.core';
import 'manifesto.js';
import "malihu-custom-scrollbar-plugin";
export declare class NavigationComponent {
    el: HTMLElement;
    page: number;
    manifest: Manifesto.IManifest;
    goto: EventEmitter;
    componentDidRender(): void;
    getItems(): {
        title: string;
        thumbnailUrl: string;
    }[];
    gotoHandler(event: CustomEvent): void;
    onClick(event: MouseEvent, page: number): void;
    onImageLoad(event: Event): void;
    render(): any;
}
