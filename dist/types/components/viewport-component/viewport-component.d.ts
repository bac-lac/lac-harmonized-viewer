import { EventEmitter } from '../../stencil.core';
import '../../utils/utils.manifest';
export declare class ViewportComponent {
    el: HTMLElement;
    page: number;
    totalPages: number;
    manifest: string;
    openseadragon: any;
    manifestLoaded: EventEmitter;
    canvasLoaded: EventEmitter;
    pageLoaded: EventEmitter;
    private buttonPrevious;
    private buttonNext;
    private locale;
    componentDidLoad(): void;
    pageHandler(): void;
    private handleCanvasLoad;
    private drawShadow;
    previous(): void;
    next(): void;
    render(): any;
}
