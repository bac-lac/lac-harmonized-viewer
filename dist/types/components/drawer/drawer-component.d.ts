import { EventEmitter } from '../../stencil.core';
export declare class DrawerComponent {
    el: HTMLElement;
    headerTitle: string;
    shown: boolean;
    viewerDrawerToggle: EventEmitter;
    private drawer;
    componentDidLoad(): void;
    componentDidUnload(): void;
    handleOpen(newValue: boolean, oldValue: boolean): void;
    handleClose(): void;
    render(): any;
}
