import { EventEmitter } from '../../../dist/types/stencil.core';
import 'manifesto.js';
export declare class ViewerComponent {
    el: HTMLElement;
    topbar: HTMLHvTopbarElement;
    navigation: HTMLHvNavigationElement;
    viewport: HTMLHvViewportElement;
    manifest: Manifesto.IManifest;
    manifestLoaded: EventEmitter;
    goto: EventEmitter;
    manifestLoadedHandler(event: CustomEvent): void;
    pageLoadedHandler(event: CustomEvent): void;
    gotoHandler(event: CustomEvent): void;
    render(): any;
}
