import { EventEmitter } from '../../stencil.core';
import 'manifesto.js';
export declare class NavigationComponent {
    el: HTMLElement;
    page: number;
    manifest: Manifesto.IManifest;
    goto: EventEmitter;
    getItems(): {
        title: string;
        thumbnailUrl: string;
    }[];
    gotoHandler(event: CustomEvent): void;
    onClick(event: MouseEvent, page: number): void;
    render(): any;
}
