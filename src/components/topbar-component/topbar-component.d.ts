import { EventEmitter } from '../../../dist/types/stencil.core';
export declare class TopbarComponent {
    el: HTMLElement;
    title: string;
    publisher: string;
    thumbnail: string;
    navigationToggled: EventEmitter;
    showSettings(): void;
    render(): any;
}
